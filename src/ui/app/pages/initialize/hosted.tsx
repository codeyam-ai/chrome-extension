// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { iframe } from '../../helpers';
import { AppState } from '../../hooks/useInitializedGuard';
import {
    saveAccountInfos,
    saveAuthentication,
    saveEmail,
    setAddress,
} from '../../redux/slices/account';
import EmailForm from '../../shared/forms/EmailForm';
import Body from '../../shared/typography/Body';
import EthosLink from '../../shared/typography/EthosLink';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import Authentication from '_src/background/Authentication';
import { TextColor } from '_src/enums/Typography';
import { IFRAME_URL } from '_src/shared/constants';
import ContentBlock from '../../shared/typography/ContentBlock';
import { LinkType } from '_src/enums/LinkType';

export const AUTHENTICATION_REQUESTED = 'AUTHENTICATION_REQUESTED';

const HostedPage = () => {
    const dispatch = useAppDispatch();
    const search = useLocation().search;
    const shouldLogInImmediately =
        new URLSearchParams(search).get('log-in') === 'true' || false;
    const { authentication } = useAppSelector(({ account }) => account);
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const checkingInitialized = useInitializedGuard([AppState.UNINITIALIZED]);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(false);

    const _handleSubmit = useCallback(
        async (email: string) => {
            setEmail(email);
            setLoading(true);
            setTimeout(async () => {
                if (!emailSent) {
                    setError(true);
                    // console.error('email could not be sent:', email);
                }
            }, 7000);
            await iframe.login(email);
            setEmailSent(true);
            await dispatch(saveEmail(email));
            await dispatch(saveAuthentication(AUTHENTICATION_REQUESTED));
        },
        [emailSent, dispatch]
    );

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
    }, [loading, dispatch]);

    useEffect(() => {
        iframe.listenForReady();
    }, [dispatch]);

    return (
        <Loading loading={checkingInitialized}>
            <div className="text-center space-y-2 py-4 text-base leading-7">
                {emailSent ? (
                    <ContentBlock>
                        <Body isSemibold={true}>Email sent</Body>
                        <Body as="p" textColor={TextColor.Medium}>
                            An email has been sent to {email} with a link that
                            will automatically log you in.
                        </Body>
                    </ContentBlock>
                ) : error ? (
                    <div>
                        <Body
                            as="p"
                            textColor={TextColor.Medium}
                            className="mb-2"
                        >
                            There&apos;s been an error and the team has been
                            notified.
                        </Body>
                        <Body as="p" textColor={TextColor.Medium}>
                            If this continues, please reach out to{' '}
                            <EthosLink
                                type={LinkType.External}
                                to="mailto:support@ethoswallet.xyz"
                            >
                                support@ethoswallet.xyz
                            </EthosLink>
                        </Body>
                    </div>
                ) : shouldLogInImmediately ||
                  (loading && authentication === AUTHENTICATION_REQUESTED) ? (
                    <div className="flex justify-center items-center p-6 text-xl">
                        <LoadingIndicator />
                    </div>
                ) : (
                    <EmailForm onSubmit={_handleSubmit} loading={loading} />
                )}
                <iframe
                    id="wallet-iframe"
                    src={IFRAME_URL}
                    height="1px"
                    width="1px"
                    title="wallet"
                    // Hide the iframe pixel, as it is visible in dark mode
                    className="-top-[1000px] absolute"
                />
            </div>
        </Loading>
    );
};

export default HostedPage;
