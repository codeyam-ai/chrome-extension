import {
    ArrowLeftIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import BodyLarge from '../../typography/BodyLarge';
import EthosLink from '../../typography/EthosLink';
import Header from '../../typography/Header';
import { SubpageUrls } from '_src/ui/app/components/settings-menu/SettingsHomePage';
import SettingsRouterPage from '_src/ui/app/components/settings-menu/SettingsRouterPage';
import {
    useWalletEditorIsOpen,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/settings-menu/hooks';
import WalletPickerPage from '_src/ui/app/components/wallet-picker-menu/WalletPickerPage';
import { useOnKeyboardEvent } from '_src/ui/app/hooks';

const CLOSE_KEY_CODES: string[] = ['Escape'];

interface WalletPickerNavBarProps {
    goBack: () => void;
    isWalletEditing: boolean;
    setIsWalletEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletPickerNavBar = ({
    goBack,
    isWalletEditing,
    setIsWalletEditing,
}: WalletPickerNavBarProps) => {
    const isEditorOpen = useWalletEditorIsOpen();

    const toggleIsWalletEditing = useCallback(() => {
        setIsWalletEditing(!isWalletEditing);
    }, [isWalletEditing, setIsWalletEditing]);

    const onCloseWalletPicker = useCallback(() => {
        setIsWalletEditing(false);
        goBack();
    }, [setIsWalletEditing, goBack]);

    return (
        <>
            {isEditorOpen ? (
                <div className="flex justify-between py-5 px-6 items-center border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
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
                        <button onClick={onCloseWalletPicker}>
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

interface SettingsNavBarProps extends WalletPickerNavBarProps {
    isWalletPickerOpen: boolean;
}

const SettingsNavBar = ({
    goBack,
    isWalletEditing,
    setIsWalletEditing,
    isWalletPickerOpen,
}: SettingsNavBarProps) => {
    const { pathname } = useLocation();
    const settingsIsOpenOnSubPage =
        Object.values(SubpageUrls).includes(pathname);

    return (
        <>
            {isWalletPickerOpen ? (
                <WalletPickerNavBar
                    goBack={goBack}
                    isWalletEditing={isWalletEditing}
                    setIsWalletEditing={setIsWalletEditing}
                />
            ) : (
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
            )}
            <SettingsRouterPage />
            {isWalletPickerOpen && (
                <WalletPickerPage
                    isWalletEditing={isWalletEditing}
                    setIsWalletEditing={setIsWalletEditing}
                />
            )}
        </>
    );
};

const NavBar = () => {
    const [isWalletEditing, setIsWalletEditing] = useState(false);
    const { pathname } = useLocation();
    const isSettingsOpen = pathname.includes('settings');
    const isSettingsOpenOnSubpage =
        Object.values(SubpageUrls).includes(pathname);
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const params = [];

    for (const param of searchParams.entries()) {
        params.push(param);
    }

    const isDetailsPage = params.length > 0;

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleOnCloseMenu = useCallback(
        (e: KeyboardEvent) => {
            if (
                isWalletPickerOpen ||
                isSettingsOpen ||
                isSettingsOpenOnSubpage
            ) {
                e.preventDefault();
                isWalletPickerOpen && setIsWalletEditing(false);
                goBack();
            }
        },
        [
            isWalletPickerOpen,
            isSettingsOpen,
            isSettingsOpenOnSubpage,
            setIsWalletEditing,
            goBack,
        ]
    );
    useOnKeyboardEvent(
        'keydown',
        CLOSE_KEY_CODES,
        handleOnCloseMenu,
        isWalletPickerOpen || isSettingsOpen || isSettingsOpenOnSubpage
    );

    if (isSettingsOpen) {
        return (
            <SettingsNavBar
                goBack={goBack}
                isWalletEditing={isWalletEditing}
                setIsWalletEditing={setIsWalletEditing}
                isWalletPickerOpen={isWalletPickerOpen}
            />
        );
    }

    if (isWalletPickerOpen) {
        return (
            <WalletPickerNavBar
                goBack={goBack}
                isWalletEditing={isWalletEditing}
                setIsWalletEditing={setIsWalletEditing}
            />
        );
    }

    return (
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            {isDetailsPage ? (
                <button
                    onClick={goBack}
                    className={'flex flex-row gap-3 items-center'}
                >
                    <ArrowLeftIcon className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />{' '}
                    <BodyLarge isTextColorMedium>Back</BodyLarge>
                </button>
            ) : (
                <Link to={'/settings/main'}>
                    <Cog6ToothIcon data-testid="settings-toggle" className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </Link>
            )}
            <WalletProfile />
        </div>
    );
};

export default NavBar;
