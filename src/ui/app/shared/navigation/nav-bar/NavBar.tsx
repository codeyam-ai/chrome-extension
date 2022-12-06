import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import {
    useSettingsIsOpen,
    useNextSettingsUrl,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/settings-menu/hooks';
import Header from '../../typography/Header';
import { useCallback } from 'react';

const SettingsNavBar = () => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="flex justify-between px-6 py-4 text-left border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            <Header>Settings</Header>
            <button onClick={goBack}>
                <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            </button>
        </div>
    );
};

const NavBar = () => {
    const settingsUrl = useNextSettingsUrl(true);
    const isMenuOpen = useSettingsIsOpen();
    const isWalletPickerOpen = useWalletPickerIsOpen();

    if (isMenuOpen) {
        return <SettingsNavBar />;
    }

    return (
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            <Link to={settingsUrl}>
                <Cog6ToothIcon className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            </Link>
            <WalletProfile />
        </div>
    );
};

export default NavBar;
