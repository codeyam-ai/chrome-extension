import {
    ArrowDownOnSquareIcon,
    EnvelopeIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/solid';
import { useEffect } from 'react';

import { useInitializedGuard } from '../hooks';
import { useFavoriteDapps } from '../hooks/useFavoriteDapps';
import { AppState } from '../hooks/useInitializedGuard';
import OnboardingButton from '../shared/buttons/OnboardingButton';
import HeaderWithLargeEthosIcon from '../shared/headers/page-headers/HeaderWithLargeEthosIcon';
import OnboardingLayout from '../shared/layouts/OnboardingLayout';
import Title from '../shared/typography/Title';
import { DEFAULT_DAPP_KEYS } from '_src/data/dappsMap';

import type { OnboardingButtonProps } from '../shared/buttons/OnboardingButton';
import { ZKLoginButtons } from '../components/zklogin/ZKLoginButtons';

const setupButtons: OnboardingButtonProps[] = [
    {
        title: 'Generate New Wallet',
        to: '/initialize/create-password',
        linkType: 'internal',
        iconWithNoClasses: <PlusCircleIcon />,
        iconBackgroundColor: '#E81CA5',
        buttonGradientColor: '#F8ECF4',
    },
    {
        title: 'Sign in with Email',
        to: '/initialize/hosted',
        linkType: 'internal',
        iconWithNoClasses: <EnvelopeIcon />,
        iconBackgroundColor: '#6D28D9',
        buttonGradientColor: '#EFECF8',
    },
    {
        title: 'Import an Existing Wallet',
        to: '/initialize/import/seed',
        // Uncomment below line when we add the functionality to import just a private key
        // Also be sure to change the progressCompleted and progressTotal properties in seed.tsx to be 2 and 4, respectively
        // to: '/initialize/import',
        linkType: 'internal',
        iconWithNoClasses: <ArrowDownOnSquareIcon />,
        iconBackgroundColor: '#328EFA',
        buttonGradientColor: '#F0F4F9',
    },
];

const WelcomePage = () => {
    useInitializedGuard([AppState.UNINITIALIZED, AppState.LOCKED]);
    const { setFavoriteDappsKeys } = useFavoriteDapps();

    useEffect(() => {
        setFavoriteDappsKeys(DEFAULT_DAPP_KEYS);
    }, [setFavoriteDappsKeys]);
    return (
        <OnboardingLayout>
            <div className="flex flex-col w-[464px]">
                <HeaderWithLargeEthosIcon
                    description="A re-imagined wallet for discovering apps, games, and NFTs on
                    Sui"
                    forceLightTheme
                />

                <div className="flex flex-col gap-8 text-center py-6 sm:py-10 px-6 sm:px-0 rounded-2xl bg-ethos-light-background-default">
                    <Title forceLightMode className="px-10">
                        Choose how you would like to setup your wallet.
                    </Title>
                    <div className="flex flex-col gap-3 px-10">
                        {setupButtons.map((b, key) => {
                            return (
                                <OnboardingButton
                                    title={b.title}
                                    to={b.to}
                                    linkType={b.linkType}
                                    iconWithNoClasses={b.iconWithNoClasses}
                                    iconBackgroundColor={b.iconBackgroundColor}
                                    buttonGradientColor={b.buttonGradientColor}
                                    key={key}
                                />
                            );
                        })}
                        <ZKLoginButtons />
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default WelcomePage;
