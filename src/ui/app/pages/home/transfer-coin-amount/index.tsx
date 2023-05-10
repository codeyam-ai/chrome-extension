// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { getTransactionDigest, Transaction, SUI_TYPE_ARG } from '@mysten/sui.js';

import { SUI_TYPE_ARG, TransactionBlock } from '@mysten/sui.js';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import TransferCoinAmountForm from './TransferCoinAmountForm';
import { buildValidationSchema } from './buildValidationSchema';
import { useAppDispatch, useAppSelector } from '_hooks';
import {
    accountAggregateBalancesSelector,
    accountCoinsSelector,
} from '_redux/slices/account';
import { Coin } from '_redux/slices/sui-objects/Coin';
import ns from '_shared/namespace';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import safeAddress from '_src/ui/app/helpers/safeAddress';
import {
    useCoinDecimals,
    useFormatCoin,
} from '_src/ui/app/hooks/useFormatCoin';
import { setSuiAmount } from '_src/ui/app/redux/slices/forms';

import type { SuiMoveObject } from '@mysten/sui.js';
import type { SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '_src/ui/app/redux/RootReducer';
import type { FormikHelpers } from 'formik';

const initialValues = {
    amount: '',
};

export type FormValues = typeof initialValues;

type AggregateBalances = Record<string, bigint>;

interface UseCoinInputs {
    aggregateBalances: AggregateBalances;
    coinType: string | null;
}

export function useCoin({ aggregateBalances, coinType }: UseCoinInputs) {
    const coinBalance = useMemo(
        () => (coinType && aggregateBalances[coinType]) || BigInt(0),
        [coinType, aggregateBalances]
    );
    const coinSymbol = useMemo(
        () => (coinType && Coin.getCoinSymbol(coinType)) || '',
        [coinType]
    );
    const [coinDecimals] = useCoinDecimals(coinType);

    const coin = {
        type: coinType,
        balance: coinBalance,
        symbol: coinSymbol,
        decimals: coinDecimals ?? 9,
    };

    return coin;
}

interface UseGasInputs {
    coin: ReturnType<typeof useCoin>;
    aggregateBalances: AggregateBalances;
}

export function useGas({ coin, aggregateBalances }: UseGasInputs) {
    const gasAggregateBalance = useMemo(
        () => aggregateBalances[SUI_TYPE_ARG] || BigInt(0),
        [aggregateBalances]
    );
    const [gasDecimals] = useCoinDecimals(SUI_TYPE_ARG);
    const allCoins = useAppSelector(accountCoinsSelector);

    const allCoinsOfSelectedTypeArg = useMemo(
        () =>
            allCoins.filter(
                (aCoin) => coin.type && Coin.getCoinTypeArg(aCoin) === coin.type
            ),
        [coin.type, allCoins]
    );
    const [amountToSend] = useState(BigInt(0));
    const gasBudget = useMemo(
        () =>
            Coin.computeGasBudgetForPay(
                allCoinsOfSelectedTypeArg,
                amountToSend
            ),
        [allCoinsOfSelectedTypeArg, amountToSend]
    );

    const gas = {
        aggregateBalance: gasAggregateBalance,
        decimals: gasDecimals,
        budget: gasBudget,
    };

    return gas;
}

interface UseOnHandleSubmit {
    coin: ReturnType<typeof useCoin>;
    setSendError: React.Dispatch<React.SetStateAction<string | null>>;
    formState: RootState['forms']['sendSui'];
}

function useOnHandleSubmit({
    coin,
    setSendError,
    formState,
}: UseOnHandleSubmit) {
    const { connectToLedger } = useSuiLedgerClient();
    const {
        account: {
            authentication,
            address,
            activeAccountIndex,
            accountInfos,
            passphrase,
        },
    } = useAppSelector((state) => state);
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { locale } = useIntl();

    const onHandleSubmit = useCallback(
        async (
            { amount }: FormValues,
            { resetForm }: FormikHelpers<FormValues>
        ) => {
            if (coin.type === null) {
                return;
            }

            if (coin.decimals === undefined) {
                return;
            }

            const amountBigNumber = ns.parse.numberString({
                numberString: amount,
                locale,
            });

            const bigIntAmount = BigInt(
                amountBigNumber
                    .shiftedBy(coin.decimals)
                    .integerValue()
                    .toString()
            );

            const signer = await getSigner(
                passphrase,
                accountInfos,
                address,
                authentication,
                activeAccountIndex,
                connectToLedger
            );

            if (!signer) return;

            const safeTo = safeAddress(formState.to);

            const allCoins: SuiMoveObject[] = accountCoinsSelector(state);
            const [primaryCoin, ...mergeCoins] = allCoins.filter(
                (c) => c.type === `0x2::coin::Coin<${coin.type}>`
            );

            const transactionBlock = new TransactionBlock();
            if (coin.type === SUI_TYPE_ARG) {
                const coin = transactionBlock.splitCoins(transactionBlock.gas, [
                    transactionBlock.pure(bigIntAmount),
                ]);
                transactionBlock.transferObjects(
                    [coin],
                    transactionBlock.pure(safeTo)
                );
            } else {
                const primaryCoinInput = transactionBlock.object(
                    Coin.getID(primaryCoin)
                );
                if (mergeCoins.length) {
                    transactionBlock.mergeCoins(
                        primaryCoinInput,
                        mergeCoins.map((coin) =>
                            transactionBlock.object(Coin.getID(coin))
                        )
                    );
                }
                const coinToTransfer = transactionBlock.splitCoins(
                    primaryCoinInput,
                    [transactionBlock.pure(bigIntAmount)]
                );
                transactionBlock.transferObjects(
                    [coinToTransfer],
                    transactionBlock.pure(safeTo)
                );
            }

            try {
                const signedTx = await signer.dryRunTransactionBlock({
                    transactionBlock,
                });

                const { computationCost, storageCost, storageRebate } =
                    signedTx.effects.gasUsed;

                const gasFee =
                    Number(computationCost) +
                    (Number(storageCost) - Number(storageRebate));

                dispatch(
                    setSuiAmount({
                        amount: amount,
                        gasFee: gasFee.toString(),
                    })
                );

                setSendError(null);
            } catch (e: unknown) {
                const message = (e as SerializedError).message || null;
                setSendError(message);
                return;
            }

            try {
                resetForm();
                const reviewUrl = `/send/review?${new URLSearchParams({
                    type: coin.type,
                }).toString()}`;
                navigate(reviewUrl);
            } catch (e) {
                setSendError((e as SerializedError).message || null);
            }
        },
        [
            coin.type,
            coin.decimals,
            locale,
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex,
            connectToLedger,
            formState.to,
            state,
            dispatch,
            setSendError,
            navigate,
        ]
    );

    return onHandleSubmit;
}

// TODO: show out of sync when sui objects locally might be outdated
function TransferCoinAmountPage() {
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');

    const aggregateBalances = useAppSelector(accountAggregateBalancesSelector);
    const coin = useCoin({ aggregateBalances, coinType });
    const gas = useGas({ coin, aggregateBalances });

    const formState = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const [sendError, setSendError] = useState<string | null>(null);
    const onHandleSubmit = useOnHandleSubmit({ coin, setSendError, formState });

    const [formattedBalance] = useFormatCoin(
        coin.balance,
        coin.type || SUI_TYPE_ARG
    );

    const { locale } = useIntl();

    const validationSchema = useMemo(
        () => buildValidationSchema({ coin, gas, locale }),
        [coin, gas, locale]
    );

    const handleOnClearSubmitError = useCallback(() => {
        setSendError(null);
    }, []);

    if (formState.to === '') {
        return <Navigate to={'/home'} />;
    }

    return (
        <Formik
            initialValues={{
                amount: formState.amount,
            }}
            validateOnMount={true}
            validationSchema={validationSchema}
            onSubmit={onHandleSubmit}
        >
            <TransferCoinAmountForm
                submitError={sendError}
                coinBalance={formattedBalance.toString()}
                coinSymbol={coin.symbol}
                gasBudget={gas.budget}
                onClearSubmitError={handleOnClearSubmitError}
            />
        </Formik>
    );
}

export default TransferCoinAmountPage;
