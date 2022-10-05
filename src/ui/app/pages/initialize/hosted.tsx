// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingIndicator from '../../components/loading/LoadingIndicator';
import logo from '../../components/logo/ethos-logo.png';
import { iframe } from '../../helpers';
import { AppState } from '../../hooks/useInitializedGuard';
import {
    saveAccountInfos,
    saveAuthentication,
    saveEmail,
    setAddress,
} from '../../redux/slices/account';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import BackButton from './BackButton';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import Authentication from '_src/background/Authentication';
import { IFRAME_URL } from '_src/shared/constants';

import type { ChangeEvent, FormEvent } from 'react';

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

    const _handleEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
        },
        []
    );

    const _handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
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
        [email, emailSent, dispatch]
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
            {!shouldLogInImmediately && <BackButton to="/welcome" />}
            <div className="">
                <div className="divide-y divide-gray-300/50">
                    <div className="text-center space-y-2 py-4 text-base leading-7">
                        <h1 className="mb-4 font-semibold tracking-tight">
                            <img
                                src={logo}
                                className="h-36 mx-auto pb-3"
                                alt=""
                            />
                            <span className="block text-5xl">Ethos</span>
                            <span className="block text-ethos-primary dark:text-violet-400 font-thin text-lg">
                                The new web awaits
                            </span>
                        </h1>
                        {emailSent ? (
                            <div className="">
                                An email has been sent to {email} with a link
                                that will automatically log you in.
                            </div>
                        ) : error ? (
                            <div className="text-sm text-gray-700 dark:text-gray-400">
                                <p>
                                    There&apos;s been an error and the team has
                                    been notified.
                                </p>
                                <br />
                                <p>
                                    If this continues, please reach out to{' '}
                                    <a
                                        className="underline text-ethos-primary dark:text-violet-400"
                                        href="mailto:support@ethoswallet.xyz"
                                    >
                                        support@ethoswallet.xyz
                                    </a>
                                </p>
                            </div>
                        ) : shouldLogInImmediately ||
                          (loading &&
                              authentication === AUTHENTICATION_REQUESTED) ? (
                            <div className="flex justify-center items-center p-6 text-xl">
                                <LoadingIndicator />
                            </div>
                        ) : (
                            <form
                                className="flex flex-col gap-1"
                                onSubmit={_handleSubmit}
                            >
                                <div className="font-semibold px-10 text-left text-gray-700 dark:text-gray-400">
                                    Sign in with your email
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={_handleEmailChange}
                                    className="w-full py-1 px-2 mb-1 text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                                    required={true}
                                />
                                <div className="flex justify-center">
                                    {loading ? (
                                        <div className="flex justify-center items-center p-6 text-xl">
                                            <LoadingIndicator />
                                        </div>
                                    ) : (
                                        <Button
                                            buttonStyle={ButtonStyle.PRIMARY}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                    )}
                                </div>
                            </form>
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
                </div>
            </div>
        </Loading>
    );
};

export default HostedPage;
