// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    ArrowsRightLeftIcon,
    ArrowsPointingOutIcon,
    ArrowTopRightOnSquareIcon,
    LockClosedIcon,
    SquaresPlusIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useCallback } from 'react';

import { useNextMenuUrl } from '_components/menu/hooks';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { useAppDispatch } from '_src/ui/app/hooks';
import { logout } from '_src/ui/app/redux/slices/account';
import LinkList, {
    type LinkItem,
} from '_src/ui/app/shared/navigation/nav-bar/LinkList';

function MenuList() {
    const dispatch = useAppDispatch();
    const switchWalletUrl = useNextMenuUrl(true, '/switch-wallet');
    const connectedAppsUrl = useNextMenuUrl(true, '/connected-apps');
    const preapprovalsUrl = useNextMenuUrl(true, '/preapprovals');

    const handleLogout = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch]);

    const menuItems: LinkItem[] = [
        {
            iconWithNoClasses: <ArrowTopRightOnSquareIcon />,
            title: 'View Wallet Dashboard',
            to: DASHBOARD_LINK,
            linkType: LinkType.External,
        },
        {
            iconWithNoClasses: <ArrowsPointingOutIcon />,
            title: 'Expand view',
            to: '/tokens',
            linkType: LinkType.Internal,
            isExpandView: true,
        },
        {
            iconWithNoClasses: <ArrowsRightLeftIcon />,
            title: 'Switch/add wallet',
            to: switchWalletUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <SquaresPlusIcon />,
            title: 'Connected apps',
            to: connectedAppsUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <CheckBadgeIcon />,
            title: 'Pre-approvals',
            to: preapprovalsUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <LockClosedIcon />,
            title: 'Lock',
            linkType: LinkType.None,
            onClick: handleLogout,
        },
    ];

    return (
        <div className="px-6 pb-6">
            <LinkList linkItems={menuItems} />
        </div>
    );
}

export default MenuList;
