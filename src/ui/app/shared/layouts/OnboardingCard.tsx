import {
    EnvelopeIcon,
    KeyIcon,
    LockClosedIcon,
} from '@heroicons/react/24/solid';
import { type ReactNode } from 'react';

import EthosLogo from '../../components/logos/EthosLogo';
import EthosLogoGrayscaleWithText from '../../components/logos/EthosLogoGrayscaleWithText';
import BackButton from '../buttons/BackButton';
import BigPinIcon from '../svg/BigPinIcon';
import SmallPinIcon from '../svg/SmallPinIcon';
import WalletIcon from '../svg/WalletIcon';
import BodyLarge from '../typography/BodyLarge';
import JumboTitle from '../typography/JumboTitle';
import Subheader from '../typography/Subheader';
import texture from '_assets/images/onboarding-card-texture.png';

interface OnboardingCardProps {
    title: string;
    subtitle: string;
    accentColor:
        | 'green'
        | 'gold'
        | 'silver'
        | 'blue'
        | 'purple'
        | 'blue-green'
        | 'pink-blue-purple'
        | 'rainbow';
    icon?:
        | 'key'
        | 'envelope'
        | 'pin'
        | 'lock'
        | 'wallet'
        | 'emoji-and-color'
        | 'sui';
    progressCompleted?: number;
    progressTotal?: number;
    isIconBlurred?: boolean;
    hideBackButton?: boolean;
    customRightCard?: ReactNode;
    children: ReactNode;
}

const OnboardingCard = ({
    title,
    subtitle,
    accentColor,
    icon,
    isIconBlurred,
    hideBackButton,
    progressCompleted,
    progressTotal,
    customRightCard,
    children,
}: OnboardingCardProps) => {
    const iconClasses = 'h-16 w-16 text-ethos-light-background-default';
    let iconDisplay = <></>;
    if (icon === 'key') {
        iconDisplay = <KeyIcon className={iconClasses} />;
    }
    if (icon === 'envelope') {
        iconDisplay = <EnvelopeIcon className={iconClasses} />;
    }
    if (icon === 'pin') {
        iconDisplay = <BigPinIcon />;
    }
    if (icon === 'lock') {
        iconDisplay = <LockClosedIcon className={iconClasses} />;
    }
    if (icon === 'wallet') {
        // Temporarily importing from a custom file because of a bug where WalletIcon isn't included in heroicons
        iconDisplay = (
            <span className={iconClasses}>
                <WalletIcon />
            </span>
        );
    }

    let gradientStyle = '';

    // For gradient coming from top right
    let colorRgb = '';
    if (accentColor === 'green') {
        colorRgb = '40,217,79';
    } else if (accentColor === 'gold') {
        colorRgb = '217,136,40';
    } else if (accentColor === 'blue') {
        colorRgb = '50,142,250';
    } else if (accentColor === 'purple') {
        colorRgb = '109,40,217';
    }
    gradientStyle = `linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(${colorRgb},0.12) 50%, rgba(${colorRgb},.5) 100%)`;

    // For non-normal gradients
    if (accentColor === 'silver') {
        gradientStyle =
            'linear-gradient(0deg, rgba(242,242,242,1) 0%, rgba(224,224,224,0) 100%)';
    }
    if (accentColor === 'blue-green') {
        gradientStyle =
            'linear-gradient(100deg, rgba(116,188,211,0.25) 0%, rgba(0,185,223,0.5) 33%, rgba(116,211,143,0.75) 100%)';
    }
    if (accentColor === 'pink-blue-purple') {
        gradientStyle =
            'linear-gradient(115deg, rgba(232,28,165,0.25) 0%, rgba(0,185,223,0.5) 33%, rgba(144,64,245,1) 100%)';
    }
    if (accentColor === 'rainbow') {
        gradientStyle =
            'linear-gradient(80deg, rgba(109,177,224,0.1) 15%, rgba(188,162,232,0.33) 40%, rgba(230,122,72,0.15) 60%, rgba(121,174,225,0.5) 80%, rgba(79,192,177,0.75) 100%)';
    }

    return (
        <>
            <span className="h-[48px] w-[112px] mb-4 tall:mb-8">
                <EthosLogoGrayscaleWithText />
            </span>

            <div className="flex mx-6 lg:w-[928px]">
                <div className="md:basis-1/2 flex-col rounded-2xl md:rounded-l-2xl md:rounded-r-none bg-ethos-light-background-default">
                    <div className="flex flex-col gap-2 p-6 sm:p-10">
                        {!hideBackButton && <BackButton forceLightMode />}
                        <div className="flex-col">
                            {icon === 'sui' && (
                                <JumboTitle isTextColorMedium forceLightMode>
                                    Wallet Set Up
                                </JumboTitle>
                            )}
                            <JumboTitle forceLightMode>{title}</JumboTitle>
                        </div>
                        <Subheader isTextColorMedium forceLightMode>
                            {subtitle}
                        </Subheader>
                    </div>
                    {children}
                </div>
                <div
                    className={`relative hidden md:flex md:basis-1/2 flex-col place-content-center place-items-center rounded-r-2xl ${
                        icon === 'emoji-and-color' ? 'pt-16 pl-16' : 'px-10'
                    }`}
                    style={{
                        backgroundImage: `url(${texture})`,
                        background: gradientStyle,
                    }}
                >
                    {customRightCard ? (
                        customRightCard
                    ) : (
                        <div className="flex flex-col gap-10 h-[252px] w-full place-content-center place-items-center rounded-2xl bg-ethos-light-background-default border-ethos-light-text-stroke ">
                            <div
                                className={`flex place-content-center place-items-center h-[104px] w-[104px] rounded-lg shadow-ethos-onboarding-icon-container-box-shadow ${
                                    isIconBlurred ? 'blur-[10px]' : ''
                                }`}
                                style={{
                                    background:
                                        'conic-gradient(from 142.18deg at 120.31% 87.5%, #EED32C -154.48deg, #E57948 118.75deg, #4AC2A7 142.91deg, #65B1DF 159.02deg, #BCA1E8 177.46deg, #EED32C 205.52deg, #E57948 478.75deg)',
                                }}
                            >
                                {iconDisplay}
                            </div>
                            {icon === 'pin' && (
                                <div className="px-8 w-full">
                                    <div className="flex py-4 pl-5 pr-4 justify-between items-center rounded-2xl bg-ethos-light-background-secondary">
                                        <div className="flex gap-2 items-center">
                                            <span className="h-8 w-8">
                                                <EthosLogo />
                                            </span>
                                            <BodyLarge
                                                isSemibold
                                                forceLightMode
                                            >
                                                Ethos Sui Wallet
                                            </BodyLarge>
                                        </div>
                                        <SmallPinIcon />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {progressCompleted && progressTotal && (
                <div className="absolute bottom-0 flex gap-6 w-full sm:w-[448px] px-6 pb-4 tall:pb-12">
                    {[...Array(progressTotal)].map((_, index) => {
                        return (
                            <div
                                className={`w-full h-4 rounded-full ${
                                    progressCompleted >= index + 1
                                        ? 'bg-black'
                                        : 'bg-ethos-light-background-secondary'
                                }`}
                                key={index}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default OnboardingCard;
