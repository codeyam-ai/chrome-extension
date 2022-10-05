// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Outlet } from 'react-router-dom';

import DarkModeToggle from '../../components/darkModeToggle';
import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';
import GetStartedCard from '../../shared/GetStartedCard';

const InitializePage = () => {
    const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <div className="w-full mb-2">
                    <span className="float-right">
                        <DarkModeToggle />
                    </span>
                </div>
                <GetStartedCard>
                    <Outlet />
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default InitializePage;
