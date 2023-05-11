// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import {
    loadAccountInformationFromStorage,
    assertMnemonicIsCorrect,
    unlock,
    savePassphrase,
} from '../../redux/slices/account';
import UnlockWalletForm from '../../shared/forms/UnlockWalletForm';
import HeaderWithLargeEthosIcon from '../../shared/headers/page-headers/HeaderWithLargeEthosIcon';
import BaseLayout from '../../shared/layouts/BaseLayout';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import PageLayout from '_src/ui/app/pages/PageLayout';
import CheckMnemonicForm from '../../shared/forms/forgotPassword/CheckMnemonicForm';
import { getEncrypted } from '_src/shared/storagex/store';
import ChangePasswordForm from '../../components/settings-menu/subpages/security/subpages/change-password/ChangePasswordForm';
import ChangePasswordFromMnemonicForm from '../../shared/forms/forgotPassword/ChangePasswordFromMnemonicForm';

const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const checkingInitialized = useInitializedGuard(AppState.LOCKED);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [isMnemonicCorrect, setIsMnemonicCorrect] = useState(false);

    const loading = useAppSelector((state) => state.account.loading);
    console.log('loading :>> ', loading);

    const checkMnemonic = useCallback(
        async (mnemonicFromForm: string) => {
            const unlockResult = await dispatch(
                assertMnemonicIsCorrect(mnemonicFromForm)
            );
            // If passwords don't match, unlock returns false
            console.log('unlockResult.payload :>> ', unlockResult.payload);
            if (!unlockResult.payload) {
                setIsPasswordIncorrect(true);
                return;
            }
            setIsPasswordIncorrect(false);
            setIsMnemonicCorrect(true);
            return;
        },
        [dispatch]
    );

    const updatePassword = useCallback(
        async (newPassword: string) => {
            await dispatch(savePassphrase(newPassword));
            navigate('/home');
        },
        [dispatch]
    );

    return (
        <PageLayout>
            checkingInitialized: {checkingInitialized.toString()}
            <Loading
                loading={checkingInitialized}
                resize={true}
                big={true}
                className="p-36"
            >
                <BaseLayout className="!min-h-0">
                    <HeaderWithLargeEthosIcon description="Forgot Password" />
                    {isMnemonicCorrect ? (
                        <ChangePasswordFromMnemonicForm
                            onSubmit={updatePassword}
                        />
                    ) : (
                        <CheckMnemonicForm
                            onSubmit={checkMnemonic}
                            isPasswordIncorrect={isPasswordIncorrect}
                        />
                    )}
                </BaseLayout>
            </Loading>
        </PageLayout>
    );
};

export default ForgotPasswordPage;
