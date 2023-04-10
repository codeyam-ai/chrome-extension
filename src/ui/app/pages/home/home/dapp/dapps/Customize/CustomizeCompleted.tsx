import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

const CustomizeCompleted: React.FC = () => {
    const navigate = useNavigate();

    const handleOnContinue = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="flex flex-col gap-6 mt-6 mx-6 items-center place-content-center">
            <CheckCircleIcon className="w-10 h-10 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            <Title>Customization complete!</Title>
            <div className="flex gap-2 w-full mt-4">
                <button
                    onClick={goBack}
                    className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light/20"
                >
                    <BodyLarge
                        isSemibold
                        className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                    >
                        Back
                    </BodyLarge>
                </button>
                <button
                    onClick={handleOnContinue}
                    className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light"
                >
                    <BodyLarge isSemibold className="text-white">
                        Finish
                    </BodyLarge>
                </button>
            </div>
        </div>
    );
};

export default CustomizeCompleted;
