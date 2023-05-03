import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';
import Button from '_src/ui/app/shared/buttons/Button';

const CustomizeCompleted: React.FC = () => {
    const navigate = useNavigate();

    const handleOnContinue = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    return (
        <div className="flex flex-col gap-6 mt-6 mx-6 items-center place-content-center">
            <CheckCircleIcon className="w-10 h-10 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            <Title>Customization complete!</Title>
            <Button
                onClick={handleOnContinue}
                wrapperClassName="w-full"
                isInline
            >
                Next
            </Button>
        </div>
    );
};

export default CustomizeCompleted;
