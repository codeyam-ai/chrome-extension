import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LedgerLogo from './LedgerLogo';
import { useTheme } from '_src/shared/utils/themeContext';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import WalletButton from '_src/ui/app/shared/wallet-list/WalletButton';
import Subheader from '_src/ui/app/shared/typography/Subheader';

const LedgerHome = () => {
    const { accountInfos } = useAppSelector((state) => state.account);

    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();

    const [isConnectingToLedger, setConnectingToLedger] = useState(false);
    const { connectToLedger } = useSuiLedgerClient();

    const onContinueClick = useCallback(async () => {
        try {
            setConnectingToLedger(true);
            await connectToLedger(true);
            navigate('/home/ledger/import');
        } catch (error) {
            console.log('ERROR', error);
        } finally {
            setConnectingToLedger(false);
        }
    }, [connectToLedger, navigate]);

    const onCancel = useCallback(() => {
        navigate('/home/ledger');
    }, [navigate]);

    const ledgerAccounts = useMemo(() => {
        return accountInfos.filter(
            (account) => account.importedLedgerIndex !== undefined
        );
    }, [accountInfos]);

    return (
        <div
            className={`flex flex-col gap-6 ${
                ledgerAccounts.length > 0 ? 'p-6' : 'p-12'
            } items-center`}
        >
            <div>
                <LedgerLogo
                    color={resolvedTheme === 'light' ? 'black' : 'white'}
                />
            </div>

            {ledgerAccounts.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <Subheader>Selected Ledger Accounts</Subheader>
                    {ledgerAccounts.map((account) => {
                        return (
                            <div
                                key={`ledger-${account.address}`}
                                className="flex flex-col gap-1 p-3 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-lg"
                            >
                                <WalletButton
                                    wallet={account}
                                    isActive={false}
                                    isWalletEditing={false}
                                />
                            </div>
                        );
                    })}
                    <Body className="pt-6">
                        To edit your selected accounts click &#34;Connect&#34;
                    </Body>
                </div>
            ) : (
                <>
                    <Body>
                        Connect your ledger to your computer, unlock it, and
                        launch the Sui app.
                    </Body>
                    <Body>When done click &#34;Connect&#34;</Body>
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
                </>
            )}

            <div
                className={`flex justify-center items-center gap-6 ${
                    ledgerAccounts.length > 0 ? '' : 'pt-6'
                }`}
            >
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
                    {isConnectingToLedger ? <LoadingIndicator /> : 'Connect'}
                </Button>
            </div>
        </div>
    );
};

export default LedgerHome;
