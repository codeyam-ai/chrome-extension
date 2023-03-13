// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { memo, useCallback, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import TransferNFTReviewForm from './TransferNFTReviewForm';
import { isErrorCausedByUserNotHavingEnoughSuiToPayForGas } from '../../../dapp-tx-approval/lib';
import { getGasDataFromError } from '../../../dapp-tx-approval/lib/extractGasData';
import getErrorDisplaySuiForMist from '../../../dapp-tx-approval/lib/getErrorDisplaySuiForMist';
import { useAppDispatch, useAppSelector } from '_hooks';
import { transferNFT } from '_redux/slices/sui-objects';
import { accountNftsSelector } from '_src/ui/app/redux/slices/account';
import { resettransferNftForm } from '_src/ui/app/redux/slices/forms';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';

import st from './TransferNFTForm.module.scss';

const initialValues = {
    to: '',
};

export type FormValues = typeof initialValues;

function TransferNFTReview() {
    const [formSubmitted, submitForm] = useState(false);
    const formState = useAppSelector(
        ({ forms: { transferNft } }) => transferNft
    );
    const dispatch = useAppDispatch();
    const nftCollections = useAppSelector(accountNftsSelector);
    const selectedNFTObj = useMemo(
        () =>
            nftCollections.filter(
                (nftItems) => nftItems.objectId === formState.nftId
            )[0],
        [nftCollections, formState.nftId]
    );

    const navigate = useNavigate();
    const submitNftTransfer = useCallback(async () => {
        // Let the user know the transaction is en route
        toast(<SuccessAlert text={'Transaction submitted.'} />);

        if (formState.nftId === null) {
            return;
        }

        submitForm(true);

        try {
            const resp = await dispatch(
                transferNFT({
                    recipientAddress: formState.to,
                    nftId: formState.nftId,
                    transferCost: formState.gasFee
                        ? parseInt(formState.gasFee)
                        : 0,
                })
            ).unwrap();

            dispatch(resettransferNftForm());

            if (resp.txId) {
                // Redirect to nft page
                navigate('/nfts');

                const navLink = `/transactions/receipt?${new URLSearchParams({
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
            const error = e as { message: string };
            console.log('TRANSFER NFT ERROR', e);
            const failAlertText =
                isErrorCausedByUserNotHavingEnoughSuiToPayForGas(error.message)
                    ? `You don't have enough SUI to pay the transaction cost of ${getErrorDisplaySuiForMist(
                          getGasDataFromError(error.message)?.gasBudget
                      )} SUI.`
                    : 'Transaction unsuccessful.';

            toast(<FailAlert text={failAlertText} />, {
                delay: 500,
            });
        }
    }, [dispatch, navigate, formState]);

    if (!formState.to) {
        return <Navigate to={'/nfts'} />;
    }

    return (
        <div className={st.container}>
            <div className={'text-left'}>
                <TransferNFTReviewForm
                    submitted={formSubmitted}
                    formData={formState}
                    nftobj={selectedNFTObj}
                    transferNft={submitNftTransfer}
                />
            </div>
        </div>
    );
}

export default memo(TransferNFTReview);
