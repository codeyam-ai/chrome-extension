// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { getTransactionDigest } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import TransferCoinReviewForm from './TransferCoinReviewForm';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector } from '_hooks';
import { resetSendSuiForm } from '_redux/slices/forms';
import { sendTokens } from '_redux/slices/transactions';
import { useCoinDecimals } from '_src/ui/app/hooks/useFormatCoin';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';

import type { SerializedError } from '@reduxjs/toolkit';
import type { FormikHelpers } from 'formik';

const initialValues = {
    to: '',
    amount: '',
};

export type FormValues = typeof initialValues;

// TODO: show out of sync when sui objects locally might be outdated
function TransferCoinReviewPage() {
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');
    const [sendError, setSendError] = useState<string | null>(null);
    const [coinDecimals] = useCoinDecimals(coinType);
    const formData = useAppSelector(({ forms: { sendSui } }) => sendSui);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async (
            { to, amount }: FormValues,
            { resetForm }: FormikHelpers<FormValues>
        ) => {
            toast(<SuccessAlert text={'Transaction submitted.'} />);

            if (coinType === null) {
                return;
            }
            setSendError(null);
            try {
                const bigIntAmount = BigInt(
                    new BigNumber(amount)
                        .shiftedBy(coinDecimals)
                        .integerValue()
                        .toString()
                );

                const tx = await dispatch(
                    sendTokens({
                        amount: bigIntAmount,
                        recipientAddress: to,
                        tokenTypeArg: coinType,
                    })
                ).unwrap();

                resetForm();
                dispatch(resetSendSuiForm());

                if ('EffectsCert' in tx) {
                    const txDigest =
                        tx.EffectsCert.certificate.transactionDigest;

                    const navLink = `/receipt?${new URLSearchParams({
                        txdigest: txDigest,
                    }).toString()}`;

                    toast(
                        <SuccessAlert
                            text={'Transaction successful.'}
                            linkText={'View'}
                            linkUrl={navLink}
                        />,
                        { delay: 500 }
                    );
                }

                const receiptUrl = '/tokens';
                navigate(receiptUrl);
            } catch (e) {
                setSendError((e as SerializedError).message || null);
            }
        },
        [dispatch, navigate, coinType, coinDecimals]
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
                        submitError={sendError}
                        onClearSubmitError={handleOnClearSubmitError}
                    />
                </Formik>
            </Loading>
        </>
    );
}

export default TransferCoinReviewPage;
