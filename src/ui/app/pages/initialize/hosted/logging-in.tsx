import { useEffect } from 'react';

import Authentication from '_src/background/Authentication';
import { IFRAME_URL } from '_src/shared/constants';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { iframe } from '_src/ui/app/helpers';
import { useAppDispatch } from '_src/ui/app/hooks';
import {
    saveAccountInfos,
    saveAuthentication,
    setAddress,
} from '_src/ui/app/redux/slices/account';

const LoggingInPage = () => {
    const dispatch = useAppDispatch();
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
        };
        listenForSuccessfulLogin();
    }, [dispatch]);

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
