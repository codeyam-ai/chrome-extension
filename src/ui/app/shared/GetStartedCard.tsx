import { type ReactNode } from 'react';

import DarkModeToggle from '../components/darkModeToggle';
import LargeColoredLogo from './LargeColoredLogo';

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
            <div className="mx-auto w-96 pt-6 pb-8 px-10 shadow-xl rounded-lg text-center bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                <LargeColoredLogo />
                {children}
            </div>
        </>
    );
};

export default GetStartedCard;
