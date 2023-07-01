import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks';
import { API_ENV } from '_src/shared/api-env';
import { useTheme } from '_src/shared/utils/themeContext';
import checkMoonpaySupport from '_src/ui/app/helpers/checkMoonpaySupport';

export default function MoonpayOnboarding() {
    const address = useAppSelector((state) => state.account.address);
    const [allowed, setAllowed] = useState(undefined);
    const [countryChecked, setCountryChecked] = useState(false);

    useEffect(() => {
        /*fetch('https://dev-api.ethoswallet.xyz/api/v1/payments/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address,
                apiKey: '6319babc-bf35-44d5-a9ba-de08badfa80a',
            }),
        }).then((res) => console.log('results => ', res.json()));*/

        const checkCountrySupport = async () => {
            const countryAllowed = await checkMoonpaySupport();
            setAllowed(countryAllowed);
            setCountryChecked(true);
        };

        checkCountrySupport();
    }, [address]);

    const selectedApiEnv = useAppSelector(({ app }) => app.apiEnv);
    const [searchParams] = useSearchParams();
    const envParam = searchParams.get('env');

    const isProduction = selectedApiEnv.toString() === API_ENV.mainNet;
    const key =
        isProduction || envParam === 'mainNet'
            ? process.env.MOONPAY_PRODUCTION_API_KEY
            : process.env.MOONPAY_TEST_API_KEY;
    const { theme } = useTheme();
    const baseTestingUrl = 'https://buy-staging.moonpay.io';
    const baseProductionUrl = 'https://buy.moonpay.com';
    const baseUrl =
        isProduction || envParam === 'mainNet'
            ? baseProductionUrl
            : baseTestingUrl;
    const coinCode = 'sui'; // TODO: Change to SUI when supported
    const redirect = '/home';
    const colorCode =
        theme === 'dark'
            ? encodeURIComponent('#9C78F7')
            : encodeURIComponent('#6D28D9');

    return (
        <>
            {countryChecked && !allowed && (
                <div className="absolute w-full p-3 bg-ethos-light-background-secondary dark:bg-[#1C1C1E]">
                    Moonpay is not supported in your country. Please use another
                    provider.
                </div>
            )}
            <iframe
                title="Moonpay Onboarding: Buy Sui"
                allow="accelerometer; autoplay; camera; gyroscope; payment"
                height="100%"
                width="100%"
                src={`${baseUrl}?apiKey=${key}&currencyCode=${coinCode}&colorCode=${colorCode}&theme=${theme}&redirectUrl=${redirect}`}
            >
                <p>
                    We could not display this page in your browser. Please
                    update or try another browser to view.
                </p>
            </iframe>
        </>
    );
}
