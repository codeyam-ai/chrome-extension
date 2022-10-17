// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { of, filter, switchMap, from, defer, repeat } from 'rxjs';

import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import Logo from '_components/logo';
import { MenuButton, MenuContent } from '_components/menu';
import {
    useInitializedGuard,
    useAppDispatch,
    useExplorerPermission,
} from '_hooks';
import PageLayout from '_pages/layout';
import { fetchAllOwnedAndRequiredObjects } from '_redux/slices/sui-objects';
import { DASHBOARD_LINK } from '_src/shared/constants';
import Navigation from '_src/ui/app/components/navigation';

import st from './Home.module.scss';

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
            <Loading loading={guardChecking}>
                <div className={st.container}>
                    <div className="flex flex-col items-center relative bg-white dark:bg-gray-800 dark:text-white rounded-none sm:rounded-lg flex-grow shadow-lg overflow-hidden dark:sm:border-gray-700 dark:sm:border-[1px]">
                        <div className="w-full mx-auto px-2 bg-gray-100 dark:bg-gray-700">
                            <div className="relative flex h-12 items-center justify-between">
                                <div className="flex flex-1 items-center">
                                    <div className="pl-4 flex flex-shrink-0 items-center">
                                        <MenuButton className={st.menuButton} />
                                    </div>
                                </div>
                                <div className="pr-4 absolute inset-y-0 right-0 flex items-center">
                                    <a
                                        href={DASHBOARD_LINK}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={st.logoLink}
                                        onMouseDown={setExplorerPermission}
                                    >
                                        <Logo className={st.logo} txt={true} />
                                    </a>{' '}
                                </div>
                            </div>
                        </div>
                        <main className={st.main}>
                            <Outlet />
                        </main>
                        <Navigation />
                        <MenuContent />
                    </div>
                </div>
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
