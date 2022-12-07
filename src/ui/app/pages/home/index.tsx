// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { defer, filter, from, of, repeat, switchMap } from 'rxjs';

import { AppState } from '../../hooks/useInitializedGuard';
import BaseLayout from '../../shared/layouts/BaseLayout';
import NavBar from '../../shared/navigation/nav-bar/NavBar';
import TabBar from '../../shared/navigation/tab-bar/TabBar';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import { fetchAllOwnedAndRequiredObjects } from '_redux/slices/sui-objects';
import PageLayout from '_src/ui/app/pages/PageLayout';

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
        <PageLayout>
            <Loading loading={guardChecking} big={true}>
                <BaseLayout>
                    <NavBar />
                    <main className="flex-grow h-[471px] overflow-scroll no-scrollbar">
                        <Outlet />
                    </main>
                    <TabBar />
                </BaseLayout>
            </Loading>
        </PageLayout>
    );
};

export default HomePage;
export { default as NFTDetailsPage } from './nft-details';
export { default as NftsPage } from './nfts';
export { default as ReceiptPage } from './receipt';
export { default as TokensPage } from './tokens';
export { default as TransactionDetailsPage } from './transaction-details';
export { default as TransactionsPage } from './transactions';
export { default as TransferCoinPage } from './transfer-coin';

