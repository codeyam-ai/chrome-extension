import { ArrowLongUpIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CreateWalletProvider from './CreateWalletProvider';
import { useAppSelector } from '../../hooks';
import Button from '../../shared/buttons/Button';
import Body from '../../shared/typography/Body';
import WalletList from '../../shared/wallet-list/WalletList';
import LoadingIndicator from '../loading/LoadingIndicator';
import { openInNewTab } from '_src/shared/utils';

interface WalletPickerProps {
    selectOnly?: boolean;
    isWalletEditing?: boolean;
}

const WalletPicker = ({
    selectOnly = false,
    isWalletEditing = false,
}: WalletPickerProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [createWallet, setCreateWallet] = useState<() => void>(
        () => () => null
    );
    const [loading, setLoading] = useState(false);
    const { accountInfos, authentication } = useAppSelector(
        ({ account }) => account
    );
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

    const importedAccounts = useMemo(
        () =>
            accountInfos.filter(
                (account) =>
                    account.importedMnemonicName ||
                    account.importedPrivateKeyName ||
                    account.importedLedgerIndex !== undefined
            ),
        [accountInfos]
    );

    const openLedgerTab = useCallback(() => {
        if (location.pathname === '/home/ledger') {
            navigate('/home/ledger');
        } else {
            openInNewTab(`/ui.html#/home/ledger`);
        }
    }, [location, navigate]);

    return (
        <div className="flex flex-col h-full">
            <WalletList
                hasTopPadding
                wallets={accountInfos}
                activeAccountIndex={activeAccountIndex}
                isWalletEditing={isWalletEditing}
            />
            {!selectOnly && (
                <div>
                    {!isWalletEditing ? (
                        <div className="py-3 flex flex-col">
                            <CreateWalletProvider
                                setCreateWallet={setCreateWallet}
                                setLoading={setLoading}
                            >
                                <Button
                                    buttonStyle="primary"
                                    onClick={createWallet}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <LoadingIndicator />
                                    ) : (
                                        'Create Wallet'
                                    )}
                                </Button>
                            </CreateWalletProvider>
                            {!authentication && (
                                <Button
                                    buttonStyle="secondary"
                                    to="/home/manage-wallets"
                                    disabled={loading}
                                >
                                    {importedAccounts.length > 0
                                        ? 'Manage'
                                        : 'Import'}{' '}
                                    External Wallets
                                </Button>
                            )}
                            <Button
                                buttonStyle="secondary"
                                onClick={openLedgerTab}
                                disabled={loading}
                            >
                                Connect Ledger Wallet
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-2 py-4 px-5 place-content-center">
                            <ArrowLongUpIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                            <Body isTextColorMedium>
                                Select the wallet you&apos;d like to edit
                            </Body>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WalletPicker;
