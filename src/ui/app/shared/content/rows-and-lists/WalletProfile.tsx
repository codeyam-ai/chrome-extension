import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import WalletColorAndEmojiCircle from '../../WalletColorAndEmojiCircle';
import BodyLarge from '../../typography/BodyLarge';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import AccountAddress, {
    AddressMode,
} from '_src/ui/app/components/account-address';
import {
    useNextWalletPickerUrl,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/settings-menu/hooks';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppSelector } from '_src/ui/app/hooks';

interface WalletProfileProps {
    onClick?: () => void;
    inlineWalletPicker?: boolean;
}

// This component contains the wallet icon, name, and address
const WalletProfile = ({ onClick, inlineWalletPicker }: WalletProfileProps) => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const walletPickerUrl = useNextWalletPickerUrl(true, 'open');
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);
    const shortenedName = truncateString(accountInfo?.name || 'Wallet', 8);

    const CurrentWallet = () => (
        <div
            data-testid="current-wallet"
            className="flex flex-row gap-2 items-center cursor-pointer"
        >
            <WalletColorAndEmojiCircle
                color={accountInfo?.color}
                emoji={accountInfo?.emoji}
                circleSizeClasses="h-6 w-6"
                emojiSizeInPx={12}
            />
            <BodyLarge isSemibold>{shortenedName}</BodyLarge>

            <ChevronDownIcon className="h-4 w-4 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
        </div>
    );

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 items-center py-1">
                {inlineWalletPicker ? (
                    <div onClick={onClick}>
                        <CurrentWallet />
                    </div>
                ) : (
                    <Link
                        to={
                            isWalletPickerOpen
                                ? closeWalletPickerUrl
                                : walletPickerUrl
                        }
                        onClick={onClick}
                    >
                        <CurrentWallet />
                    </Link>
                )}
            </div>
            <AccountAddress
                showName={false}
                showLink={false}
                mode={AddressMode.FADED}
            />
        </div>
    );
};

export default WalletProfile;
