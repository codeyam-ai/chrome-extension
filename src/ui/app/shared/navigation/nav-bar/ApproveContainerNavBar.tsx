import { XMarkIcon } from '@heroicons/react/24/solid';
import { useCallback, useState, useEffect } from 'react';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import WalletPicker from '_src/ui/app/components/wallet-picker/WalletPicker';
import { useAppSelector } from '_src/ui/app/hooks';

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
        <div className="relative flex flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            <div className="flex flex-row gap-4 items-center">
                <button onClick={reject}>
                    <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </button>
            </div>
            <WalletProfile
                inlineWalletPicker={true}
                onClick={toggleWalletPicker}
            />
            {showWalletPicker && (
                <div className="absolute w-full left-0 top-12 z-50 bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                    <WalletPicker selectOnly={true} />
                </div>
            )}
        </div>
    );
};

export default ApproveContainerNavBar;
