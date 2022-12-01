// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { AppState } from '../hooks/useInitializedGuard';
import Check from '../shared/svg/Check';
import Eye from '../shared/svg/Eye';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import {
    permissionsSelectors,
    respondToPermissionRequest,
} from '_redux/slices/permissions';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

import type { PermissionType } from '_messages/payloads/permissions';
import type { RootState } from '_redux/RootReducer';
import type { ReactNode } from 'react';

const permissionTypeToTxt: Record<
    PermissionType,
    Record<string, string | ReactNode>
> = {
    viewAccount: {
        text: 'View your wallet address',
        icon: <Eye />,
    },
    suggestTransactions: {
        text: 'Suggest transactions to approve',
        icon: <Check />,
    },
    suggestSignMessages: {
        text: 'Suggest messages to sign',
        icon: <Check />,
    },
};

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
        <Loading loading={loading} big={true} resize={true}>
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
                    <div className="flex flex-col gap-3 pb-6">
                        {permissionRequest.permissions.map((aPermission) => {
                            const info = permissionTypeToTxt[aPermission];
                            return (
                                <div
                                    className="flex flex-row items-center gap-2"
                                    key={aPermission}
                                >
                                    <div className="flex justify-center w-[22px]">
                                        {info.icon}
                                    </div>
                                    <span className="text-sm dark:text-gray-400">
                                        {info.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

export default SiteConnectPage;
