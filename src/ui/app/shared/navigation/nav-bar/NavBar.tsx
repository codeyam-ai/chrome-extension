import {
    ArrowLeftIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import {
    useSettingsIsOpen,
    useNextSettingsUrl,
    useWalletPickerIsOpen,
    useSettingsIsOpenOnSubPage,
} from '_src/ui/app/components/settings-menu/hooks';
import Header from '../../typography/Header';
import { useCallback } from 'react';
import NavBarWithBackAndWalletPicker from './NavBarWithBackAndWalletPicker';
import BodyLarge from '../../typography/BodyLarge';

const SettingsNavBar = () => {
    const navigate = useNavigate();
    const settingsIsOpenOnSubPage = useSettingsIsOpenOnSubPage();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
            {!settingsIsOpenOnSubPage ? (
                <div className="flex justify-between px-6 py-4 text-left border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                    <Header>Settings</Header>
                    <button onClick={goBack}>
                        <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    </button>
                </div>
            ) : (
                <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
                    <div className="flex flex-row gap-4 items-center">
                        <button
                            onClick={goBack}
                            className="inline-flex flex-row gap-2 items-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                            <BodyLarge>Back</BodyLarge>
                        </button>
                    </div>
                    <WalletProfile />
                </div>
            )}
        </>
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
