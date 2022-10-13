import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { DASHBOARD_LINK } from '_src/shared/constants';
import DarkModeToggle from '_src/ui/app/components/darkModeToggle';
import Logo from '_src/ui/app/components/logo';
import { MenuButton } from '_src/ui/app/components/menu';
import {
    useMenuIsOpen,
    useNextMenuUrl,
} from '_src/ui/app/components/menu/hooks';
import { useExplorerPermission } from '_src/ui/app/hooks';

const NavBarWithMenu = () => {
    const setExplorerPermission = useExplorerPermission();
    const settingsUrl = useNextMenuUrl(true, '/settings');
    const isMenuOpen = useMenuIsOpen();

    return (
        <div
            className={`${
                !isMenuOpen
                    ? 'border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke'
                    : ''
            } flex flex-row items-center justify-between px-6 h-12`}
        >
            <MenuButton />
            {!isMenuOpen ? (
                <a
                    href={DASHBOARD_LINK}
                    target="_blank"
                    rel="noreferrer"
                    onMouseDown={setExplorerPermission}
                >
                    <Logo txt={true} />
                </a>
            ) : !window.location.href.includes('settings') ? (
                <Link to={settingsUrl}>
                    <Cog6ToothIcon className="w-6 h-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </Link>
            ) : (
                <DarkModeToggle />
            )}
        </div>
    );
};

export default NavBarWithMenu;
