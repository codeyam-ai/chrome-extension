import { useAppSelector } from '../../../../hooks';
import { API_ENV } from '_src/shared/api-env';
import { useTheme } from '_src/shared/utils/themeContext';

export default function HeroswapOnboarding() {
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);
    const { address } = useAppSelector(({ account }) => account);
    const { resolvedTheme } = useTheme();

    const isProduction = selectedApiEnv.toString() === API_ENV.mainNet;
    const network = isProduction ? 'mainnet' : 'testnet';
    const theme = resolvedTheme === 'dark' ? 'dark-purple' : 'light-purple';
    const affiliateAddress = '0x10742A09435949F4bA49460E9EA689cA9cBa4550';

    return (
        <div
            id={'iframe-container'}
            className={`w-full h-full bg-ethos-dark-backround-primary dark:bg-ethos-dark-background-secondary`}
        >
            <iframe
                id={'heroswap-iframe'}
                src={`https://heroswap.com/widget?theme=${theme}&network=${network}&destinationTicker=SUI&affiliateAddress=${affiliateAddress}&destinationAddress=${address}`}
                className={'border-0 m-0 p-0 w-full h-full relative z-20'}
            />
        </div>
    );
}
