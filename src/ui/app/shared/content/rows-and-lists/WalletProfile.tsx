import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import WalletColorAndEmojiCircle from '../../WalletColorAndEmojiCircle';
import BodyLarge from '../../typography/BodyLarge';
import { AccountType } from '_src/shared/constants';
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
import useWalletName from '_src/ui/app/hooks/useWalletName';

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
    const accountType = useAppSelector(
        ({ account: { accountType } }) => accountType
    );

    const isWalletPickerOpen = useWalletPickerIsOpen();
    const walletPickerUrl = useNextWalletPickerUrl(true, 'open');
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);
    const name = useWalletName(accountInfo);
    const shortenedName = truncateString(name, 8);
    const isZK = useMemo(() => accountType === AccountType.ZK, [accountType]);

    const _onClick = useCallback(() => {
        console.log('in onClick');

        if (isZK) return;
        onClick?.();
    }, [onClick, isZK]);

    const CurrentWallet = () => (
        <div
            className={`flex flex-row gap-2 items-center ${
                isZK ? 'cursor-auto' : 'cursor-pointer'
            }`}
        >
            <WalletColorAndEmojiCircle
                {...accountInfo}
                circleSizeClasses="h-6 w-6"
                emojiSizeInPx={12}
            />
            <BodyLarge isSemibold>{shortenedName}</BodyLarge>

            {!isZK && (
                <ChevronDownIcon className="h-4 w-4 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            )}
        </div>
    );

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 items-center py-1">
                {inlineWalletPicker || isZK ? (
                    <div onClick={_onClick}>
                        <CurrentWallet />
                    </div>
                ) : (
                    <Link
                        data-testid="current-wallet-link"
                        to={
                            isWalletPickerOpen
                                ? closeWalletPickerUrl
                                : walletPickerUrl
                        }
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
