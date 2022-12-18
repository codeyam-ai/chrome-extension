// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { Formik } from 'formik';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import TransferNFTForm from './TransferNFTForm';
import { createValidationSchema } from './validation';
import { useAppDispatch, useAppSelector } from '_hooks';
import {
    accountAggregateBalancesSelector,
    accountNftsSelector,
} from '_redux/slices/account';
import {
    DEFAULT_NFT_TRANSFER_GAS_FEE,
    GAS_TYPE_ARG,
} from '_redux/slices/sui-objects/Coin';

import type { ObjectId } from '@mysten/sui.js';
import type { SerializedError } from '@reduxjs/toolkit';

import st from './TransferNFTForm.module.scss';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';
import { setNftDetails } from '_src/ui/app/redux/slices/forms';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { formatBalance } from '_src/ui/app/hooks/useFormatCoin';

const initialValues = {
    to: '',
    amount: DEFAULT_NFT_TRANSFER_GAS_FEE,
};

export type FormValues = typeof initialValues;

function TransferNFTRecipient() {
    const address = useAppSelector(({ account: { address } }) => address);
    const formData = useAppSelector(
        ({ forms: { transferNft } }) => transferNft
    );
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const objectId = searchParams.get('objectId');
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

    const gasFee = `${formatBalance(gasAggregateBalance, 9)} ${truncateString(
        'SUI',
        8
    )}`;

    const navigate = useNavigate();
    const onHandleSubmit = useCallback(
        async ({ to }: FormValues) => {
            if (objectId === null) {
                return;
            }

            setSendError(null);

            try {
                dispatch(
                    setNftDetails({
                        from: address || 'Wallet',
                        to: to,
                        nftId: objectId,
                        gasFee: gasFee,
                    })
                );

                navigate(
                    `/nft/transfer/review?${new URLSearchParams({
                        objectId: objectId,
                    }).toString()}`
                );
            } catch (e) {
                toast(<FailAlert text={'Could not set address'} />);
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
            <div className={'text-left'}>
                <Formik
                    initialValues={{
                        to: formData.to,
                        amount: DEFAULT_NFT_TRANSFER_GAS_FEE,
                    }}
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

export default memo(TransferNFTRecipient);
