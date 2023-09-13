// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import TransferCoinReviewForm from './TransferCoinReviewForm';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector } from '_hooks';
import { resetSendSuiForm } from '_redux/slices/forms';
// import { sendTokens } from '_redux/slices/transactions';
import ns from '_shared/namespace';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import sendTokens from '_src/ui/app/helpers/sendTokens';
import { useCoinDecimals } from '_src/ui/app/hooks/useFormatCoin';
import { accountCoinsSelector } from '_src/ui/app/redux/slices/account';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';

import type { SuiMoveObject } from '@mysten/sui.js/client';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FormikHelpers } from 'formik';

const initialValues = {
    to: '',
    amount: '',
};

export type FormValues = typeof initialValues;

// TODO: show out of sync when sui objects locally might be outdated
function TransferCoinReviewPage() {
    const { connectToLedger } = useSuiLedgerClient();
    const account = useAppSelector((state) => state.account);
    const [searchParams] = useSearchParams();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const coinType = searchParams.get('type');
    const [sendError, setSendError] = useState<string | null>(null);
    const [coinDecimals] = useCoinDecimals(coinType);
    const formData = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const allCoins: SuiMoveObject[] = useAppSelector(accountCoinsSelector);

    const { locale } = useIntl();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async (
            { to, amount }: FormValues,
            { resetForm }: FormikHelpers<FormValues>
        ) => {
            const amountBigNumber = ns.parse.numberString({
                numberString: amount,
                locale,
            });

            if (coinType === null) {
                return;
            }

            if (coinDecimals === undefined) {
                return;
            }

            setSendError(null);
            setFormSubmitted(true);
            try {
                const bigIntAmount = BigInt(
                    amountBigNumber
                        .shiftedBy(coinDecimals)
                        .integerValue()
                        .toString()
                );

                const tx = await sendTokens({
                    ...account,
                    connectToLedger,
                    allCoins,
                    recipientAddress: to,
                    tokenTypeArg: coinType,
                    amount: bigIntAmount,
                });

                toast(<SuccessAlert text={'Transaction submitted...'} />);

                resetForm();
                dispatch(resetSendSuiForm());

                const txDigest = tx?.digest;

                const navLink = `/transactions/receipt?${new URLSearchParams({
                    txdigest: txDigest || '',
                }).toString()}`;

                toast(
                    <SuccessAlert
                        text={'Transaction successful.'}
                        linkText={'View'}
                        linkUrl={navLink}
                    />,
                    { delay: 500 }
                );

                const receiptUrl = '/home';
                navigate(receiptUrl);
            } catch (e) {
                // const error = e as { message: string };
                // const failAlertText =
                //     isErrorCausedByUserNotHavingEnoughSuiToPayForGas(
                //         error.message
                //     )
                //         ? `You don't have enough SUI to pay the transaction cost of ${getErrorDisplaySuiForMist(
                //               getGasDataFromError(error.message)?.gasBudget
                //           )} SUI.`
                //         : 'Transaction unsuccessful.';
                // const receiptUrl = '/home';
                // navigate(receiptUrl);
                // toast(<FailAlert text={failAlertText} />, {
                //     delay: 250,
                // });
                setSendError((e as SerializedError).message || null);
            }
        },
        [
            locale,
            coinType,
            coinDecimals,
            account,
            connectToLedger,
            allCoins,
            dispatch,
            navigate,
        ]
    );
    const handleOnClearSubmitError = useCallback(() => {
        setSendError(null);
    }, []);
    const loadingBalance = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );

    return (
        <>
            <Loading loading={loadingBalance} big={true}>
                <Formik
                    initialValues={{
                        to: formData.to,
                        amount: formData.amount,
                    }}
                    validateOnMount={true}
                    onSubmit={onHandleSubmit}
                >
                    <TransferCoinReviewForm
                        submitted={formSubmitted}
                        submitError={sendError}
                        onClearSubmitError={handleOnClearSubmitError}
                    />
                </Formik>
            </Loading>
        </>
    );
}

export default TransferCoinReviewPage;
