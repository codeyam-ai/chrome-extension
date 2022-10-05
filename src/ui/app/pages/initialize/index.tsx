// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Outlet } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import GetStartedCard from '../../shared/GetStartedCard';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';

const InitializePage = () => {
    const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <GetStartedCard>
                    <Outlet />
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default InitializePage;
