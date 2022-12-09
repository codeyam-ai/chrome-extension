// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { getTransactionDigest } from '@mysten/sui.js';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import TransferCoinRecipientForm from './TransferCoinRecipientForm';
import { createValidationSchema } from './validation';
import { useAppDispatch, useAppSelector } from '_hooks';

import type { SerializedError } from '@reduxjs/toolkit';

const initialValues = {
    to: '',
    amount: '',
};

export type FormValues = typeof initialValues;

// TODO: show out of sync when sui objects locally might be outdated
function TransferCoinRecipientPage() {
    const address = useAppSelector(({ account: { address } }) => address);
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');
    const [sendError, setSendError] = useState<string | null>(null);
    const validationSchema = useMemo(
        () => createValidationSchema(address || ''),
        [address]
    );

    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async ({ to }: FormValues) => {
            if (coinType === null) {
                return;
            }
            setSendError(null);
            try {
                navigate('/send/amount');
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

    return (
        <>
            <Formik
                initialValues={initialValues}
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
