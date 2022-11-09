// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { of, filter, switchMap, from, defer, repeat } from 'rxjs';

import { AppState } from '../../hooks/useInitializedGuard';
import BaseLayout from '../../shared/layouts/BaseLayout';
import NavBarWithMenu from '../../shared/navigation/nav-bar/NavBarWithMenu';
import NavExpanded from '../../shared/navigation/nav-bar/NavExpanded';
import TabBar from '../../shared/navigation/tab-bar/TabBar';
import Loading from '_components/loading';
import { useInitializedGuard, useAppDispatch } from '_hooks';
import PageLayout from '_pages/layout';
import { fetchAllOwnedAndRequiredObjects } from '_redux/slices/sui-objects';

const POLL_SUI_OBJECTS_INTERVAL = 4000;

const HomePage = () => {
    const guardChecking = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const sub = of(guardChecking)
            .pipe(
                filter(() => !guardChecking),
                switchMap(() =>
                    defer(() =>
                        from(dispatch(fetchAllOwnedAndRequiredObjects()))
                    ).pipe(repeat({ delay: POLL_SUI_OBJECTS_INTERVAL }))
                )
            )
            .subscribe();
        return () => sub.unsubscribe();
    }, [guardChecking, dispatch]);

    return (
        <PageLayout limitToPopUpSize={true}>
            <Loading loading={guardChecking} big={true}>
                <BaseLayout>
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
export { default as TokensPage } from './tokens';
export { default as TransactionDetailsPage } from './transaction-details';
export { default as TransactionsPage } from './transactions';
export { default as TransferCoinPage } from './transfer-coin';
export { default as NFTDetailsPage } from './nft-details';
export { default as ReceiptPage } from './receipt';
