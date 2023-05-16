import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MoonpayDark from '_images/payments/logos/moonpay-dark';
import MoonpayLight from '_images/payments/logos/moonpay-light';
import TransakDark from '_images/payments/logos/transak-dark';
import TransakLight from '_images/payments/logos/transak-light';
import { LinkType } from '_src/enums/LinkType';
import { API_ENV } from '_src/shared/api-env';
import { useTheme } from '_src/shared/utils/themeContext';
import checkMoonpaySupport from '_src/ui/app/helpers/checkMoonpaySupport';
import { useAppSelector } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';

const providers = [
    {
        isRedirect: false, // corrected here
        path: '/home/buy/moonpay',
        logo: {
            light: <MoonpayLight />,
            dark: <MoonpayDark />,
        },
        link: {
            type: LinkType.External,
            url: 'https://www.moonpay.com/',
        },
    },
    {
        isRedirect: true,
        path: undefined,
        logo: {
            light: <TransakLight />,
            dark: <TransakDark />,
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
        isRedirect: boolean;
        path: string | undefined;
        logo: {
            light: JSX.Element;
            dark: JSX.Element;
        };
        link: {
            type: LinkType;
            url: string;
        };
    };
}

const ProviderSelect = ({ theme, provider }: ProviderSelectProps) => {
    const navigate = useNavigate();
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

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

    const selectProvider = useCallback(() => {
        if (!provider.isRedirect) {
            if (provider.path) {
                navigate(provider.path);
            }
        } else {
            const url = `${baseUrl}?apiKey=${apiKey}&themeColor=${colorCode}&environment=${env}&cryptoCurrencyCode=${code}&hideMenu=true&exchangeScreenTitle=Buy%20SUI`;
            window.location.href = url;
        }
    }, [
        navigate,
        provider.path,
        apiKey,
        baseUrl,
        colorCode,
        env,
        provider.isRedirect,
    ]);

    const preventPropagation = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
        },
        []
    );

    return (
        <button
            onClick={selectProvider}
            className={
                'flex items-center w-full mb-5 h-20 rounded-lg p-5 text-left border border-ethos-light-background-secondary hover:border-ethos-light-primary-light hover:dark:border-ethos-dark-primary-dark dark:border-ethos-dark-border-dark transition-all'
            }
        >
            <div className={'w-full flex flex-col justify-between relative'}>
                <div
                    className={
                        'flex w-full flex-row justify-between items-center'
                    }
                >
                    {theme === 'light'
                        ? provider.logo.light
                        : provider.logo.dark}
                    <EthosLink
                        className={'text-sm underline text-right'}
                        to={provider.link.url}
                        type={provider.link.type}
                        onClick={preventPropagation}
                    >
                        Details
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
