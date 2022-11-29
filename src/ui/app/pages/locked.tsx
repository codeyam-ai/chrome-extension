// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../components/logo/ethos-logo.png';
import { AppState } from '../hooks/useInitializedGuard';
import {
    loadAccountInformationFromStorage,
    unlock,
} from '../redux/slices/account';
import UnlockWalletForm from '../shared/forms/UnlockWalletForm';
import LargePageHeaderWIthIcon from '../shared/headers/page-headers/LargePageHeaderWithIcon';
import BaseLayout from '../shared/layouts/BaseLayout';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';

const LockedPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const checkingInitialized = useInitializedGuard(AppState.LOCKED);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

    const _save = useCallback(
        async (passphrase: string) => {
            const unlockResult = await dispatch(unlock(passphrase));
            // If passwords don't match, unlock returns false
            if (!unlockResult.payload) {
                setIsPasswordIncorrect(true);
                return;
            }
            setIsPasswordIncorrect(false);
            await dispatch(loadAccountInformationFromStorage());
            navigate('/');
        },
        [dispatch, navigate]
    );

    return (
        <PageLayout>
            <Loading loading={checkingInitialized}>
                <BaseLayout className="!min-h-0">
                    <LargePageHeaderWIthIcon
                        iconSrc={logo}
                        iconAlt="Ethos Wallet logo"
                        header="Ethos"
                        description="Unlock Wallet"
                    />
                    <UnlockWalletForm
                        onSubmit={_save}
                        isPasswordIncorrect={isPasswordIncorrect}
                    />
                </BaseLayout>
            </Loading>
        </PageLayout>
    );
};

export default LockedPage;
