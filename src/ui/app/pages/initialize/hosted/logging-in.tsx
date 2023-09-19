/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Authentication from '_src/background/Authentication';
import { IFRAME_URL } from '_src/shared/constants';
import { getSession } from '_src/shared/storagex/store';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { iframe } from '_src/ui/app/helpers';
import { useAppDispatch } from '_src/ui/app/hooks';
import {
    saveAccountInfos,
    saveAuthentication,
    setAddress,
} from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import { AccountInfo } from '_src/ui/app/KeypairVault';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';

const LoggingInPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticationSlow, setAuthenticationSlow] =
        useState<boolean>(false);

    useEffect(() => {
        const setAccessToken = async () => {
            console.log('in setAccessToken');

            let accessToken = (await getSession('accessToken')) as string;
            if (!accessToken) {
                setTimeout(() => {
                    setLoading(false);
                    setAuthenticationSlow(true);
                }, 1500);
                accessToken = await iframe.listenForAccessToken();
            }
            if (!accessToken) {
                setLoading(false);
                setAuthenticationSlow(true);
            }
            Authentication.set(accessToken);

            let accountInfos = await Authentication.getAccountInfos();
            console.log('accountInfos :>> ', accountInfos);

            const isMissingProperties = accountInfos.some(
                (accInfo) =>
                    !accInfo.color || !accInfo.emoji || !accInfo.nickname
            );

            if (isMissingProperties) {
                accountInfos = accountInfos.map((accInfo, index) => {
                    return {
                        ...accInfo,
                        color: accInfo.color ?? getNextWalletColor(index),
                        emoji: accInfo.emoji ?? getNextEmoji(index),
                        nickname:
                            accInfo.nickname ?? accInfo.index === 0
                                ? 'Primary Wallet'
                                : `Wallet ${index + 1}`,
                    };
                });
            }

            if (!accountInfos || accountInfos.length === 0) {
                const newAccountInfo = await Authentication.createAccount(0);
                if (newAccountInfo) {
                    accountInfos = [newAccountInfo];
                }
            }

            console.log('accountInfos after :>> ', accountInfos);

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

    useEffect(() => {
        setTimeout(() => {
            setAuthenticationSlow(true);
        }, 10000);
    }, []);

    useEffect(() => {
        iframe.listenForReady();
    }, [dispatch]);

    const reset = useCallback(async () => {
        await dispatch(saveAuthentication(null));
        navigate('/');
    }, [dispatch, navigate]);

    return (
        <>
            <div className="flex flex-col items-center gap-6">
                <BodyLarge isSemibold>Authenticating</BodyLarge>
                <LoadingIndicator big />
                {!loading && authenticationSlow && (
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
