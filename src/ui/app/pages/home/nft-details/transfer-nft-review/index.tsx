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
// import { transferNFT } from '_redux/slices/sui-objects';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import transferNFT from '_src/ui/app/helpers/transferNFT';
import { accountNftsSelector } from '_src/ui/app/redux/slices/account';
import { resettransferNftForm } from '_src/ui/app/redux/slices/forms';
import { removeObject } from '_src/ui/app/redux/slices/sui-objects';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';
import { api } from '_store/thunk-extras';

import st from './TransferNFTForm.module.scss';

const initialValues = {
    to: '',
};

export type FormValues = typeof initialValues;

function TransferNFTReview() {
    const { connectToLedger } = useSuiLedgerClient();
    const [formSubmitted, submitForm] = useState(false);
    const { account } = useAppSelector((state) => state);
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
        toast(<SuccessAlert text={'Submitting transaction...'} />);

        if (formState.nftId === null) {
            return;
        }

        submitForm(true);

        try {
            const response = await transferNFT({
                ...account,
                connectToLedger,
                recipientAddress: formState.to,
                nft: selectedNFTObj,
                provider: api.instance.fullNode,
            });

            // const resp = await dispatch(
            //     transferNFT({
            //         recipientAddress: formState.to,
            //         nftId: formState.nftId,
            //         transferCost: formState.gasFee
            //             ? parseInt(formState.gasFee)
            //             : 0,
            //     })
            // ).unwrap();

            if (!response) return;

            dispatch(resettransferNftForm());

            if (response.txId) {
                await dispatch(removeObject(formState.nftId));
                // Redirect to nft page
                navigate('/nfts');

                const navLink = `/transactions/receipt?${new URLSearchParams({
                    txdigest: response.txId,
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
    }, [
        formState.nftId,
        formState.to,
        account,
        connectToLedger,
        selectedNFTObj,
        dispatch,
        navigate,
    ]);

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
