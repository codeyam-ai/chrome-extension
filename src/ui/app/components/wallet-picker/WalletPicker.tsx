import { ArrowLongUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { useAppSelector } from '../../hooks';
import Button from '../../shared/buttons/Button';
import Body from '../../shared/typography/Body';
import WalletList from '../../shared/wallet-list/WalletList';
import LoadingIndicator from '../loading/LoadingIndicator';
import CreateWalletProvider from './CreateWalletProvider';

interface WalletPickerProps {
    isWalletEditing: boolean;
}

const WalletPicker = ({ isWalletEditing }: WalletPickerProps) => {
    const [createWallet, setCreateWallet] = useState<() => void>(
        () => () => null
    );
    const [loading, setLoading] = useState(false);
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

    return (
        <div className="flex flex-col h-full">
            <WalletList
                hasTopPadding
                wallets={accountInfos}
                activeAccountIndex={activeAccountIndex}
                isWalletEditing={isWalletEditing}
            />
            <div className="border-t border-t-ethos-light-text-stroke dark:border-t-ethos-dark-text-stroke">
                {!isWalletEditing ? (
                    <div className="pt-6">
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
        </div>
    );
};

export default WalletPicker;
