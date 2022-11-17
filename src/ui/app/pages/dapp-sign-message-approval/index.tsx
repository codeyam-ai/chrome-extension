// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import UserApproveContainer from '_components/user-approve-container';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import {
    respondToSignMessageRequest,
    signMessageRequestsSelectors,
} from '_redux/slices/sign-message-requests';

import type { RootState } from '_redux/RootReducer';

export function DappSignMessageApprovalPage() {
    const { signMessageRequestID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const signMessageRequestLoading = useAppSelector(
        ({ signMessageRequests }) => !signMessageRequests.initialized
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
    const loading = guardLoading || signMessageRequestLoading;
    const dispatch = useAppDispatch();

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (signMessageRequest) {
                await dispatch(
                    respondToSignMessageRequest({
                        approved,
                        id: signMessageRequest.id,
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
            window.close();
        }
    }, [loading, signMessageRequest]);

    return (
        <Loading loading={loading} big={true}>
            {signMessageRequest && (
                <UserApproveContainer
                    title="Sign Message"
                    approveTitle="Sign"
                    rejectTitle="Reject"
                    origin={signMessageRequest.origin}
                    originFavIcon={signMessageRequest.originFavIcon}
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex gap-3 justify-center items-center py-6">
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
                    <div className="text-sm pb-1 px-1">Message To Sign</div>
                    <div className="bg-gray-200 rounded-lg p-3">
                        <div>
                            {signMessageRequest.messageString ||
                                signMessageRequest.messageData}
                            {!signMessageRequest.messageString && (
                                <small>{' (base64)'}</small>
                            )}
                        </div>
                    </div>
                </UserApproveContainer>
            )}
        </Loading>
    );
}
