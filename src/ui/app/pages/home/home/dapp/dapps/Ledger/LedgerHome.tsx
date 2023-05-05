import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LedgerLogo from './LedgerLogo';
import { useTheme } from '_src/shared/utils/themeContext';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';

const LedgerHome = () => {
    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();

    const [isConnectingToLedger, setConnectingToLedger] = useState(false);
    const { connectToLedger } = useSuiLedgerClient();

    const onContinueClick = useCallback(async () => {
        try {
            setConnectingToLedger(true);
            await connectToLedger(true);
            console.log('CONFIRMED!');
        } catch (error) {
            console.log('ERROR', error);
        } finally {
            setConnectingToLedger(false);
        }
    }, [connectToLedger]);

    const onCancel = useCallback(() => {
        navigate('/home/ledger');
    }, [navigate]);

    return (
        <div className="flex flex-col gap-6 p-12 items-center">
            <div>
                <LedgerLogo
                    color={resolvedTheme === 'light' ? 'black' : 'white'}
                />
            </div>
            <Body>
                Connect your ledger to your computer, unlock it, and launch the
                Sui app.
            </Body>
            <Body>Click Continue when done.</Body>
            <Body>
                Need more help?{' '}
                <a
                    href="https://github.com/MystenLabs/mysten-app-docs/blob/main/sui-wallet-with-ledger.md"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-ethos-light-primary-light dark:text-ethos-dark-primary-light"
                >
                    View tutorial
                </a>
            </Body>
            <div className="flex justify-center items-center gap-6  pt-6">
                <Button
                    buttonStyle="secondary"
                    onClick={onCancel}
                    className="w-[120px]"
                    removeContainerPadding
                >
                    Cancel
                </Button>
                <Button
                    buttonStyle="primary"
                    onClick={onContinueClick}
                    className="w-[120px]"
                    removeContainerPadding
                >
                    {isConnectingToLedger ? <LoadingIndicator /> : 'Continue'}
                </Button>
            </div>
        </div>
    );
};

export default LedgerHome;
