import { useCallback, useState } from 'react';

import ResetWalletForm from './ResetWalletForm';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import ConfirmDestructiveActionDialog from '_src/ui/app/shared/dialog/ConfirmDestructiveActionDialog';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';
import Button from '_src/ui/app/shared/buttons/Button';
import { capitalize } from 'lodash';
import LoadingIndicator from '../../../loading/LoadingIndicator';

const SignOutZk = () => {
    const zkData = useAppSelector(({ account }) => account.zkData);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const reset = useCallback(async () => {
        setLoading(true);
        await dispatch(resetWallet());
    }, [dispatch]);

    return (
        <div className="flex">
            <div className="flex flex-col gap-6">
                <ContentBlock>
                    <Header>Sign Out of Ethos</Header>
                    <Body isTextColorMedium>
                        After you sign out of Ethos, you must sign back in
                        through{' '}
                        <span className="font-semibold text-ethos-light-text-default dark:text-ethos-dark-text-default">
                            {capitalize(zkData?.provider)}
                        </span>{' '}
                        as{' '}
                        <span className="font-semibold text-ethos-light-text-default dark:text-ethos-dark-text-default">
                            {zkData?.provider === 'facebook'
                                ? zkData?.profileInfo?.name
                                : zkData?.profileInfo?.email}
                        </span>{' '}
                        to access the this wallet again.
                    </Body>
                    <Body isTextColorMedium>
                        If you sign in to a different wallet or App with this
                        account, a different wallet will be created.
                    </Body>
                </ContentBlock>
                <Button onClick={reset} disabled={loading}>
                    {loading ? <LoadingIndicator /> : 'Sign Out'}
                </Button>
            </div>
        </div>
    );
};

export default SignOutZk;
