import { useCallback } from 'react';

import dappsMap from '_src/data/dappsMap';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { saveFavoriteDappsKeys } from '_src/ui/app/redux/slices/account';

import type { DappData } from '_src/types/DappData';

export const useFavoriteDapps = () => {
    const favoriteDappsKeys = useAppSelector(
        ({ account }) => account.favoriteDappsKeys
    );

    const favoriteDapps: DappData[] = favoriteDappsKeys
        .map((key) => dappsMap.get(key))
        .filter(Boolean) as DappData[];

    const dispatch = useAppDispatch();

    const setFavoriteDappsKeys = useCallback(
        (keys: string[]) => {
            dispatch(saveFavoriteDappsKeys(keys));
        },
        [dispatch]
    );

    return {
        favoriteDapps,
        setFavoriteDappsKeys,
    };
};
