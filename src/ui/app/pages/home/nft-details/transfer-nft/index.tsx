// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Formik } from 'formik';
import { useCallback, useMemo, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessAlert } from '_src/ui/app/shared/alerts/success-alert';
import TransferNFTForm from './TransferNFTForm';
import { createValidationSchema } from './validation';
import { useAppSelector, useAppDispatch } from '_hooks';
import {
    accountNftsSelector,
    accountAggregateBalancesSelector,
} from '_redux/slices/account';
import { transferNFT } from '_redux/slices/sui-objects';
import {
    GAS_TYPE_ARG,
    DEFAULT_NFT_TRANSFER_GAS_FEE,
} from '_redux/slices/sui-objects/Coin';

import type { ObjectId } from '@mysten/sui.js';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FormikHelpers } from 'formik';

import st from './TransferNFTForm.module.scss';
import { toast } from 'react-toastify';

const initialValues = {
    to: '',
    amount: DEFAULT_NFT_TRANSFER_GAS_FEE,
};

export type FormValues = typeof initialValues;

interface TransferProps {
    objectId: ObjectId;
}

function TransferNFTCard({ objectId }: TransferProps) {
    const address = useAppSelector(({ account: { address } }) => address);
    const dispatch = useAppDispatch();

    const nftCollections = useAppSelector(accountNftsSelector);
    const selectedNFTObj = useMemo(
        () =>
            nftCollections.filter(
                (nftItems) => nftItems.reference.objectId === objectId
            )[0],
        [nftCollections, objectId]
    );

    const aggregateBalances = useAppSelector(accountAggregateBalancesSelector);

    const gasAggregateBalance = useMemo(
        () => aggregateBalances[GAS_TYPE_ARG] || BigInt(0),
        [aggregateBalances]
    );

    const [sendError, setSendError] = useState<string | null>(null);

    const validationSchema = useMemo(
        () =>
            createValidationSchema(
                gasAggregateBalance,
                address || '',
                objectId || ''
            ),
        [gasAggregateBalance, address, objectId]
    );
    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async (
            { to }: FormValues,
            { resetForm }: FormikHelpers<FormValues>
        ) => {
            if (objectId === null) {
                return;
            }

            setSendError(null);

            try {
                const resp = await dispatch(
                    transferNFT({
                        recipientAddress: to,
                        nftId: objectId,
                        transferCost: DEFAULT_NFT_TRANSFER_GAS_FEE,
                    })
                ).unwrap();

                resetForm();

                if (resp.txId) {
                    // Redirect to nft page
                    navigate('/nfts');

                    const navLink = `/receipt?${new URLSearchParams({
                        txdigest: resp.txId,
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
            } catch (e) {
                setSendError((e as SerializedError).message || null);
            }
        },
        [dispatch, navigate, objectId]
    );

    const handleOnClearSubmitError = useCallback(() => {
        setSendError(null);
    }, []);

    return (
        <div className={st.container}>
            {/* Remove nav bar and include a redux hook to show back in navigation => <NavBarWithBackAndTitle title="Send NFT" backLink="/nfts" /> */}
            <div className={'text-left'}>
                <Formik
                    initialValues={initialValues}
                    validateOnMount={true}
                    validationSchema={validationSchema}
                    onSubmit={onHandleSubmit}
                >
                    <TransferNFTForm
                        nftobj={selectedNFTObj}
                        submitError={sendError}
                        gasBalance={gasAggregateBalance.toString()}
                        onClearSubmitError={handleOnClearSubmitError}
                    />
                </Formik>
            </div>
        </div>
    );
}

export default memo(TransferNFTCard);
