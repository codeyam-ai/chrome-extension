import {
    ClockIcon,
    HomeIcon,
    SparklesIcon,
    TicketIcon,
} from '@heroicons/react/24/solid';
import { useCallback, useMemo, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ExploreButton from './ExploreButton';
import { growthbook } from '_src/ui/app/experimentation/feature-gating';
import { FEATURES } from '_src/ui/app/experimentation/features';

const iconClasses = 'w-6 h-6';
const navItems: NavItem[] = [
    {
        title: 'Tokens',
        to: './tokens',
        icon: <HomeIcon className={iconClasses} />,
    },
    {
        title: 'NFTs',
        to: './nfts',
        icon: <SparklesIcon className={iconClasses} />,
    },
    {
        title: 'History',
        to: './transactions',
        icon: <ClockIcon className={iconClasses} />,
    },
];

if (growthbook.isOn(FEATURES.USE_TICKETS)) {
    navItems.splice(2, 0, {
        title: 'Tickets',
        to: './tickets',
        icon: <TicketIcon className={iconClasses} />,
    });
}

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
            return location.pathname.includes(to.replace(/[^\w\s]/gi, ''));
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
    return (
        <nav className="px-6 flex flex-row justify-between h-16 sm:rounded-b-2xl items-center border-t border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            {navItems.map((item, key) => {
                return (
                    <NavItemElement
                        title={item.title}
                        to={item.to}
                        icon={item.icon}
                        key={key}
                    />
                );
            })}
            <ExploreButton />
        </nav>
    );
};

export default TabBar;
