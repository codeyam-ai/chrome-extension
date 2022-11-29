import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNextSettingsUrl } from '../../../../hooks';
import ChangePasswordForm from './ChangePasswordForm';
import { useAppDispatch } from '_src/ui/app/hooks';
import {
    savePassphrase,
    loadAccountInformationFromStorage,
} from '_src/ui/app/redux/slices/account';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const settingsHomeUrl = useNextSettingsUrl(true);

    const onPasswordChanged = useCallback(
        async (password: string) => {
            console.log('password changed to', password);
            await dispatch(savePassphrase(password));
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
            <ChangePasswordForm onSubmit={onPasswordChanged} />
        </div>
    );
};

export default ChangePasswordPage;
