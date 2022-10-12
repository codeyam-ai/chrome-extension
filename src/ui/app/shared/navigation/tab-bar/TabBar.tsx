import {
    ClockIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { DASHBOARD_LINK } from '_src/shared/constants';
import ExternalLink from '_src/ui/app/components/external-link';
import { useExplorerPermission } from '_src/ui/app/hooks';

const iconClasses = 'w-6 h-6';
const navItems = [
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

const TabBar = () => {
    const setExplorerPermission = useExplorerPermission();

    const getLinkClasses = useCallback((isActive: boolean) => {
        return isActive
            ? 'text-ethos-light-primary-light dark:text-ethos-dark-primary-dark'
            : 'text-ethos-light-text-medium dark:text-ethos-dark-text-medium';
    }, []);

    return (
        <nav className="flex flex-row h-16 w-full items-center absolute inset-x-0 bottom-0 border-t border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
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
                                    <NavLink
                                        to={item.to}
                                        title={item.title}
                                        className={({ isActive }) =>
                                            getLinkClasses(isActive)
                                        }
                                    >
                                        <span className="sr-only">
                                            {item.title}
                                        </span>
                                        {item.icon}
                                    </NavLink>
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
