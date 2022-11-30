import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '_src/ui/app/hooks';
import {
    assertPasswordIsCorrect,
    changePassword,
    loadAccountInformationFromStorage,
} from '_src/ui/app/redux/slices/account';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';
import { useNextSettingsUrl } from '../../../../hooks';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const settingsHomeUrl = useNextSettingsUrl(true);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

    const onPasswordChanged = useCallback(
        async (currentPassword: string, newPassword: string) => {
            const unlockResult = await dispatch(
                assertPasswordIsCorrect(currentPassword)
            );
            console.log('unlockResult :>> ', unlockResult);
            // If passwords don't match, unlock returns false
            if (!unlockResult.payload) {
                setIsPasswordIncorrect(true);
                return;
            }
            setIsPasswordIncorrect(false);
            console.log('password changed to', newPassword);

            const changePasswordRes = await dispatch(
                changePassword({ currentPassword, newPassword })
            );
            console.log('changePasswordRes :>> ', changePasswordRes);
            await dispatch(loadAccountInformationFromStorage());
            navigate(settingsHomeUrl);
        },
        [dispatch, navigate, settingsHomeUrl]
    );

    return (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Update Password</Header>
                <BodyLarge isTextColorMedium>
                    First enter your current password, then your new password.
                </BodyLarge>
            </ContentBlock>
            <ChangePasswordForm
                onSubmit={onPasswordChanged}
                isPasswordIncorrect={isPasswordIncorrect}
            />
        </div>
    );
};

export default ChangePasswordPage;
