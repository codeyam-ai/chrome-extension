// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { defer, filter, from, of, repeat, switchMap } from 'rxjs';

import { growthbook } from '../../experimentation/feature-gating';
import { AppState } from '../../hooks/useInitializedGuard';
import { WarningAlert } from '../../shared/alerts/WarningAlert';
import Alert from '../../shared/feedback/Alert';
import BaseLayout from '../../shared/layouts/BaseLayout';
import NavBar from '../../shared/navigation/nav-bar/NavBar';
import TabBar from '../../shared/navigation/tab-bar/TabBar';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard, useObjectsState } from '_hooks';
import { fetchAllOwnedAndRequiredObjects } from '_redux/slices/sui-objects';
import PageLayout from '_src/ui/app/pages/PageLayout';

const POLL_SUI_OBJECTS_INTERVAL = 4000;

const AppContainer = () => {
    const { loading, error, showError } = useObjectsState();
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

    useEffect(() => {
        if (growthbook.isOn('devnet-issues')) {
            toast(
                <WarningAlert
                    text={'Sui Devnet is having technical issues.'}
                />,
                {
                    autoClose: false,
                    closeOnClick: true,
                }
            );
        }
    }, []);

    return (
        <PageLayout>
            <Loading loading={guardChecking} big={true} className="p-36">
                <BaseLayout>
                    <NavBar />
                    <main className="flex-grow h-[471px] overflow-scroll no-scrollbar">
                        {showError && error ? (
                            <div className="px-6 py-6">
                                <Alert
                                    title="Something's wrong"
                                    subtitle="You've lost connection with the network. The network may be unstable. Please refresh or try again later."
                                />
                            </div>
                        ) : (
                            <Loading
                                loading={loading}
                                big={true}
                                className="flex py-6 justify-center items-center"
                            >
                                <Outlet />
                            </Loading>
                        )}
                    </main>
                    <TabBar />
                </BaseLayout>
            </Loading>
        </PageLayout>
    );
};

export default AppContainer;
export { default as NFTDetailsPage } from './nft-details';
export { default as NftsPage } from './nfts';
export { default as TicketsPage } from './tickets';
export { default as TicketDetailsPage } from './ticket-details';
export { default as TicketProjectDetailsPage } from './ticket-project-details';
export { default as ReceiptPage } from './receipt';
export { default as HomePage } from './home';
export { default as TransactionDetailsPage } from './transaction-details';
export { default as TransactionsPage } from './transactions';
