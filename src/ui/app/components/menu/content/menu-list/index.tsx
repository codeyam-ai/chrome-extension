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
import { LinkType } from '_src/enums/LinkType';

function MenuList() {
    const switchWalletUrl = useNextMenuUrl(true, '/switch-wallet');
    const connectedAppsUrl = useNextMenuUrl(true, '/connected-apps');
    const preapprovalsUrl = useNextMenuUrl(true, '/preapprovals');

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
            iconWithNoClasses: <LinkIcon />,
            title: 'Connected apps',
            to: connectedAppsUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <ShieldCheckIcon />,
            title: 'Pre-approvals',
            to: preapprovalsUrl,
            linkType: LinkType.Internal,
        },
    ];

    return <LinkList linkItems={menuItems} />;
}

export default MenuList;
