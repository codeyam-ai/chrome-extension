import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Authentication from '_src/background/Authentication';
import { IFRAME_URL } from '_src/shared/constants';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { iframe } from '_src/ui/app/helpers';
import { useAppDispatch, useInitializedGuard } from '_src/ui/app/hooks';
import { AppState } from '_src/ui/app/hooks/useInitializedGuard';
import {
    saveAccountInfos,
    saveAuthentication,
    setAddress,
} from '_src/ui/app/redux/slices/account';

const LoggingInPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useInitializedGuard([AppState.UNINITIALIZED]);
    useEffect(() => {
        const listenForSuccessfulLogin = async () => {
            const accessToken = await iframe.listenForAccessToken();
            Authentication.set(accessToken);
            const accountInfos = await Authentication.getAccountInfos();
            if (accountInfos && accountInfos.length > 0) {
                await dispatch(saveAccountInfos(accountInfos));
                await dispatch(setAddress(accountInfos[0]?.address));
                dispatch(saveAuthentication(accessToken));
            } else {
                Authentication.set(null);
                dispatch(saveAuthentication(null));
            }
            navigate('/');
        };
        listenForSuccessfulLogin();
    }, [dispatch, navigate]);

    useEffect(() => {
        iframe.listenForReady();
    }, [dispatch]);
    return (
        <>
            <LoadingIndicator big />
            <iframe
                id="wallet-iframe"
                src={IFRAME_URL}
                height="1px"
                width="1px"
                title="wallet"
                // Hide the iframe pixel, as it is visible in dark mode
                className="-top-[1000px] absolute"
            />
        </>
    );
};

export default LoggingInPage;
