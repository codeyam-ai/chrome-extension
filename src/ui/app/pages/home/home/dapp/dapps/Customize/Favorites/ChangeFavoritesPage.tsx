import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';
import { FavoritesSortableList } from './FavoritesSortableList';

const ChangeFavoritesPage: React.FC = () => {
    const navigate = useNavigate();

    const handleOnContinue = useCallback(() => {
        navigate('/home/customize/completed');
    }, [navigate]);

    const goBack = useCallback(() => {
        navigate('/home/customize/color');
    }, [navigate]);

    return (
        <div className="relative flex flex-col items-center pt-6">
            <Title className="pb-6">Choose your favorite apps</Title>
            <FavoritesSortableList />
            <div className="flex gap-2 w-full mt-6 px-6">
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
                        Continue
                    </BodyLarge>
                </button>
            </div>
        </div>
    );
};

export default ChangeFavoritesPage;
