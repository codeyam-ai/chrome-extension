import { useAppSelector } from '../../../../hooks';
import BackButton from '../../../../shared/buttons/BackButton';
import Alert from '../../../../shared/feedback/Alert';
import { API_ENV } from '_src/shared/api-env';
import { useDependencies } from '_src/shared/utils/dependenciesContext';

export default function TransakOnboarding() {
    // const address = useAppSelector(({ account }) => account.address); => Add when Sui is supported
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);
    const { featureFlags } = useDependencies();
    const { address } = useAppSelector(({ account }) => account);

    const isProduction = selectedApiEnv.toString() === API_ENV.mainNet;
    const env = isProduction ? 'production' : 'staging';
    const code = 'BTC'; // Switch to SUI once supported
    const apiKey = isProduction
        ? '2ce1afb2-adf6-4c11-827e-000fabd7ffd8'
        : '0d469a3f-08ba-4cf6-9c7d-c5371a0d06c2';
    const baseUrl = isProduction
        ? 'https://global.transak.com'
        : 'https://global-stg.transak.com';
    const colorCode = encodeURIComponent('#6D28D9');

    return featureFlags.showWipFeatures ? (
        <iframe
            title="Transak On-Ramp for Ethos Wallet"
            src={`${baseUrl}?apiKey=${apiKey}&themeColor=${colorCode}&environment=${env}&cryptoCurrencyCode=${code}&hideMenu=true&exchangeScreenTitle=Buy%20SUI&walletAddress=${address}`}
            allowFullScreen={false}
            style={{ display: 'block', width: '100%', height: '100%' }}
        ></iframe>
    ) : (
        <div className={'p-6'}>
            <div className={'mb-6'}>
                <BackButton />
            </div>
            <Alert
                title={'Coming Soon'}
                subtitle={
                    'Ethos will support SUI purchases with Visa, Debit or Mastercard soon.'
                }
            />
        </div>
    );
}
