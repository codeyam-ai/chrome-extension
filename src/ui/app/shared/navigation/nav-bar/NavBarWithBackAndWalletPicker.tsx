import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import BodyLarge from '../../typography/BodyLarge';

interface NavBarWithBackAndWalletPickerProps {
    backUrl: string;
    onClickBack?: () => void;
}

const NavBarWithBackAndWalletPicker = ({
    backUrl,
    onClickBack,
}: NavBarWithBackAndWalletPickerProps) => {
    return (
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            <div className="flex flex-row gap-4 items-center">
                <Link
                    to={backUrl}
                    onClick={onClickBack}
                    className="inline-flex flex-row gap-2 items-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <BodyLarge>Back</BodyLarge>
                </Link>
            </div>
            <WalletProfile />
        </div>
    );
};

export default NavBarWithBackAndWalletPicker;
