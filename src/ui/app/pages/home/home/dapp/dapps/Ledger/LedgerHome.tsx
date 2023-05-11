import { Ed25519PublicKey } from '@mysten/sui.js';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LedgerLogo from './LedgerLogo';
import { derivationPathForLedger } from './hooks/useDeriveLedgerAccounts';
import ledgerReadableError from './lib/ledgerReadableError';
import { useTheme } from '_src/shared/utils/themeContext';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import Loading from '_src/ui/app/components/loading';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import humanReadableTransactionErrors from '_src/ui/app/helpers/humanReadableTransactionError';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { saveAccountInfos } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import WalletButton from '_src/ui/app/shared/wallet-list/WalletButton';

import type Sui from '@mysten/ledgerjs-hw-app-sui';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

const LedgerWallet = ({
    account,
    connectToLedger,
}: {
    account: AccountInfo;
    connectToLedger: () => Promise<Sui>;
}) => {
    const dispatch = useAppDispatch();
    const { accountInfos } = useAppSelector(({ account }) => account);

    const testAccount = useCallback(async () => {
        if (!account.importedLedgerIndex) return;

        try {
            const suiLedgerClient = await connectToLedger();
            const publicKeyResult = await suiLedgerClient.getPublicKey(
                derivationPathForLedger(account.importedLedgerIndex),
                true
            );
            const publicKey = new Ed25519PublicKey(publicKeyResult.publicKey);
            const suiAddress = publicKey.toSuiAddress();
            if (suiAddress === account.address) {
                const updatedAccountInfos: AccountInfo[] = accountInfos.map(
                    (accountInfo: AccountInfo) => {
                        if (accountInfo.address === suiAddress) {
                            return {
                                ...accountInfo,
                                ledgerAccountVerified: true,
                            };
                        }
                        return accountInfo;
                    }
                );

                await dispatch(saveAccountInfos(updatedAccountInfos));
            }
        } catch (e: unknown) {
            let message = `Error verifying ledger account: ${humanReadableTransactionErrors(
                `${e}`
            )}`;

            if (
                `${e}`.indexOf('Ledger device: INS_NOT_SUPPORTED (0x6d00)') > -1
            ) {
                message =
                    "An error occurred while verifying. You may need to restart the ledger. Please scroll all the way to the right until you see 'Confirm' in the ledger when verifying";
            }
            toast.error(message);
        }
    }, [account, accountInfos, connectToLedger, dispatch]);

    return (
        <div className="flex flex-col gap-1 p-3 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-lg">
            {!account.ledgerAccountVerified && (
                <div className="flex flex-col items-center">
                    <Subheader>Account Verificiation Required</Subheader>
                    <Body>
                        In order to sign transactions with this account you will
                        need to verify it.
                    </Body>
                    <Button
                        buttonStyle="secondary"
                        onClick={testAccount}
                        removeContainerPadding
                    >
                        Verify Account
                    </Button>
                </div>
            )}
            <WalletButton
                wallet={account}
                isActive={false}
                isWalletEditing={false}
                destination={'/home'}
                disabled={!account.ledgerAccountVerified}
            />
        </div>
    );
};

const LedgerHome = () => {
    const { connectToLedger } = useSuiLedgerClient();
    const { accountInfos } = useAppSelector((state) => state.account);

    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();

    const [isConnectingToLedger, setConnectingToLedger] = useState(false);
    const [connectionError, setConnectionError] = useState<
        string | undefined
    >();

    const onContinueClick = useCallback(async () => {
        try {
            setConnectingToLedger(true);
            await connectToLedger(true);
            navigate('/home/ledger/import');
        } catch (error) {
            toast.error(
                humanReadableTransactionErrors(`Connection error: ${error}`)
            );
        } finally {
            setConnectingToLedger(false);
        }
    }, [connectToLedger, navigate]);

    const onCancel = useCallback(() => {
        navigate('/home/ledger');
    }, [navigate]);

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

    if (connectionError) {
        return (
            <Loading
                big={true}
                loading={false}
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

            {ledgerAccounts.sort(
                (a, b) =>
                    (a.importedLedgerIndex ?? 0) - (b.importedLedgerIndex ?? 0)
            ).length > 0 ? (
                <div className="flex flex-col gap-3">
                    <Subheader>Selected Ledger Accounts</Subheader>

                    <Body>Click an account to select it in the wallet.</Body>

                    {ledgerAccounts.map((account) => {
                        return (
                            <LedgerWallet
                                key={`ledger-account-${account.address}`}
                                account={account}
                                connectToLedger={connectToLedger}
                            />
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
