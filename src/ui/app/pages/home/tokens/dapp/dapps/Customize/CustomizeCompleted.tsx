import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '_src/ui/app/shared/buttons/Button';
import Title from '_src/ui/app/shared/typography/Title';

const CustomizeCompleted: React.FC = () => {
    const navigate = useNavigate();

    const handleOnContinue = useCallback(() => {
        navigate('/tokens');
    }, [navigate]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="flex flex-col gap-6 mt-6 items-center place-content-center">
            <CheckCircleIcon className="w-8 h-8 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            <Title>Customization complete!</Title>
            <div className="flex mt-3 gap-3">
                <Button
                    removeContainerPadding
                    buttonStyle="secondary"
                    onClick={goBack}
                >
                    Back
                </Button>
                <Button removeContainerPadding onClick={handleOnContinue}>
                    Finish
                </Button>
            </div>
        </div>
    );
};

export default CustomizeCompleted;
