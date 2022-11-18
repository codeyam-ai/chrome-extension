import { ChevronDownIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import {
    useMenuIsOpen,
    useNextMenuUrl,
    useNextWalletPickerUrl,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/menu/hooks';
import WalletProfile from '../../content/rows-and-lists/WalletProfile';

const NavBarWithMenu = () => {
    const menuUrl = useNextMenuUrl(true);
    const walletPickerUrl = useNextWalletPickerUrl(true, '/');
    const isMenuOpen = useMenuIsOpen();
    const isWalletPickerOpen = useWalletPickerIsOpen();

    return (
        <div
            className={`${
                isMenuOpen || isWalletPickerOpen ? 'hidden' : 'flex'
            } flex-row items-center justify-between p-6 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke`}
        >
            <Link to={menuUrl}>
                <Cog6ToothIcon className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            </Link>
            <div className="flex flex-row gap-2 items-center">
                <WalletProfile />
                <Link to={walletPickerUrl}>
                    <ChevronDownIcon className="h-4 w-4 text-ethos-light-text-medium dark:text-ethos-dark-text-medium cursor-pointer" />
                </Link>
            </div>
        </div>
    );
};

export default NavBarWithMenu;
