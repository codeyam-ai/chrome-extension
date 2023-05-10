// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import {
    loadAccountInformationFromStorage,
    recoverPasswordFromMnemonic,
    unlock,
} from '../../redux/slices/account';
import UnlockWalletForm from '../../shared/forms/UnlockWalletForm';
import HeaderWithLargeEthosIcon from '../../shared/headers/page-headers/HeaderWithLargeEthosIcon';
import BaseLayout from '../../shared/layouts/BaseLayout';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_src/ui/app/pages/PageLayout';
import ForgotPasswordForm from '../../shared/forms/ForgotPasswordForm';
import { getEncrypted } from '_src/shared/storagex/store';

const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const checkingInitialized = useInitializedGuard(AppState.LOCKED);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

    const _save = useCallback(
        async (mnemonicFromForm: string) => {
            const unlockResult = await dispatch(
                recoverPasswordFromMnemonic(mnemonicFromForm)
            );
            // If passwords don't match, unlock returns false
            if (!unlockResult.payload) {
                setIsPasswordIncorrect(true);
                return;
            }
            // setIsPasswordIncorrect(false);
            // await dispatch(loadAccountInformationFromStorage());
            // navigate((pathname || '/').replace('/locked', ''));
        },
        [dispatch]
    );

    return (
        <PageLayout>
            <Loading
                loading={checkingInitialized}
                resize={true}
                big={true}
                className="p-36"
            >
                <BaseLayout className="!min-h-0">
                    <HeaderWithLargeEthosIcon description="Forgot Password" />
                    <ForgotPasswordForm
                        onSubmit={_save}
                        isPasswordIncorrect={isPasswordIncorrect}
                    />
                </BaseLayout>
            </Loading>
        </PageLayout>
    );
};

export default ForgotPasswordPage;
