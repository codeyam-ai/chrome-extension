// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import DarkModeToggle from '../components/darkModeToggle';
import logo from '../components/logo/ethos-logo.png';
import { AppState } from '../hooks/useInitializedGuard';
import { ButtonStyle } from '../shared/buttons/Button';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';
import Title from '../shared/typography/Title';
import BodyLarge from '../shared/typography/BodyLarge';
import Body from '../shared/typography/Body';
import VerticalButtonGroup from '../shared/buttons/VerticalButtonGroup';
import { LinkType, TextColor } from '_src/enums/TypographyEnums';
import EthosLink from '../shared/typography/EthosLink';

const WelcomePage = () => {
    const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <div className="w-full mb-2">
                    <span className="float-right">
                        <DarkModeToggle />
                    </span>
                </div>
                <div className="mx-auto max-w-sm pt-6 pb-8 shadow-xl rounded-lg px-10 bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                    <div className="text-center">
                        <div className="mb-4">
                            <img
                                src={logo}
                                className="h-36 mx-auto pb-3"
                                alt="Ethos Wallet logo"
                            />
                            <Title as="h1">Ethos</Title>
                            <Body className="text-ethos-light-primary-light dark:text-ethos-dark-primary-light">
                                The new web awaits
                            </Body>
                        </div>
                        <BodyLarge className="mb-2">
                            Welcome, let&apos;s get started!
                        </BodyLarge>
                        <VerticalButtonGroup
                            buttonOneStyle={ButtonStyle.PRIMARY}
                            buttonOneTo="/initialize/create"
                            buttonOneChildren={'Create A New Wallet'}
                            buttonTwoStyle={ButtonStyle.SECONDARY}
                            buttonTwoTo="/initialize/hosted"
                            buttonTwoChildren={'Sign In With Email'}
                        />
                    </div>
                    <Body as="p" textColor={TextColor.Medium} className="mb-2">
                        Have a recovery phrase?{' '}
                        <EthosLink
                            type={LinkType.Internal}
                            to="/initialize/import"
                        >
                            Import →
                        </EthosLink>
                    </Body>
                    <Body as="p" textColor={TextColor.Medium}>
                        Are you a developer? Add Ethos sign-in to your dApp.{' '}
                        <EthosLink
                            type={LinkType.External}
                            to="https://ethoswallet.xyz/dev"
                        >
                            Learn how →
                        </EthosLink>
                    </Body>
                </div>
            </Loading>
        </PageLayout>
    );
};

export default WelcomePage;
