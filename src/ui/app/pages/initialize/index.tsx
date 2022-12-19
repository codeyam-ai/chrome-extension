// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Outlet } from 'react-router-dom';

import OnboardingLayout from '../../shared/layouts/OnboardingLayout';

const InitializePage = () => {
    // const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
    return (
        <OnboardingLayout>
            {/* <Loading loading={checkingInitialized} big={true}> */}
            <Outlet />
            {/* </Loading> */}
        </OnboardingLayout>
    );
};

export default InitializePage;
