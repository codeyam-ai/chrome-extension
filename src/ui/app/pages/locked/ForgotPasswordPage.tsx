import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import {
    assertMnemonicIsCorrect,
    changePassword,
    loadAccountInformationFromStorage,
    unlock,
    unlockWithMnemonic,
} from '../../redux/slices/account';
import ChangePasswordFromMnemonicForm from '../../shared/forms/forgotPassword/ChangePasswordFromMnemonicForm';
import CheckMnemonicForm from '../../shared/forms/forgotPassword/CheckMnemonicForm';
import HeaderWithLargeEthosIcon from '../../shared/headers/page-headers/HeaderWithLargeEthosIcon';
import BaseLayout from '../../shared/layouts/BaseLayout';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_src/ui/app/pages/PageLayout';

const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const checkingInitialized = useInitializedGuard(AppState.LOCKED);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [isMnemonicCorrect, setIsMnemonicCorrect] = useState(false);
    const [currentPassword, setCurrentPassword] = useState<string>();

    const checkMnemonic = useCallback(
        async (mnemonicFromForm: string) => {
            const unlockResult = await dispatch(
                assertMnemonicIsCorrect(mnemonicFromForm)
            );
            // If passwords don't match, unlock returns false
            if (!unlockResult.payload) {
                setIsPasswordIncorrect(true);
                return;
            }
            setIsPasswordIncorrect(false);
            setIsMnemonicCorrect(true);
            const recoveredPassword = await dispatch(
                unlockWithMnemonic(mnemonicFromForm)
            );
            setCurrentPassword(recoveredPassword.payload as string);
        },
        [dispatch]
    );

    const updatePassword = useCallback(
        async (newPassword: string) => {
            const success = await dispatch(
                changePassword({
                    currentPassword: currentPassword || '',
                    newPassword,
                })
            );
            if (success.payload) {
                const unlockResult = await dispatch(unlock(newPassword));
                if (!unlockResult.payload) {
                    setIsPasswordIncorrect(true);
                    return;
                }
                await dispatch(loadAccountInformationFromStorage());
                navigate('/home');
            }
        },
        [currentPassword, dispatch, navigate]
    );

    return (
        <PageLayout>
            <Loading
                loading={checkingInitialized}
                resize={true}
                big={true}
                className="p-36"
            >
                <BaseLayout className="!min-h-0 sm:!w-[500px]">
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
