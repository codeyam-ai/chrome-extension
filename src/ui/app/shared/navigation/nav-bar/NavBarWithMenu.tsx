import { DASHBOARD_LINK } from '_src/shared/constants';
import Logo from '_src/ui/app/components/logo';
import { MenuButton } from '_src/ui/app/components/menu';
import { useExplorerPermission } from '_src/ui/app/hooks';

const NavBarWithMenu = () => {
    const setExplorerPermission = useExplorerPermission();

    return (
        <div className="flex flex-row items-center justify-between border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke px-6 h-12">
            <MenuButton />
            <a
                href={DASHBOARD_LINK}
                target="_blank"
                rel="noreferrer"
                onMouseDown={setExplorerPermission}
            >
                <Logo txt={true} />
            </a>
        </div>
    );
};

export default NavBarWithMenu;
