import { useCallback, useEffect, useState } from 'react';
import { LinkType } from '_src/enums/LinkType';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';

import transakLight from '_images/payments/logos/transak-light.png';
import transakDark from '_images/payments/logos/transak-dark.png';
import moonpayLight from '_images/payments/logos/moonpay-light.png';
import moonpayDark from '_images/payments/logos/moonpay-dark.png';
import { useTheme } from '_src/shared/utils/themeContext';
import { useNavigate } from 'react-router-dom';
import checkMoonpaySupport from '_src/ui/app/helpers/checkMoonpaySupport';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const providers = [
    {
        path: '/home/buy/moonpay',
        logo: {
            light: moonpayLight,
            dark: moonpayDark,
            altText: 'Moonpay payments for fiat to SUI purchases',
        },
        link: {
            type: LinkType.External,
            url: 'https://www.moonpay.com/',
        },
    },
    {
        path: '/home/buy/transak',
        logo: {
            light: transakLight,
            dark: transakDark,
            altText: 'Transak payments for fiat to SUI purchases',
        },
        link: {
            type: LinkType.External,
            url: 'https://transak.com/',
        },
    },
];

interface ProviderSelectProps {
    theme: string;
    provider: {
        path: string;
        logo: {
            light: string;
            dark: string;
            altText: string;
        };
        link: {
            type: LinkType;
            url: string;
        };
    };
}

const ProviderSelect = ({ theme, provider }: ProviderSelectProps) => {
    const navigate = useNavigate();
    const selectProvider = useCallback(() => {
        navigate(provider.path);
    }, []);

    return (
        <button
            onClick={selectProvider}
            className={
                'block w-full mb-5 rounded-lg p-5 text-left border border-ethos-light-background-secondary hover:border-ethos-light-primary-light hover:dark:border-ethos-dark-primary-dark dark:border-ethos-dark-border-dark transition-all'
            }
        >
            <div className={'flex flex-col justify-between relative'}>
                <div className={'flex flex-row justify-between items-center'}>
                    <img
                        src={
                            theme === 'light'
                                ? provider.logo.light
                                : provider.logo.dark
                        }
                        alt={provider.logo.altText}
                    />
                    <EthosLink
                        className={'text-sm underline'}
                        to={provider.link.url}
                        type={provider.link.type}
                    >
                        Details{' '}
                        <ArrowUpRightIcon
                            width={16}
                            height={16}
                            className={
                                'text-ethos-light-primary-light dark:ethos-dark-primary-dark ml-2'
                            }
                        />
                    </EthosLink>
                </div>
            </div>
        </button>
    );
};

const OnboardingProviders = () => {
    const { resolvedTheme } = useTheme();
    const [isAllowed, setAllowed] = useState();

    useEffect(() => {
        const checkCountrySupport = async () => {
            const countryAllowed = await checkMoonpaySupport();
            setAllowed(countryAllowed);
        };

        checkCountrySupport();
    }, []);

    return (
        <>
            <div
                className={
                    'p-6 bg-ethos-light-background-default dark:bg-ethos-dark-background-default'
                }
            >
                <Header className={'mb-5'}>Select a Provider</Header>
                {providers.map((provider, index) => (
                    <ProviderSelect
                        provider={provider}
                        theme={resolvedTheme}
                        key={index}
                    />
                ))}
                <Body className="absolute text-[12px] leading-4 w-full left-0 text-left right-0 bottom-[56px] py-4 px-6 bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-secondary">
                    <b>Ethos is not a fiat-to-crypto payment provider</b>, but
                    enables in-wallet access to select payment processors.
                    {isAllowed &&
                        'MoonPay is a recommended partner for their services in the Europe, UK, Australia, Brazil, and Canada.'}
                </Body>
            </div>
        </>
    );
};

export default OnboardingProviders;
