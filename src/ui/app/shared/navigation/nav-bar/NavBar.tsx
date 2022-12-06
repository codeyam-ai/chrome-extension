import {
    ArrowLeftIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import {
    useSettingsIsOpen,
    useNextSettingsUrl,
    useWalletPickerIsOpen,
    useSettingsIsOpenOnSubPage,
    useNextWalletPickerUrl,
} from '_src/ui/app/components/settings-menu/hooks';
import Header from '../../typography/Header';
import { useCallback, useState } from 'react';
import NavBarWithBackAndWalletPicker from './NavBarWithBackAndWalletPicker';
import BodyLarge from '../../typography/BodyLarge';
import NavBarWithCloseAndActionAndWalletPicker from './NavBarWithCloseAndActionAndWalletPicker';
import EthosLink from '../../typography/EthosLink';
import { useOnKeyboardEvent } from '_src/ui/app/hooks';

const CLOSE_KEY_CODES: string[] = ['Escape'];

const WalletPickerNavBar = () => {
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);

    const navigate = useNavigate();
    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);
    const handleOnCloseMenu = useCallback(
        (e: KeyboardEvent | MouseEvent<HTMLDivElement>) => {
            if (isWalletPickerOpen) {
                e.preventDefault();
                setIsWalletEditing(false);
                navigate(-1);
            }
        },
        [isWalletPickerOpen, navigate, closeWalletPickerUrl]
    );
    useOnKeyboardEvent(
        'keydown',
        CLOSE_KEY_CODES,
        handleOnCloseMenu,
        isWalletPickerOpen
    );

    const [isWalletEditing, setIsWalletEditing] = useState(false);

    const toggleIsWalletEditing = useCallback(() => {
        setIsWalletEditing(!isWalletEditing);
    }, [isWalletEditing]);

    const onCloseWalletPicker = useCallback(() => {
        setIsWalletEditing(false);
    }, []);

    return (
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            <div className="flex flex-row gap-4 items-center">
                <button onClick={goBack}>
                    <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </button>
                <BodyLarge isSemibold>
                    <EthosLink type="internal" onClick={toggleIsWalletEditing}>
                        {isWalletEditing ? 'Done' : 'Edit'}
                    </EthosLink>
                </BodyLarge>
            </div>
            <WalletProfile onClick={onCloseWalletPicker} />
        </div>
    );
};

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
    console.log('isWalletPickerOpen :>> ', isWalletPickerOpen);
    if (isWalletPickerOpen) {
        return <WalletPickerNavBar />;
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
