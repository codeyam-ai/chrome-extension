// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Link } from 'react-router-dom';

import Item from './item';
import ExternalLink from '_components/external-link';
import { SuiIcons } from '_components/icon';
import { useNextMenuUrl } from '_components/menu/hooks';
import { useExplorerPermission } from '_hooks';
import { DASHBOARD_LINK } from '_src/shared/constants';

import st from './MenuList.module.scss';

// Adding icons here that don't work with this code base's icon creator
const walletIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        />
    </svg>
);

const appsIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
    </svg>
);

const arrowUpRightIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
    </svg>
);

function MenuList() {
    const switchWalletUrl = useNextMenuUrl(true, '/switch-wallet');
    const connectedAppsUrl = useNextMenuUrl(true, '/connected-apps');
    const preapprovalsUrl = useNextMenuUrl(true, '/preapprovals');
    const setExplorerPermission = useExplorerPermission();

    return (
        <div className="flex flex-col divide-y divide-gray-700/50 dark:divide-gray-400/50">
            {/* <Link to={accountUrl} className={st.item}>
                <Item
                    icon={SuiIcons.Person}
                    title="Account"
                    subtitle={shortenAddress}
                    indicator={SuiIcons.SuiChevronRight}
                />
            </Link> */}
            <div onMouseOver={setExplorerPermission}>
                <ExternalLink
                    className={st.item}
                    href={DASHBOARD_LINK}
                    showIcon={false}
                >
                    <Item
                        svg={arrowUpRightIcon}
                        title="View Wallet Dashboard"
                        indicator={SuiIcons.SuiChevronRight}
                    />
                </ExternalLink>
            </div>
            <div className="sm:hidden">
                <Link
                    to={'/tokens'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={st.item}
                >
                    <Item
                        icon={SuiIcons.Preview}
                        title="Expand View"
                        indicator={SuiIcons.SuiChevronRight}
                    />
                </Link>
            </div>
            <Link to={switchWalletUrl} className={st.item}>
                <Item
                    svg={walletIcon}
                    title="Switch/add wallet"
                    indicator={SuiIcons.SuiChevronRight}
                />
            </Link>
            <Link to={connectedAppsUrl} className={st.item}>
                <Item
                    svg={appsIcon}
                    title="Connected apps"
                    indicator={SuiIcons.SuiChevronRight}
                />
            </Link>
            <Link to={preapprovalsUrl} className={st.item}>
                <Item
                    icon={SuiIcons.Info}
                    title="Pre-approvals"
                    indicator={SuiIcons.SuiChevronRight}
                />
            </Link>
            {/* <Link to={playgroundUrl} className={st.item}>
                <Item
                    icon="joystick"
                    title="Playground"
                    indicator={SuiIcons.SuiChevronRight}
                />
            </Link> */}
        </div>
    );
}

export default MenuList;
