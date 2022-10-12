import { type ReactNode } from 'react';

import DarkModeToggle from '../../components/darkModeToggle';
import logo from '../../components/logo/ethos-logo.png';
import BaseLayout from './BaseLayout';
import LargePageHeaderWIthIcon from '../headers/page-headers/LargePageHeaderWithIcon';
import NavBarWithBackAndTitle from '../navigation/nav-bar/NavBarWithBackAndTitle';

type GetStartedCardProps = {
    showBack?: boolean;
    children: ReactNode;
};

const GetStartedCard = ({ showBack, children }: GetStartedCardProps) => {
    return (
        <>
            <div className="w-full mb-2">
                <span className="float-right">
                    <DarkModeToggle />
                </span>
            </div>
            <BaseLayout>
                {showBack && (
                    <NavBarWithBackAndTitle backLink="/" title="Back" />
                )}
                <LargePageHeaderWIthIcon
                    iconSrc={logo}
                    iconAlt="Ethos Wallet logo"
                    header="Ethos"
                    description="The new web awaits"
                />
                {children}
            </BaseLayout>
        </>
    );
};

export default GetStartedCard;
