// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64 } from '@mysten/bcs';
import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import { respondToTransactionRequest } from '../../redux/slices/transaction-requests';
import Loading from '_components/loading';
import UserApproveContainer from '_components/user-approve-container';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import { signMessageRequestsSelectors } from '_redux/slices/sign-message-requests';

import type { RootState } from '_redux/RootReducer';

export function DappSignMessageApprovalPage() {
    const { signMessageRequestID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const signMessageRequestLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );
    const signMessageRequestSelector = useMemo(
        () => (state: RootState) =>
            (signMessageRequestID &&
                signMessageRequestsSelectors.selectById(
                    state,
                    signMessageRequestID
                )) ||
            null,
        [signMessageRequestID]
    );
    const signMessageRequest = useAppSelector(signMessageRequestSelector);
    console.log('signMessageRequest', signMessageRequest);
    const loading = guardLoading || signMessageRequestLoading;
    const dispatch = useAppDispatch();

    const message = useMemo(() => {
        if (signMessageRequest?.tx?.type !== 'sign-message') return null;
        return new TextDecoder().decode(fromB64(signMessageRequest.tx.message));
    }, [signMessageRequest]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (signMessageRequest?.tx?.type === 'sign-message') {
                await dispatch(
                    respondToTransactionRequest({
                        txRequestID: signMessageRequest.id,
                        approved,
                        addressForTransaction:
                            signMessageRequest.tx.accountAddress,
                    })
                );
                // window.close();
            }
        },
        [dispatch, signMessageRequest]
    );

    useEffect(() => {
        if (
            !loading &&
            (!signMessageRequest ||
                (signMessageRequest && signMessageRequest.approved !== null))
        ) {
            // window.close();
        }
    }, [loading, signMessageRequest]);

    return (
        <Loading loading={loading} big={true} resize={true}>
            {signMessageRequest && (
                <UserApproveContainer
                    title="Sign Message"
                    approveTitle="Sign"
                    rejectTitle="Reject"
                    origin={signMessageRequest.origin}
                    originFavIcon={signMessageRequest.originFavIcon}
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex flex-col justify-center items-center gap-6 dark:text-slate-300 pb-6">
                        <div className="px-6 flex gap-3 justify-center items-center">
                            <img
                                src={signMessageRequest.originFavIcon}
                                className="h-12"
                                alt="Site Favicon"
                            />
                            <div>
                                <div className="text-base">
                                    {signMessageRequest.origin}
                                </div>
                                <div>has requested you sign a message</div>
                            </div>
                        </div>
                        {message && (
                            <div className="flex flex-col gap-1 px-6 w-full">
                                <div className="text-sm px-1">
                                    Message To Sign
                                </div>
                                <div className="bg-gray-200 text-slate-800 rounded-lg p-3">
                                    <div>{message}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </UserApproveContainer>
            )}
        </Loading>
    );
}
