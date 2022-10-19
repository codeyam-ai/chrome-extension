import { type ReactNode } from 'react';

import logo from '../../components/logo/ethos-logo.png';
import LargePageHeaderWIthIcon from '../headers/page-headers/LargePageHeaderWithIcon';
import NavBarWithBackAndTitleAndThemeToggle from '../navigation/nav-bar/NavBarWithBackAndTitle';
import BaseLayout from './BaseLayout';

type GetStartedCardProps = {
    showBack?: boolean;
    children: ReactNode;
};

const GetStartedCard = ({ showBack, children }: GetStartedCardProps) => {
    return (
        <>
            <BaseLayout>
                {showBack && (
                    <NavBarWithBackAndTitleAndThemeToggle
                        backLink="/"
                        title="Back"
                    />
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
