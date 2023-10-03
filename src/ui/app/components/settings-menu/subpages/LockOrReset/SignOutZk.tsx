import { capitalize } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import LoadingIndicator from '../../../loading/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

const SignOutZk = () => {
    const zkData = useAppSelector(({ account }) => account.zkData);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const reset = useCallback(async () => {
        setLoading(true);
        await dispatch(resetWallet());
    }, [dispatch]);

    const loginName = useMemo(() => {
        let name: string | undefined;

        if (zkData?.profileInfo) {
            if ('email' in zkData.profileInfo) {
                name = zkData.profileInfo.email;
            }
            if ('preferred_username' in zkData.profileInfo) {
                name = zkData.profileInfo.preferred_username;
            }
        }

        return name;
    }, [zkData]);

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
                            {loginName}
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
