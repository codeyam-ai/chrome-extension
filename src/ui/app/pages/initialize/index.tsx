// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Outlet } from 'react-router-dom';

import DarkModeToggle from '../../components/darkModeToggle';
import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';

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
                <div className="text-center pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 max-w-sm rounded-lg px-10 bg-white dark:text-white dark:bg-gray-800 dark:sm:border-gray-700 dark:sm:border-[1px]">
                    <Outlet />
                </div>
            </Loading>
        </PageLayout>
    );
};

export default InitializePage;
