import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import {
    ChevronLeftIcon,
    StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { ReactNode } from 'react';

interface DappWrapperProps {
    children: ReactNode;
    dappTitle: string;
    isFavorite?: boolean;
    closeDapp?: () => void;
    hideFavorite?: boolean;
}

export const DappWrapper: React.FC<DappWrapperProps> = ({
    children,
    dappTitle,
    closeDapp,
    isFavorite,
    hideFavorite,
}) => {
    const navigate = useNavigate();

    const onClose = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="h-full flex flex-col">
            <DappViewHeader
                title={dappTitle}
                closeDapp={closeDapp ?? onClose}
                isFavorite={isFavorite}
                hideFavorite={hideFavorite}
            />
            {children}
        </div>
    );
};
interface DappViewHeaderProps {
    title: string;
    isFavorite?: boolean;
    closeDapp: () => void;
    hideFavorite?: boolean;
}

export const DappViewHeader: React.FC<DappViewHeaderProps> = ({
    title,
    isFavorite,
    closeDapp,
    hideFavorite,
}) => {
    return (
        <div className="flex items-center justify-between h-[50px] px-4 shadow-ethos-shadow-small border-b border-ethos-light-gray border-ethos-dark-text-stroke bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
            <div className="w-1/4 text-left">
                <button onClick={closeDapp}>
                    <ChevronLeftIcon
                        className={`h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium`}
                    />
                </button>
            </div>
            <BodyLarge
                isSemibold
                className="truncate w-1/2 text-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
            >
                {title}
            </BodyLarge>
            <div className="w-1/4"></div>
            {hideFavorite && <div></div>}
            {!hideFavorite &&
                (isFavorite ? (
                    <StarIconSolid className="h-5 w-5 text-ethos-dark-primary-light dark:text-ethos-dark-primary-dark" />
                ) : (
                    <StarIconOutline className="h-5 w-5 text-ethos-dark-primary-light dark:text-ethos-dark-primary-dark" />
                ))}
        </div>
    );
};
