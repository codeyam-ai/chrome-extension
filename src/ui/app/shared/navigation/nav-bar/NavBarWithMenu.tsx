import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import {
    useMenuIsOpen,
    useNextMenuUrl,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/menu/hooks';

const NavBarWithMenu = () => {
    const menuUrl = useNextMenuUrl(true);
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
            <WalletProfile />
        </div>
    );
};

export default NavBarWithMenu;
