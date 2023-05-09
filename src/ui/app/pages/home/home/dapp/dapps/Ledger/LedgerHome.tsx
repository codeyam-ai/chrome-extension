import { Ed25519PublicKey } from '@mysten/sui.js';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LedgerLogo from './LedgerLogo';
import { derivationPathForLedger } from './hooks/useDeriveLedgerAccounts';
import ledgerReadableError from './lib/ledgerReadableError';
import { useTheme } from '_src/shared/utils/themeContext';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import Loading from '_src/ui/app/components/loading';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { setLedgerConnected } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import WalletButton from '_src/ui/app/shared/wallet-list/WalletButton';

const LedgerHome = () => {
    const dispatch = useAppDispatch();
    const { connectToLedger } = useSuiLedgerClient();
    const { accountInfos } = useAppSelector((state) => state.account);

    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();

    const [isConnectingToLedger, setConnectingToLedger] = useState(false);
    const [testingConnection, setTestingConnection] = useState(false);
    const [successfulConnection, setSuccessfulConnection] = useState(false);
    const [connectionError, setConnectionError] = useState<
        string | undefined
    >();

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

    const testConnection = useCallback(async () => {
        setTestingConnection(true);
        try {
            const suiLedgerClient = await connectToLedger();
            const publicKeyResult = await suiLedgerClient.getPublicKey(
                derivationPathForLedger(0),
                true
            );
            const publicKey = new Ed25519PublicKey(publicKeyResult.publicKey);
            const suiAddress = publicKey.toSuiAddress();

            if (suiAddress) {
                await dispatch(setLedgerConnected(true));
                setSuccessfulConnection(true);
            }
        } catch (error: unknown) {
            console.log('ERROR', error);
            setConnectionError(`${error}`);
            await dispatch(setLedgerConnected(false));
            setSuccessfulConnection(false);
        } finally {
            setTestingConnection(false);
        }
    }, [connectToLedger, dispatch]);

    const reset = useCallback(() => {
        setConnectionError(undefined);
    }, []);

    const ledgerAccounts = useMemo(() => {
        return accountInfos.filter(
            (account) => account.importedLedgerIndex !== undefined
        );
    }, [accountInfos]);

    const readableError = useMemo(() => {
        return ledgerReadableError(connectionError);
    }, [connectionError]);

    if (testingConnection || connectionError) {
        return (
            <Loading
                big={true}
                loading={testingConnection}
                className="py-12 flex justify-center"
            >
                <div className="flex flex-col mt-12 mx-6 gap-3 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary p-6 rounded-lg">
                    <Subheader>{readableError?.title}</Subheader>
                    <Body>{readableError?.message}</Body>
                </div>
                <div className="py-6">
                    <Button buttonStyle="primary" onClick={reset}>
                        Back
                    </Button>
                </div>
            </Loading>
        );
    }

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
                    {successfulConnection ? (
                        <Body>Your ledger is successfully connected!</Body>
                    ) : (
                        <>
                            <Body>
                                Your ledger accounts are read-only right now.
                            </Body>
                            <Body>
                                Test the connection to enable transactions.
                            </Body>

                            <Button
                                buttonStyle="primary"
                                onClick={testConnection}
                            >
                                Test Connection
                            </Button>
                        </>
                    )}
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

                    <Body>
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
