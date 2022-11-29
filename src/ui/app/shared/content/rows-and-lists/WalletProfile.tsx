import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import BodyLarge from '../../typography/BodyLarge';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import AccountAddress, {
    AddressMode,
} from '_src/ui/app/components/account-address';
import {
    useNextWalletPickerUrl,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/settings-menu/hooks';
import { useAppSelector } from '_src/ui/app/hooks';

// This component contains the wallet icon, name, and address
const WalletProfile = ({ onClick }: { onClick?: () => void }) => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const walletPickerUrl = useNextWalletPickerUrl(true, '/');
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);

    const WalletPicker = () => (
        <div className="flex flex-row gap-2 items-center">
            <div
                className="h-6 w-6 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: accountInfo?.color || '#7E23CA',
                }}
            />
            <BodyLarge isSemibold>{accountInfo?.name || 'Wallet'}</BodyLarge>

            <ChevronDownIcon className="h-4 w-4 text-ethos-light-text-medium dark:text-ethos-dark-text-medium cursor-pointer" />
        </div>
    );

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 items-center py-1">
                {/* {onClick ? (
                    <div onClick={onClick} className="cursor-pointer">
                        <WalletPicker />
                    </div>
                ) : (
                    <Link to={walletPickerUrl}>
                        <WalletPicker />
                    </Link>
                )} */}
                <Link
                    to={
                        isWalletPickerOpen
                            ? closeWalletPickerUrl
                            : walletPickerUrl
                    }
                    onClick={onClick}
                >
                    <WalletPicker />
                </Link>
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
