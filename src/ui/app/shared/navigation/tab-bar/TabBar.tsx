import {
    ClockIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/solid';
import { type ReactNode, useCallback, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { DASHBOARD_LINK } from '_src/shared/constants';
import ExternalLink from '_src/ui/app/components/external-link';
import { useExplorerPermission } from '_src/ui/app/hooks';

const iconClasses = 'w-6 h-6';
const navItems: NavItem[] = [
    {
        title: 'Tokens',
        to: './tokens',
        icon: <CurrencyDollarIcon className={iconClasses} />,
    },
    {
        title: 'NFTs',
        to: './nfts',
        icon: <Squares2X2Icon className={iconClasses} />,
    },
    {
        title: 'Explore',
        to: DASHBOARD_LINK,
        icon: <GlobeAltIcon className={iconClasses} />,
    },
    {
        title: 'History',
        to: './transactions',
        icon: <ClockIcon className={iconClasses} />,
    },
];

type NavItem = {
    to: string;
    title: string;
    icon: ReactNode;
};

const NavItemElement = ({ to, title, icon }: NavItem) => {
    const location = useLocation();
    const isActive = useCallback(
        (to: string) => {
            // to starts with "./", location.pathname starts with just a "/"
            return to === '.' + location.pathname;
        },
        [location]
    );

    const navLinkClass = useMemo(() => {
        return isActive(to)
            ? 'text-ethos-light-primary-light dark:text-ethos-dark-primary-dark'
            : 'text-ethos-light-text-medium dark:text-ethos-dark-text-medium';
    }, [isActive, to]);

    return (
        <NavLink to={to} title={title} className={navLinkClass}>
            <span className="sr-only">{title}</span>
            {icon}
        </NavLink>
    );
};

const TabBar = () => {
    const setExplorerPermission = useExplorerPermission();

    return (
        <nav className="flex flex-row h-16 w-full items-center absolute inset-x-0 bottom-0 border-t bg-ethos-light-background-default border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            <>
                {navItems.map((item, key) => {
                    //
                    return (
                        <div
                            className="w-full flex flex-row items-center"
                            key={key}
                            onMouseOver={
                                item.to.startsWith('http')
                                    ? setExplorerPermission
                                    : undefined
                            }
                        >
                            <span className="mx-auto">
                                {item.to.startsWith('http') ? (
                                    <ExternalLink
                                        href={item.to}
                                        title={item.title}
                                        showIcon={false}
                                        className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                                    >
                                        {item.icon}
                                    </ExternalLink>
                                ) : (
                                    <NavItemElement
                                        title={item.title}
                                        to={item.to}
                                        icon={item.icon}
                                    />
                                )}
                            </span>
                        </div>
                    );
                })}
            </>
        </nav>
    );
};

export default TabBar;
