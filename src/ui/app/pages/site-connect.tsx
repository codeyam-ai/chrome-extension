// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { AppState } from '../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import {
    permissionsSelectors,
    respondToPermissionRequest,
} from '_redux/slices/permissions';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

import type { PermissionType } from '_messages/payloads/permissions';
import type { RootState } from '_redux/RootReducer';

const permissionTypeToTxt: Record<PermissionType, string> = {
    viewAccount: 'Share wallet address',
    suggestTransactions: 'Suggest transactions to approve',
    suggestSignMessages: 'Suggest messages to sign',
};

const greenCheckIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 text-green-500"
    >
        <path
            fillRule="evenodd"
            d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
        />
    </svg>
);

function SiteConnectPage() {
    const { requestID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const permissionsInitialized = useAppSelector(
        ({ permissions }) => permissions.initialized
    );
    const loading = guardLoading || !permissionsInitialized;
    const permissionSelector = useMemo(
        () => (state: RootState) =>
            requestID
                ? permissionsSelectors.selectById(state, requestID)
                : null,
        [requestID]
    );
    const dispatch = useAppDispatch();
    const permissionRequest = useAppSelector(permissionSelector);
    const activeAccount = useAppSelector(({ account }) => account.address);
    const handleOnSubmit = useCallback(
        (allowed: boolean) => {
            if (requestID && activeAccount) {
                dispatch(
                    respondToPermissionRequest({
                        id: requestID,
                        accounts: allowed ? [activeAccount] : [],
                        allowed,
                    })
                );
            }
        },
        [dispatch, requestID, activeAccount]
    );
    useEffect(() => {
        if (
            !loading &&
            (!permissionRequest || permissionRequest.responseDate)
        ) {
            setTimeout(window.close, 100);
        }
    }, [loading, permissionRequest]);

    return (
        <Loading loading={loading} big={true}>
            {permissionRequest ? (
                <UserApproveContainer
                    title={`Connect to ${
                        permissionRequest.title || permissionRequest.origin
                    }`}
                    origin={permissionRequest.origin}
                    originFavIcon={permissionRequest.favIcon}
                    originTitle={permissionRequest.title}
                    description="Allow this app to:"
                    approveTitle="Connect"
                    rejectTitle="Cancel"
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex flex-col gap-2 mt-2">
                        {permissionRequest.permissions.map((aPermission) => (
                            <span
                                className="flex flex-row gap-1"
                                key={aPermission}
                            >
                                {greenCheckIcon}
                                <span className="dark:text-gray-400">
                                    {permissionTypeToTxt[aPermission]}
                                </span>
                            </span>
                        ))}
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

export default SiteConnectPage;
