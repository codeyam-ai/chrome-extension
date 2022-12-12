// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { getTransactionDigest } from '@mysten/sui.js';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import TransferCoinRecipientForm from './TransferCoinRecipientForm';
import { createValidationSchema } from './validation';
import { useAppDispatch, useAppSelector } from '_hooks';

import type { SerializedError } from '@reduxjs/toolkit';
import { setSuiRecipient } from '_src/ui/app/redux/slices/forms';

// TODO: show out of sync when sui objects locally might be outdated
function TransferCoinRecipientPage() {
    const account = useAppSelector(({ account }) => account);
    const formState = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');
    const [sendError, setSendError] = useState<string | null>(null);
    const validationSchema = useMemo(
        () => createValidationSchema(account.address || ''),
        [account.address]
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async ({ to }: { to: string }) => {
            if (coinType === null) {
                return;
            }
            setSendError(null);
            try {
                dispatch(
                    setSuiRecipient({
                        walletIdx: undefined,
                        to: to,
                        from:
                            account.accountInfos[activeAccountIndex].name ||
                            'Wallet',
                    })
                );

                navigate(
                    `/send/amount?${new URLSearchParams({
                        type: coinType,
                    }).toString()}`
                );
            } catch (e) {
                setSendError((e as SerializedError).message || null);
            }
        },
        [navigate, coinType]
    );

    if (!coinType) {
        return <Navigate to="/" replace={true} />;
    }

    const handleOnClearSubmitError = useCallback(() => {
        setSendError(null);
    }, []);

    let initState = {
        to: formState.to,
    };

    return (
        <>
            <Formik
                initialValues={initState}
                validateOnMount={true}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
            >
                <TransferCoinRecipientForm
                    submitError={sendError}
                    onClearSubmitError={handleOnClearSubmitError}
                />
            </Formik>
        </>
    );
}

export default TransferCoinRecipientPage;
