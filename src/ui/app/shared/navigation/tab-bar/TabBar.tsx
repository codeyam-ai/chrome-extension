import {
    WalletIcon as WalletIconOutline,
    ClockIcon as ClockIconOutline,
    HomeIcon as HomeIconOutline,
    Squares2X2Icon as Squares2X2IconOutline,
    TicketIcon as TicketIconOutline,
} from '@heroicons/react/24/outline';
import {
    WalletIcon as WalletIconSolid,
    ClockIcon as ClockIconSolid,
    HomeIcon as HomeIconSolid,
    Squares2X2Icon as Squares2X2IconSolid,
    TicketIcon as TicketIconSolid,
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useEffect, useMemo, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ExploreButton from './ExploreButton';
import featureGating from '_src/background/FeatureGating';
import { FEATURES } from '_src/shared/experimentation/features';
import { useAppSelector } from '_src/ui/app/hooks';
import { api } from '_src/ui/app/redux/store/thunk-extras';

const iconClasses = 'w-6 h-6';
const navItems: NavItem[] = [
    {
        title: 'Home',
        to: './home',
        outlineIcon: <HomeIconOutline className={iconClasses} />,
        solidIcon: <HomeIconSolid className={iconClasses} />,
    },
    {
        title: 'NFTs',
        to: './nfts',
        outlineIcon: <Squares2X2IconOutline className={iconClasses} />,
        solidIcon: <Squares2X2IconSolid className={iconClasses} />,
    },
    {
        title: 'Tokens',
        to: './tokens',
        outlineIcon: <WalletIconOutline className={iconClasses} />,
        solidIcon: <WalletIconSolid className={iconClasses} />,
    },
    {
        title: 'History',
        to: './transactions',
        outlineIcon: <ClockIconOutline className={iconClasses} />,
        solidIcon: <ClockIconSolid className={iconClasses} />,
    },
];

type NavItem = {
    to: string;
    title: string;
    outlineIcon: ReactNode;
    solidIcon: ReactNode;
};

const NavItemElement = ({ to, title, outlineIcon, solidIcon }: NavItem) => {
    const location = useLocation();
    const isActive = useMemo(() => {
        // to starts with "./", location.pathname starts with just a "/"
        return location.pathname.includes(to.replace(/[^\w\s]/gi, ''));
    }, [location, to]);

    return (
        <div
            className={classNames(
                'h-full w-8 flex items-center place-content-center',
                isActive
                    ? 'border-b-2 border-ethos-light-primary-light dark:border-ethos-dark-primary-dark'
                    : ''
            )}
        >
            <NavLink
                to={to}
                title={title}
                className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
            >
                <span className="sr-only">{title}</span>
                {isActive ? solidIcon : outlineIcon}
            </NavLink>
        </div>
    );
};

const TabBar = () => {
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

    useEffect(() => {
        const checkTickets = async () => {
            const growthBook = await featureGating.getGrowthBook();

            if (!growthBook.isOn(FEATURES.USE_TICKETS)) return;

            const ticketIndex = navItems.findIndex(
                (navItem) => navItem.title === 'Tickets'
            );
            if (ticketIndex === -1) {
                try {
                    const ticketProjectIds: string[] =
                        await growthBook.getFeatureValue('ticket-projects', []);

                    const ticketProjectObjects =
                        await api.instance.fullNode.multiGetObjects({
                            ids: ticketProjectIds,
                            options: {
                                showContent: true,
                                showType: true,
                                showDisplay: true,
                                showOwner: true,
                            },
                        });

                    const ticketIndex2 = navItems.findIndex(
                        (navItem) => navItem.title === 'Tickets'
                    );

                    if (
                        ticketIndex2 === -1 &&
                        ticketProjectObjects.length > 0
                    ) {
                        navItems.splice(2, 0, {
                            title: 'Tickets',
                            to: './tickets',
                            outlineIcon: (
                                <TicketIconOutline className={iconClasses} />
                            ),
                            solidIcon: (
                                <TicketIconSolid className={iconClasses} />
                            ),
                        });
                    } else if (
                        ticketIndex > -1 &&
                        ticketProjectObjects.length === 0
                    ) {
                        navItems.splice(ticketIndex, 1);
                    }
                } catch (e) {
                    if (ticketIndex > -1) {
                        navItems.splice(ticketIndex, 1);
                    }
                }
            }
        };

        checkTickets();
    }, [selectedApiEnv]);

    return (
        <nav className="px-6 flex flex-row justify-between h-[56px] sm:rounded-b-2xl items-center shadow-ethos-shadow-tab-bar-up dark:shadow-none dark:border-t dark:border-ethos-dark-text-stroke bg-ethos-super-light-purple dark:bg-ethos-dark-background-secondary">
            {navItems.map((item, key) => {
                return (
                    <NavItemElement
                        title={item.title}
                        to={item.to}
                        outlineIcon={item.outlineIcon}
                        solidIcon={item.solidIcon}
                        key={key}
                    />
                );
            })}
            <ExploreButton />
        </nav>
    );
};

export default TabBar;
