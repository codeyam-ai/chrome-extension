import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import { useWalletPickerIsOpen } from '_src/ui/app/components/settings-menu/hooks';

const NavBarWithSettingsAndWalletPicker = () => {
    const { pathname } = useLocation();
    const isMenuOpen = pathname.includes('settings');
    const isWalletPickerOpen = useWalletPickerIsOpen();

    return (
        <div
            className={`${
                isMenuOpen || isWalletPickerOpen ? 'hidden' : 'flex'
            } flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke`}
        >
            <Link to={'/settings/main'}>
                <Cog6ToothIcon className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            </Link>
            <WalletProfile />
        </div>
    );
};

export default NavBarWithSettingsAndWalletPicker;
