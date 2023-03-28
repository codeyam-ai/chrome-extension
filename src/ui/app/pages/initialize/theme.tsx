import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useCallback, useContext, useEffect, useState } from 'react';

import StylePreviewCard from '../../components/onboarding/StylePreviewCard';
import getNextEmoji from '../../helpers/getNextEmoji';
import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppSelector } from '../../hooks';
import Button from '../../shared/buttons/Button';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import darkSrc from '_assets/images/themePreview/dark.png';
import lightSrc from '_assets/images/themePreview/light.png';
import systemSrc from '_assets/images/themePreview/system.png';
import { getEncrypted } from '_src/shared/storagex/store';
import { ThemeContext } from '_src/shared/utils/themeContext';

import type { AccountInfo } from '../../KeypairVault';

interface ThemeButtonProps {
    imageSrc: string;
    title: string;
    subTitle: string;
    onClick: () => void;
    isActive: boolean;
}

const ThemeButton = ({
    imageSrc,
    title,
    subTitle,
    onClick,
    isActive,
}: ThemeButtonProps) => {
    return (
        <div
            className="flex justify-between cursor-pointer items-center p-3"
            onClick={onClick}
        >
            <div className="flex gap-3 items-center">
                <img
                    src={imageSrc}
                    alt={title + ' theme'}
                    className="w-12 h-12"
                />
                <div className="flex flex-col">
                    <BodyLarge isSemibold>{title}</BodyLarge>
                    <Body isTextColorMedium>{subTitle}</Body>
                </div>
            </div>
            <div>
                {isActive && <CheckCircleIcon className="w-5 h-5 text-black" />}
            </div>
        </div>
    );
};

const OnboardingThemePage = () => {
    const [isHostedWallet, setIsHostedWallet] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const setThemeToSystem = useCallback(() => {
        setTheme('system');
    }, [setTheme]);

    const setThemeToLight = useCallback(() => {
        setTheme('light');
    }, [setTheme]);

    const setThemeToDark = useCallback(() => {
        setTheme('dark');
    }, [setTheme]);

    const themeButtonItems: ThemeButtonProps[] = [
        {
            imageSrc: systemSrc,
            title: 'System',
            subTitle: 'Allow your system to make the choice',
            onClick: setThemeToSystem,
            isActive: theme === 'system',
        },
        {
            imageSrc: lightSrc,
            title: 'Morning',
            subTitle: 'Switch to light mode',
            onClick: setThemeToLight,
            isActive: theme === 'light',
        },
        {
            imageSrc: darkSrc,
            title: 'Night',
            subTitle: 'Switch to light mode',
            onClick: setThemeToDark,
            isActive: theme === 'dark',
        },
    ];

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted({
                key: 'authentication',
                session: true,
            });
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    return (
        <OnboardingCard
            title="Choose Your Theme"
            subtitle="Pick a mood for your extension"
            accentColor="pink-blue-purple"
            icon="emoji-and-color"
            hideBackButton
            progressCompleted={isHostedWallet ? 2 : 4}
            progressTotal={isHostedWallet ? 3 : 5}
            customRightCard={
                <StylePreviewCard
                    address={accountInfo?.address || ''}
                    color={accountInfo?.color || getNextWalletColor(0)}
                    emoji={accountInfo?.emoji || getNextEmoji(0)}
                />
            }
        >
            <div className="flex flex-col gap-1 px-6 pb-[88px]">
                {themeButtonItems.map((b, key) => {
                    return (
                        <ThemeButton
                            imageSrc={b.imageSrc}
                            title={b.title}
                            subTitle={b.subTitle}
                            onClick={b.onClick}
                            isActive={b.isActive}
                            key={key}
                        />
                    );
                })}
            </div>
            <div className="px-6 sm:px-10 pb-6 sm:pb-10">
                <Button to="/initialize/pin" removeContainerPadding>
                    Continue
                </Button>
            </div>
        </OnboardingCard>
    );
};

export default OnboardingThemePage;
