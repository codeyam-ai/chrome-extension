// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    CheckCircleIcon,
    EyeIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/solid';
import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import formatUrl from '../helpers/format-url';
import truncateString from '../helpers/truncate-string';
import { AppState } from '../hooks/useInitializedGuard';
import PermissionList from '../shared/content/rows-and-lists/PermissionList';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import {
    permissionsSelectors,
    respondToPermissionRequest,
} from '_redux/slices/permissions';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

import type { PermissionListItem } from '../shared/content/rows-and-lists/PermissionList';
import type { PermissionType } from '_messages/payloads/permissions';
import type { RootState } from '_redux/RootReducer';
import type { ReactNode } from 'react';

interface PermissionInfo {
    text: string;
    icon: ReactNode;
}

const permissionTypeToTxt: Record<PermissionType, PermissionInfo> = {
    viewAccount: {
        text: 'View your wallet address',
        icon: <EyeIcon />,
    },
    suggestTransactions: {
        text: 'Suggest transactions to approve',
        icon: <CheckCircleIcon />,
    },
    suggestSignMessages: {
        text: 'Suggest messages to sign',
        icon: <CheckCircleIcon />,
    },
    setAccountCustomizations: {
        text: 'Set account customizations',
        icon: <PencilSquareIcon />,
    },
};

function SiteConnectPage() {
    const { requestID } = useParams();
    const guardLoading = useInitializedGuard(
        [AppState.MNEMONIC, AppState.HOSTED],
        true
    );
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
    const formattedRequestTitle =
        !permissionRequest?.title || permissionRequest.title?.includes('http')
            ? truncateString(formatUrl(permissionRequest?.origin || ''), 25)
            : permissionRequest.title;

    const permissionItems: PermissionListItem[] = [];

    permissionRequest?.permissions.forEach((permission) => {
        const info = permissionTypeToTxt[permission];

        permissionItems.push({
            iconWithNoClasses: info.icon,
            title: info.text,
        });
    });

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
                    title={`Connect to ${formattedRequestTitle}`}
                    origin={permissionRequest.origin}
                    originFavIcon={permissionRequest.favIcon}
                    originTitle={formattedRequestTitle}
                    description="Allow this app to:"
                    approveTitle="Connect"
                    rejectTitle="Cancel"
                    onSubmit={handleOnSubmit}
                >
                    <PermissionList items={permissionItems} />
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

export default SiteConnectPage;
