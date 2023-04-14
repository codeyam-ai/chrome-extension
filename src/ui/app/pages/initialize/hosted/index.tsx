// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';

import LoadingIndicator from '../../../components/loading/LoadingIndicator';
import { iframe } from '../../../helpers';
import { AppState } from '../../../hooks/useInitializedGuard';
import { saveAuthentication, saveEmail } from '../../../redux/slices/account';
import EmailForm from '../../../shared/forms/EmailForm';
import OnboardingCard from '../../../shared/layouts/OnboardingCard';
import Body from '../../../shared/typography/Body';
import ContentBlock from '../../../shared/typography/ContentBlock';
import EthosLink from '../../../shared/typography/EthosLink';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import { LinkType } from '_src/enums/LinkType';
import { IFRAME_URL, MAILTO_SUPPORT_URL } from '_src/shared/constants';

export const AUTHENTICATION_REQUESTED = 'AUTHENTICATION_REQUESTED';

const HostedPage = () => {
    const dispatch = useAppDispatch();
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
        iframe.listenForReady();
    }, [dispatch]);

    return (
        <Loading loading={checkingInitialized} big={true}>
            <OnboardingCard
                title="Create a Wallet With Email"
                subtitle="A link will be sent to your e-mail to log in."
                accentColor="blue"
                icon="envelope"
            >
                {emailSent ? (
                    <ContentBlock className="!px-10 !pb-10 text-center">
                        <Body isSemibold={true}>We sent you an email!</Body>
                        <Body as="p" isTextColorMedium>
                            An email has been sent to {email} with a link to
                            create to your Ethos Wallet. Not seeing an email?
                            Check your spam folder, or{' '}
                            <EthosLink to={MAILTO_SUPPORT_URL} type="external">
                                contact us
                            </EthosLink>
                            .
                        </Body>
                    </ContentBlock>
                ) : error ? (
                    <div className="px-10 pb-10 text-center">
                        <Body as="p" isTextColorMedium className="mb-2">
                            There&apos;s been an error and the team has been
                            notified.
                        </Body>
                        <Body as="p" isTextColorMedium>
                            If this continues, please reach out to{' '}
                            <EthosLink
                                type={LinkType.External}
                                to="mailto:support@ethoswallet.xyz"
                            >
                                support@ethoswallet.xyz
                            </EthosLink>
                        </Body>
                    </div>
                ) : loading && authentication === AUTHENTICATION_REQUESTED ? (
                    <div className="flex justify-center items-center p-6 text-xl">
                        <LoadingIndicator />
                    </div>
                ) : (
                    <EmailForm onSubmit={_handleSubmit} loading={loading} />
                )}
            </OnboardingCard>

            <iframe
                id="wallet-iframe"
                src={IFRAME_URL}
                height="1px"
                width="1px"
                title="wallet"
                // Hide the iframe pixel, as it is visible in dark mode
                className="-top-[1000px] absolute"
            />
        </Loading>
    );
};

export default HostedPage;
