// import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
// import {
//     ChevronLeftIcon,
//     StarIcon as StarIconSolid,
// } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { ReactNode } from 'react';

interface DappWrapperProps {
    children: ReactNode;
    dappTitle: string;
    isFavorite: boolean;
    closeDapp?: () => void;
}

export const DappWrapper: React.FC<DappWrapperProps> = ({
    children,
    dappTitle,
    closeDapp,
    isFavorite,
}) => {
    const navigate = useNavigate();

    const onClose = useCallback(() => {
        navigate('/tokens');
    }, [navigate]);

    return (
        <div className="h-full flex flex-col">
            <DappViewHeader
                title={dappTitle}
                closeDapp={closeDapp ?? onClose}
                isFavorite={isFavorite}
            />
            <div>{children}</div>
        </div>
    );
};
interface DappViewHeaderProps {
    title: string;
    isFavorite: boolean;
    closeDapp: () => void;
}

export const DappViewHeader: React.FC<DappViewHeaderProps> = ({
    title,
    isFavorite,
    closeDapp,
}) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-ethos-pale-purple border-ethos-dark-text-stroke">
            <button onClick={closeDapp}>
                <ChevronLeftIcon
                    className={`h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium`}
                />
            </button>
            <BodyLarge isSemibold className="truncate">
                {title}
            </BodyLarge>
            {/* Favorites currently not implemented */}
            <div></div>
            {/* {isFavorite ? (
                <StarIconSolid className="h-5 w-5 text-ethos-dark-primary-light dark:text-ethos-dark-primary-dark" />
            ) : (
                <StarIconOutline className="h-5 w-5 text-ethos-dark-primary-light dark:text-ethos-dark-primary-dark" />
            )} */}
        </div>
    );
};
