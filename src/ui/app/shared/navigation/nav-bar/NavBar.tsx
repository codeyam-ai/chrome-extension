import {
    ArrowLeftIcon,
    Cog6ToothIcon,
    XMarkIcon
} from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import BodyLarge from '../../typography/BodyLarge';
import EthosLink from '../../typography/EthosLink';
import Header from '../../typography/Header';
import {
    useNextSettingsUrl,
    useNextWalletPickerUrl,
    useSettingsIsOpen,
    useSettingsIsOpenOnSubPage,
    useWalletEditorIsOpen,
    useWalletPickerIsOpen
} from '_src/ui/app/components/settings-menu/hooks';
import WalletPickerPage from '_src/ui/app/components/wallet-picker-menu/WalletPickerPage';
import { useOnKeyboardEvent } from '_src/ui/app/hooks';

import type { MouseEvent } from 'react';

const CLOSE_KEY_CODES: string[] = ['Escape'];

const WalletPickerNavBar = () => {
    const [isWalletEditing, setIsWalletEditing] = useState(false);
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);
    const isEditorOpen = useWalletEditorIsOpen();

    const navigate = useNavigate();
    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const closeWalletPicker = useCallback(() => {
        navigate(closeWalletPickerUrl);
    }, [navigate, closeWalletPickerUrl]);

    const handleOnCloseMenu = useCallback(
        (e: KeyboardEvent | MouseEvent<HTMLDivElement>) => {
            if (isWalletPickerOpen) {
                e.preventDefault();
                setIsWalletEditing(false);
                closeWalletPicker();
            }
        },
        [isWalletPickerOpen, closeWalletPicker]
    );
    useOnKeyboardEvent(
        'keydown',
        CLOSE_KEY_CODES,
        handleOnCloseMenu,
        isWalletPickerOpen
    );

    const toggleIsWalletEditing = useCallback(() => {
        setIsWalletEditing(!isWalletEditing);
    }, [isWalletEditing]);

    const onCloseWalletPicker = useCallback(() => {
        setIsWalletEditing(false);
    }, []);

    return (
        <>
            {isEditorOpen ? (
                <div className="flex justify-between py-6 px-6 items-center">
                    <button
                        onClick={goBack}
                        className="flex gap-2 items-center"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                        <BodyLarge isTextColorMedium>Back</BodyLarge>
                    </button>
                </div>
            ) : (
                <div className="relative flex flex-row items-center justify-between px-6 py-4 rounded-t-[20px] border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                    <div className="flex flex-row gap-4 items-center">
                        <button onClick={goBack}>
                            <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                        </button>
                        <BodyLarge isSemibold>
                            <EthosLink
                                type="internal"
                                onClick={toggleIsWalletEditing}
                            >
                                {isWalletEditing ? 'Done' : 'Edit'}
                            </EthosLink>
                        </BodyLarge>
                    </div>
                    <WalletProfile onClick={onCloseWalletPicker} />
                </div>
            )}
            <WalletPickerPage
                isWalletEditing={isWalletEditing}
                setIsWalletEditing={setIsWalletEditing}
            />
        </>
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
