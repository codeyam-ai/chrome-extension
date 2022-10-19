// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useNextMenuUrl } from '_components/menu/hooks';
import { DASHBOARD_LINK } from '_src/shared/constants';

import LinkList, {
    type LinkItem,
} from '_src/ui/app/shared/navigation/nav-bar/LinkList';
import {
    ArrowsRightLeftIcon,
    LinkIcon,
    ShieldCheckIcon,
    ArrowsPointingOutIcon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

function MenuList() {
    const switchWalletUrl = useNextMenuUrl(true, '/switch-wallet');
    const connectedAppsUrl = useNextMenuUrl(true, '/connected-apps');
    const preapprovalsUrl = useNextMenuUrl(true, '/preapprovals');

    const menuItems: LinkItem[] = [
        {
            iconWithNoClasses: <ArrowTopRightOnSquareIcon />,
            title: 'View Wallet Dashboard',
            to: DASHBOARD_LINK,
            isExternal: true,
        },
        {
            iconWithNoClasses: <ArrowsPointingOutIcon />,
            title: 'Expand view',
            to: '/tokens',
            isExternal: false,
            isExpandView: true,
        },
        {
            iconWithNoClasses: <ArrowsRightLeftIcon />,
            title: 'Switch/add wallet',
            to: switchWalletUrl,
            isExternal: false,
        },
        {
            iconWithNoClasses: <LinkIcon />,
            title: 'Connected apps',
            to: connectedAppsUrl,
            isExternal: false,
        },
        {
            iconWithNoClasses: <ShieldCheckIcon />,
            title: 'Pre-approvals',
            to: preapprovalsUrl,
            isExternal: false,
        },
    ];

    return (
        <div>
            <LinkList linkItems={menuItems} />
        </div>
    );
}

export default MenuList;
