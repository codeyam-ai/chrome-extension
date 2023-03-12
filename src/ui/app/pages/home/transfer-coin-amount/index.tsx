// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { getTransactionDigest, Transaction, SUI_TYPE_ARG } from '@mysten/sui.js';

import { Coin as CoinAPI, SUI_TYPE_ARG, Transaction } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import TransferCoinAmountForm from './TransferCoinAmountForm';
import { createTokenValidation } from './validation';
import { useAppDispatch, useAppSelector } from '_hooks';
import {
    accountAggregateBalancesSelector,
    accountCoinsSelector,
} from '_redux/slices/account';
import {
    Coin,
    DEFAULT_GAS_BUDGET_FOR_PAY,
} from '_redux/slices/sui-objects/Coin';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import {
    useCoinDecimals,
    useFormatCoin,
} from '_src/ui/app/hooks/useFormatCoin';
import { setSuiAmount } from '_src/ui/app/redux/slices/forms';

import type { SuiMoveObject } from '@mysten/sui.js';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FormikHelpers } from 'formik';

const initialValues = {
    amount: '',
};

export type FormValues = typeof initialValues;

// TODO: show out of sync when sui objects locally might be outdated
function TransferCoinAmountPage() {
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');
    const formState = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const {
        account: { authentication, address, activeAccountIndex },
    } = useAppSelector((state) => state);
    const state = useAppSelector((state) => state);
    const aggregateBalances = useAppSelector(accountAggregateBalancesSelector);

    const coinBalance = useMemo(
        () => (coinType && aggregateBalances[coinType]) || BigInt(0),
        [coinType, aggregateBalances]
    );
    const [formattedBalance] = useFormatCoin(
        coinBalance,
        coinType || SUI_TYPE_ARG
    );

    const gasAggregateBalance = useMemo(
        () => aggregateBalances[SUI_TYPE_ARG] || BigInt(0),
        [aggregateBalances]
    );

    const coinSymbol = useMemo(
        () => (coinType && Coin.getCoinSymbol(coinType)) || '',
        [coinType]
    );

    const [sendError, setSendError] = useState<string | null>(null);

    const [coinDecimals] = useCoinDecimals(coinType);
    const [gasDecimals] = useCoinDecimals(SUI_TYPE_ARG);
    const allCoins = useAppSelector(accountCoinsSelector);

    const allCoinsOfSelectedTypeArg = useMemo(
        () =>
            allCoins.filter(
                (aCoin) => coinType && Coin.getCoinTypeArg(aCoin) === coinType
            ),
        [coinType, allCoins]
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

    const validationSchema = useMemo(
        () =>
            createTokenValidation(
                coinType || '',
                coinBalance,
                coinSymbol,
                gasAggregateBalance,
                coinDecimals,
                gasDecimals,
                gasBudget
            ),
        [
            coinType,
            coinBalance,
            coinSymbol,
            gasAggregateBalance,
            coinDecimals,
            gasDecimals,
            gasBudget,
        ]
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async (
            { amount }: FormValues,
            { resetForm }: FormikHelpers<FormValues>
        ) => {
            if (coinType === null) {
                return;
            }

            const bigIntAmount = BigInt(
                new BigNumber(amount)
                    .shiftedBy(coinDecimals)
                    .integerValue()
                    .toString()
            );

            const signer = await getSigner(
                address,
                authentication,
                activeAccountIndex
            );

            const allCoins: SuiMoveObject[] = accountCoinsSelector(state);
            const [primaryCoin, ...coins] = allCoins.filter(
                (coin) => coin.type === `0x2::coin::Coin<${coinType}>`
            );

            const transaction = new Transaction();
            transaction.setGasBudget(DEFAULT_GAS_BUDGET_FOR_PAY * 2);
            if (coinType === SUI_TYPE_ARG) {
                const coin = transaction.add(
                    Transaction.Commands.SplitCoin(
                        transaction.gas,
                        transaction.pure(bigIntAmount)
                    )
                );
                transaction.add(
                    Transaction.Commands.TransferObjects(
                        [coin],
                        transaction.pure(formState.to)
                    )
                );
            } else {
                const primaryCoinInput = transaction.object(
                    Coin.getID(primaryCoin)
                );
                transaction.add(
                    Transaction.Commands.MergeCoins(
                        primaryCoinInput,
                        coins.map((coin) =>
                            transaction.object(Coin.getID(coin))
                        )
                    )
                );
                const coin = transaction.add(
                    Transaction.Commands.SplitCoin(
                        primaryCoinInput,
                        transaction.pure(bigIntAmount)
                    )
                );
                transaction.add(
                    Transaction.Commands.TransferObjects(
                        [coin],
                        transaction.pure(formState.to)
                    )
                );
            }

            const signedTx = await signer.devInspectTransaction(transaction);

            const { computationCost, storageCost, storageRebate } =
                signedTx.effects.gasUsed;

            const gasFee = computationCost + (storageCost - storageRebate);

            dispatch(
                setSuiAmount({
                    amount: amount,
                    gasFee: `${gasFee} MIST`,
                })
            );

            setSendError(null);

            try {
                resetForm();
                const reviewUrl = `/send/review?${new URLSearchParams({
                    type: coinType,
                }).toString()}`;
                navigate(reviewUrl);
            } catch (e) {
                setSendError((e as SerializedError).message || null);
            }
        },
        [
            dispatch,
            navigate,
            coinType,
            activeAccountIndex,
            address,
            authentication,
            formState.to,
            coinDecimals,
            state,
        ]
    );
    const handleOnClearSubmitError = useCallback(() => {
        setSendError(null);
    }, []);

    const initialValues = {
        amount: formState.amount,
    };

    if (formState.to === '') {
        return <Navigate to={'/tokens'} />;
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validateOnMount={true}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
            >
                <TransferCoinAmountForm
                    submitError={sendError}
                    coinBalance={formattedBalance.toString()}
                    coinSymbol={coinSymbol}
                    gasBudget={gasBudget}
                    onClearSubmitError={handleOnClearSubmitError}
                />
            </Formik>
        </>
    );
}

export default TransferCoinAmountPage;
