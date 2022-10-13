// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { of, filter, switchMap, from, defer, repeat } from 'rxjs';

import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { MenuContent } from '_components/menu';
import {
    useInitializedGuard,
    useAppDispatch,
    useExplorerPermission,
} from '_hooks';
import PageLayout from '_pages/layout';
import { fetchAllOwnedObjects } from '_redux/slices/sui-objects';

import BaseLayout from '../../shared/layouts/BaseLayout';
import NavBarWithMenu from '../../shared/navigation/nav-bar/NavBarWithMenu';
import TabBar from '../../shared/navigation/tab-bar/TabBar';
import NavExpanded from '../../shared/navigation/nav-bar/NavExpanded';

const POLL_SUI_OBJECTS_INTERVAL = 4000;

const HomePage = () => {
    const guardChecking = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const dispatch = useAppDispatch();
    const setExplorerPermission = useExplorerPermission();

    useEffect(() => {
        const sub = of(guardChecking)
            .pipe(
                filter(() => !guardChecking),
                switchMap(() =>
                    defer(() => from(dispatch(fetchAllOwnedObjects()))).pipe(
                        repeat({ delay: POLL_SUI_OBJECTS_INTERVAL })
                    )
                )
            )
            .subscribe();
        return () => sub.unsubscribe();
    }, [guardChecking, dispatch]);

    return (
        <PageLayout limitToPopUpSize={true}>
            <Loading loading={guardChecking}>
                <BaseLayout className="!pt-0">
                    <NavBarWithMenu />
                    <NavExpanded />
                    <main className="flex-grow">
                        <Outlet />
                    </main>
                    <TabBar />
                </BaseLayout>
            </Loading>
        </PageLayout>
    );
};

export default HomePage;
export { default as NftsPage } from './nfts';
export { default as StakePage } from './stake';
export { default as TokensPage } from './tokens';
export { default as TransactionDetailsPage } from './transaction-details';
export { default as TransactionsPage } from './transactions';
export { default as TransferCoinPage } from './transfer-coin';
export { default as NFTDetailsPage } from './nft-details';
export { default as StakeNew } from './stake-new';
export { default as ReceiptPage } from './receipt';
