import { generateOnRampURL } from '@coinbase/cbpay-js';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroswapDark from '_images/payments/logos/heroswap-dark';
import HeroswapLight from '_images/payments/logos/heroswap-light';
import MoonpayDark from '_images/payments/logos/moonpay-dark';
import MoonpayLight from '_images/payments/logos/moonpay-light';
import TransakDark from '_images/payments/logos/transak-dark';
import TransakLight from '_images/payments/logos/transak-light';
import { API_ENV } from '_src/shared/api-env';
import { useTheme } from '_src/shared/utils/themeContext';
import checkMoonpaySupport from '_src/ui/app/helpers/checkMoonpaySupport';
import { useAppSelector } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Typography from '_src/ui/app/shared/typography/Typography';
import CoinbaseDark from '_src/ui/assets/images/payments/logos/coinbase-dark';
import CoinbaseLight from '_src/ui/assets/images/payments/logos/coinbase-light';

const providers = [
    {
        name: 'Moonpay',
        isRedirect: false,
        path: '/home/buy/moonpay',
        logo: {
            light: <MoonpayLight />,
            dark: <MoonpayDark />,
        },
    },
    {
        name: 'Transak',
        isRedirect: true,
        path: undefined,
        logo: {
            light: <TransakLight />,
            dark: <TransakDark />,
        },
    },
    {
        name: 'Coinbase',
        isRedirect: true,
        path: undefined,
        logo: {
            light: <CoinbaseLight />,
            dark: <CoinbaseDark />,
        },
    },
];

const cryptoProviders = [
    {
        name: 'Heroswap',
        isRedirect: false,
        path: '/home/buy/heroswap',
        logo: {
            light: <HeroswapLight />,
            dark: <HeroswapDark />,
        },
    },
];

interface ProviderSelectProps {
    theme: string;
    provider: {
        name: string;
        isRedirect: boolean;
        path: string | undefined;
        logo: {
            light: JSX.Element;
            dark: JSX.Element;
        };
    };
}

const ProviderSelect = ({ theme, provider }: ProviderSelectProps) => {
    const navigate = useNavigate();
    const selectedApiEnv = useAppSelector(({ app }) => app.apiEnv);
    const { address } = useAppSelector(({ account }) => account);

    const isProduction = selectedApiEnv.toString() === API_ENV.mainNet;
    const env = isProduction ? 'production' : 'staging';
    const code = 'SUI';
    const apiKey = isProduction
        ? '2ce1afb2-adf6-4c11-827e-000fabd7ffd8'
        : '0d469a3f-08ba-4cf6-9c7d-c5371a0d06c2';
    const baseUrl = isProduction
        ? 'https://global.transak.com'
        : 'https://global-stg.transak.com';
    const colorCode = encodeURIComponent('#6D28D9');

    const getCoinbaseUrl = () => {
        const onRampURL = generateOnRampURL({
            appId: '1dbd2a0b94',
            destinationWallets: [
                { address: address as string, blockchains: ['sui'] },
            ],
        });
        return onRampURL;
    };

    const selectProvider = useCallback(() => {
        if (provider.name === 'Transak') {
            const url = `${baseUrl}?apiKey=${apiKey}&themeColor=${colorCode}&environment=${env}&cryptoCurrencyCode=${code}&hideMenu=true&exchangeScreenTitle=Buy%20SUI&walletAddress=${address}`;
            window.location.href = url;
        } else if (provider.name === 'Coinbase') {
            if (address && typeof address === 'string') {
                window.location.href = getCoinbaseUrl();
            }
        } else {
            if (provider.path) {
                navigate(provider.path);
            }
        }
    }, [provider, navigate, baseUrl, apiKey, colorCode, env, address]);

    return (
        <button
            onClick={selectProvider}
            className={
                'flex items-center w-full mb-3 h-[60px] rounded-lg p-5 text-left border bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary dark:border-ethos-dark-background-secondary border-ethos-light-background-secondary hover:border-ethos-light-primary-light hover:dark:border-ethos-dark-primary-dark transition-all'
            }
        >
            <div
                className={
                    'w-full flex flex-col items-center relative justify-center'
                }
            >
                <div
                    className={
                        'flex w-full flex-row justify-center items-center'
                    }
                >
                    {theme === 'light'
                        ? provider.logo.light
                        : provider.logo.dark}
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
            <div className="flex items-center justify-between p-4 shadow-ethos-shadow-small bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                <BodyLarge
                    isSemibold
                    className="mx-auto text-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                >
                    Get Sui
                </BodyLarge>
                <div className={'w-4'}>
                    {/* This empty div will push the title to the center */}
                </div>
            </div>
            <div
                className={
                    'py-5 px-4 bg-ethos-light-background-default dark:bg-ethos-dark-background-default overflow-auto'
                }
            >
                <div className="text-left">
                    <BodyLarge isSemibold>Buy with a credit card</BodyLarge>
                    <Body isSemibold isTextColorMedium className={'mb-4'}>
                        Select a provider
                    </Body>
                </div>
                {providers.map((provider, index) => (
                    <ProviderSelect
                        provider={provider}
                        theme={resolvedTheme}
                        key={index}
                    />
                ))}
                <BodyLarge isSemibold className={'text-left mb-2 mt-6'}>
                    Buy with crypto
                </BodyLarge>
                {cryptoProviders.map((provider, index) => (
                    <ProviderSelect
                        provider={provider}
                        theme={resolvedTheme}
                        key={index}
                    />
                ))}
                <Typography className="mt-6 font-[12px] rounded-md leading-[16px] w-full left-0 text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium right-0 bottom-[56px] py-3 px-4 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                    <b>Ethos is not a fiat-to-crypto payment provider</b>, but
                    enables in-wallet access to select payment processors.
                    {isAllowed &&
                        ' MoonPay is our recommended partner for their services in the Europe, UK, Australia, Brazil, and Canada.'}
                </Typography>
            </div>
        </>
    );
};

export default OnboardingProviders;
