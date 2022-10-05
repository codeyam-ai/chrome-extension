// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { AppState } from '../hooks/useInitializedGuard';
import GetStartedCard from '../shared/GetStartedCard';
import { ButtonStyle } from '../shared/buttons/Button';
import VerticalButtonGroup from '../shared/buttons/VerticalButtonGroup';
import Body from '../shared/typography/Body';
import BodyLarge from '../shared/typography/BodyLarge';
import EthosLink from '../shared/typography/EthosLink';
import Title from '../shared/typography/Title';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';
import { LinkType, TextColor } from '_src/enums/TypographyEnums';

const WelcomePage = () => {
    const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <GetStartedCard>
                    <div className="mb-4">
                        <Title as="h1">Ethos</Title>
                        <Body textColor={TextColor.Medium}>
                            The new web awaits
                        </Body>
                    </div>
                    <BodyLarge as="p" className="mb-2">
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
                    <div className="text-left">
                        <Body
                            as="p"
                            textColor={TextColor.Medium}
                            className="mb-2"
                        >
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
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default WelcomePage;
