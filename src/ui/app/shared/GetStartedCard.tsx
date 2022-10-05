import { type ReactNode } from 'react';

import DarkModeToggle from '../components/darkModeToggle';
import logo from '../components/logo/ethos-logo.png';
import LargePageHeaderWIthIcon from './headers/page-headers/LargePageHeaderWithIcon';

type GetStartedCardProps = {
    children: ReactNode;
};

const GetStartedCard = ({ children }: GetStartedCardProps) => {
    return (
        <>
            <div className="w-full mb-2">
                <span className="float-right">
                    <DarkModeToggle />
                </span>
            </div>
            <div className="mx-auto w-96 pt-4 shadow-ethos-box-shadow rounded-lg text-center bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                <LargePageHeaderWIthIcon
                    iconSrc={logo}
                    iconAlt="Ethos Wallet logo"
                    header="Ethos"
                    description="The new web awaits"
                />
                {children}
            </div>
        </>
    );
};

export default GetStartedCard;
