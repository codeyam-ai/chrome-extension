// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { AppState } from '../hooks/useInitializedGuard';
import VerticalButtonGroup from '../shared/buttons/VerticalButtonGroup';
import TextLinkList from '../shared/content/rows-and-lists/TextLinkList';
import GetStartedCard from '../shared/layouts/GetStartedCard';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import { LinkType } from '_src/enums/LinkType';
import PageLayout from '_src/ui/app/pages/PageLayout';

const WelcomePage = () => {
    const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized} big={true}>
                <GetStartedCard showBack={false}>
                    <VerticalButtonGroup
                        className="flex flex-col gap-3"
                        buttonPrimaryTo="/initialize/backup"
                        buttonPrimaryChildren="Create a New Wallet"
                        buttonSecondaryTo="/initialize/hosted"
                        buttonSecondaryChildren="Sign in with Email"
                    />
                    <TextLinkList
                        textAndLinks={[
                            {
                                description: 'Have a recovery phrase?',
                                link: {
                                    type: LinkType.Internal,
                                    to: '/initialize/import',
                                    children: 'Import →',
                                },
                            },
                            {
                                description: 'Add Ethos sign-in to your dApp.',
                                link: {
                                    type: LinkType.External,
                                    to: 'https://ethoswallet.xyz/dev',
                                    children: 'Learn how →',
                                },
                            },
                        ]}
                    />
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default WelcomePage;
