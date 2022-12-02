import { XMarkIcon } from '@heroicons/react/24/solid';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';

interface ApproveContainerNavBarProps {
    reject: () => void;
}

const ApproveContainerNavBar = ({ reject }: ApproveContainerNavBarProps) => {
    return (
        <div className="flex flex-row items-center justify-between p-6 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            <div className="flex flex-row gap-4 items-center">
                <button onClick={reject}>
                    <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </button>
            </div>
            <WalletProfile hideWalletPicker />
        </div>
    );
};

export default ApproveContainerNavBar;
