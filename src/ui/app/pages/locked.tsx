// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppState } from '../hooks/useInitializedGuard';
import {
    loadAccountInformationFromStorage,
    unlock,
} from '../redux/slices/account';
import UnlockWalletForm from '../shared/forms/UnlockWalletForm';
import HeaderWithIconRow from '../shared/headers/page-headers/HeaderWithIconRow';
import BaseLayout from '../shared/layouts/BaseLayout';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_src/ui/app/pages/PageLayout';

const LockedPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
            navigate((pathname || '/').replace('/locked', ''));
        },
        [pathname, dispatch, navigate]
    );

    return (
        <PageLayout>
            <Loading loading={checkingInitialized} resize={true}>
                <BaseLayout className="!min-h-0">
                    <HeaderWithIconRow
                        title="Ethos"
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
