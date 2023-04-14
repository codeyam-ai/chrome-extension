import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Authentication from '_src/background/Authentication';
import { getSession } from '_src/shared/storagex/store';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { useAppDispatch } from '_src/ui/app/hooks';
import {
    saveAccountInfos,
    saveAuthentication,
    setAddress,
} from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

const LoggingInPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const setAccessToken = async () => {
            const accessToken = (await getSession('accessToken')) as string;
            Authentication.set(accessToken);

            const accountInfos = await Authentication.getAccountInfos();
            if (accountInfos && accountInfos.length > 0) {
                await dispatch(saveAccountInfos(accountInfos));
                await dispatch(setAddress(accountInfos[0]?.address));
                dispatch(saveAuthentication(accessToken));
                navigate('/');
            } else {
                Authentication.set(null);
                dispatch(saveAuthentication(null));
                setLoading(false);
            }
        };
        setAccessToken();
    }, [dispatch, navigate]);

    const reset = useCallback(async () => {
        await dispatch(saveAuthentication(null));
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <div className="flex flex-col items-center gap-6">
            <BodyLarge isSemibold>Authenticating</BodyLarge>
            <LoadingIndicator big />
            {!loading && (
                <>
                    <BodyLarge>
                        Authentication is taking a while.
                        <br />
                        You might need to log back in.
                    </BodyLarge>
                    <Button onClick={reset}>Log Back In</Button>
                </>
            )}
        </div>
    );
};

export default LoggingInPage;
