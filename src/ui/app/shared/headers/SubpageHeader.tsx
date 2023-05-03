import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '../typography/BodyLarge';

interface SubpageHeaderProps {
    title: string;
}

const SubpageHeader: React.FC<SubpageHeaderProps> = ({ title }) => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="flex items-center justify-between px-4 h-[50px] shadow-ethos-shadow-small bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
            <div className="w-1/4 text-left flex items-center">
                <button onClick={goBack}>
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
        </div>
    );
};

export default SubpageHeader;
