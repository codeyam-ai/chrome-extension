import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FavoritesSortableList } from './FavoritesSortableList';
import { CUSTOMIZE_ID } from '_src/data/dappsMap';
import { useFavoriteDapps } from '_src/ui/app/hooks/useFavoriteDapps';
import Button from '_src/ui/app/shared/buttons/Button';
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
        if (tempRemovedNftKeys.includes(CUSTOMIZE_ID)) {
            const tempRemovedNftKeysWithoutCustomize =
                tempRemovedNftKeys.filter((key) => key !== CUSTOMIZE_ID);
            await setExcludedDappsKeys(tempRemovedNftKeysWithoutCustomize);
        } else {
            await setExcludedDappsKeys(tempRemovedNftKeys);
        }

        navigate('/home/customize/completed');
    }, [
        navigate,
        setExcludedDappsKeys,
        setFavoriteDappsKeys,
        tempFavoriteDappsKeys,
        tempRemovedNftKeys,
    ]);

    return (
        <div className="relative flex flex-col items-center pt-6">
            <Title>Choose your favorite apps</Title>
            <Button onClick={handleOnContinue} wrapperClassName="w-full mt-6">
                Save
            </Button>

            <FavoritesSortableList onFavoritesChosen={onFavoritesChosen} />
        </div>
    );
};

export default ChangeFavoritesPage;
