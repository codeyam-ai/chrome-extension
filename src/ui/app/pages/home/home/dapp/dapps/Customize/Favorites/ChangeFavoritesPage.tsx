import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FavoritesSortableList } from './FavoritesSortableList';
import { useFavoriteDapps } from '_src/ui/app/hooks/useFavoriteDapps';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

const ChangeFavoritesPage: React.FC = () => {
    const [tempFavoriteDappsKeys, setTempFavoriteDappsKeys] = useState<
        string[]
    >([]);
    const [tempRemovedNftKeys, setTempRemovedNftKeys] = useState<string[]>([]);

    const { setFavoriteDappsKeys, setExcludedDappsKeys } = useFavoriteDapps();
    const navigate = useNavigate();

    const onFavoritesChosen = useCallback(
        (favoriteDappsKeys: string[], removedNftKeys: string[]) => {
            setTempFavoriteDappsKeys(favoriteDappsKeys);
            setTempRemovedNftKeys(removedNftKeys);
        },
        []
    );

    const handleOnContinue = useCallback(async () => {
        await setFavoriteDappsKeys(tempFavoriteDappsKeys);
        await setExcludedDappsKeys(tempRemovedNftKeys);

        navigate('/home/customize/completed');
    }, [
        navigate,
        setExcludedDappsKeys,
        setFavoriteDappsKeys,
        tempFavoriteDappsKeys,
        tempRemovedNftKeys,
    ]);

    const goBack = useCallback(() => {
        navigate('/home/customize/color');
    }, [navigate]);

    return (
        <div className="relative flex flex-col items-center pt-6">
            <Title>Choose your favorite apps</Title>
            <div className="flex gap-2 w-full mb-2 px-6">
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
            <FavoritesSortableList onFavoritesChosen={onFavoritesChosen} />
        </div>
    );
};

export default ChangeFavoritesPage;
