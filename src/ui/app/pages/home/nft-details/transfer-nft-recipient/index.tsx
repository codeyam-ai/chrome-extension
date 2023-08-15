// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { TransactionBlock } from '@mysten/sui.js';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
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
import { DEFAULT_NFT_TRANSFER_GAS_FEE } from '_redux/slices/sui-objects/Coin';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import safeAddress from '_src/ui/app/helpers/safeAddress';
import transferObjectTransactionBlock from '_src/ui/app/helpers/transferObjectTransactionBlock';
import { setNftDetails } from '_src/ui/app/redux/slices/forms';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';

import type { SerializedError } from '@reduxjs/toolkit';

import st from './TransferNFTForm.module.scss';

const initialValues = {
    to: '',
    amount: DEFAULT_NFT_TRANSFER_GAS_FEE,
};

export type FormValues = typeof initialValues;

function TransferNFTRecipient() {
    const { connectToLedger } = useSuiLedgerClient();
    const {
        address,
        authentication,
        activeAccountIndex,
        accountInfos,
        passphrase,
    } = useAppSelector((state) => state.account);
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
                (nftItems) => nftItems.objectId === objectId
            )[0],
        [nftCollections, objectId]
    );

    const aggregateBalances = useAppSelector(accountAggregateBalancesSelector);

    const gasAggregateBalance = useMemo(
        () => aggregateBalances[SUI_TYPE_ARG] || BigInt(0),
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
        async ({ to }: FormValues) => {
            if (objectId === null) {
                return;
            }

            const safeTo = safeAddress(to);

            if (!safeTo) return;

            const signer = await getSigner(
                passphrase,
                accountInfos,
                address,
                authentication,
                activeAccountIndex,
                connectToLedger
            );

            if (!signer) return;

            let transactionBlock: TransactionBlock | null =
                new TransactionBlock();
            transactionBlock = await transferObjectTransactionBlock(
                transactionBlock,
                selectedNFTObj,
                safeTo,
                api.instance.fullNode
            );

            if (!transactionBlock) return;

            try {
                const dryRun = await signer.dryRunTransactionBlock({
                    transactionBlock: transactionBlock,
                });

                const gasFee =
                    Number(dryRun.effects.gasUsed.computationCost) +
                    (Number(dryRun.effects.gasUsed.storageCost) -
                        Number(dryRun.effects.gasUsed.storageRebate));

                setSendError(null);

                dispatch(
                    setNftDetails({
                        from: address || 'Wallet',
                        to: to,
                        nftId: objectId,
                        gasFee: gasFee.toString(),
                    })
                );

                navigate(
                    `/nfts/transfer/review?${new URLSearchParams({
                        objectId: objectId,
                    }).toString()}`
                );
            } catch (e) {
                toast(<FailAlert text={'Could not set address'} />);
                setSendError((e as SerializedError).message || null);
            }
        },
        [
            objectId,
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex,
            connectToLedger,
            selectedNFTObj,
            dispatch,
            navigate,
        ]
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
