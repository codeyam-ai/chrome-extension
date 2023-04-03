import { XMarkIcon } from '@heroicons/react/24/solid';
import { useCallback, useState, useEffect } from 'react';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import WalletPicker from '_src/ui/app/components/wallet-picker/WalletPicker';
import { useAppSelector } from '_src/ui/app/hooks';
import EthosLogo from '_src/ui/app/shared/svg/EthosLogo';

interface ApproveContainerNavBarProps {
    reject: () => void;
}

const ApproveContainerNavBar = ({ reject }: ApproveContainerNavBarProps) => {
    const [showWalletPicker, setShowWalletPicker] = useState(false);
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

    const toggleWalletPicker = useCallback(() => {
        setShowWalletPicker((prev) => !prev);
    }, []);

    useEffect(() => {
        setShowWalletPicker(false);
    }, [activeAccountIndex]);

    return (
        <div className="relative flex flex-row items-center justify-between px-6 py-3 bg-ethos-light-purple dark:bg-ethos-dark-background-secondary">
            <EthosLogo />
            <WalletProfile
                inlineWalletPicker={true}
                onClick={toggleWalletPicker}
            />
            {showWalletPicker && (
                <div className="absolute w-full left-0 top-12 z-50 bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                    <WalletPicker selectOnly={true} />
                </div>
            )}
            <div className="flex flex-row gap-4 items-center">
                <button onClick={reject}>
                    <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </button>
            </div>
        </div>
    );
};

export default ApproveContainerNavBar;
