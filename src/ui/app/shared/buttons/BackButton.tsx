import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '../typography/BodyLarge';

interface BackButtonProps {
    forceLightMode?: boolean;
}

const BackButton = ({ forceLightMode }: BackButtonProps) => {
    const navigate = useNavigate();
    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <button
            id="back"
            onClick={goBack}
            className="flex gap-2 self-start items-center"
        >
            <ArrowLeftIcon
                className={`h-5 w-5 text-ethos-light-text-medium ${
                    forceLightMode ? '' : 'dark:text-ethos-dark-text-medium'
                }`}
            />
            <BodyLarge
                isTextColorMedium
                className={
                    forceLightMode ? '!text-ethos-light-text-medium' : ''
                }
            >
                Back
            </BodyLarge>
        </button>
    );
};

export default BackButton;
