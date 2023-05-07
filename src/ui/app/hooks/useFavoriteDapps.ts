import { useCallback, useEffect, useMemo, useRef } from 'react';

import getDisplay from '../helpers/getDisplay';
import capyart from '_images/dapps/logos/capyart.png';
import dappsMap, {
    ADDRESS_BOOK_ID,
    CUSTOMIZE_ID,
    MY_ASSETS_ID,
    NetworkName,
    STAKING_ID,
} from '_src/data/dappsMap';
import {
    useAppDispatch,
    useAppSelector,
    useObjectsState,
} from '_src/ui/app/hooks';
import {
    accountNftsSelector,
    saveExcludedDappsKeys,
    saveFavoriteDappsKeys,
} from '_src/ui/app/redux/slices/account';

import type { SuiObjectData } from '@mysten/sui.js';
import type { DappData } from '_src/types/DappData';

const DEFAULT_DAPP_KEYS = [
    CUSTOMIZE_ID,
    ADDRESS_BOOK_ID,
    MY_ASSETS_ID,
    STAKING_ID,
];

export const useFavoriteDapps = () => {
    const dispatch = useAppDispatch();
    const { loading: nftsLoading } = useObjectsState();
    const newState = useRef<string[]>([]);

    const [selectedApiEnv] = useAppSelector(({ app }) => [
        app.apiEnv,
        app.customRPC,
    ]);

    const favoriteDappsKeys = useAppSelector(
        ({ account }) => account.favoriteDappsKeys
    );

    const excludedDappsKeys = useAppSelector(
        ({ account }) => account.excludedDappsKeys
    );
    const nfts = useAppSelector(accountNftsSelector);

    const setExcludedDappsKeys = useCallback(
        async (keys: string[], favoriteKeys: string[]) => {
            for (const excluded of excludedDappsKeys) {
                if (
                    !favoriteKeys.includes(excluded) &&
                    !keys.includes(excluded)
                ) {
                    keys.push(excluded);
                }
            }
            await dispatch(saveExcludedDappsKeys(keys));
        },
        [dispatch, excludedDappsKeys]
    );

    const setFavoriteDappsKeys = useCallback(
        async (keys: string[]) => {
            newState.current = keys;
            await dispatch(saveFavoriteDappsKeys(keys));
        },
        [dispatch]
    );

    const { favoriteNfts, favoriteDapps, allFavorites } = useMemo(() => {
        let projectNFTs: Record<string, DappData> = {};
        if (nfts) {
            projectNFTs = getProjectNftsFromAllNfts(nfts, selectedApiEnv);
        }

        const allFavoriteDappsKeys = [...favoriteDappsKeys];
        for (const defaultDappKey of DEFAULT_DAPP_KEYS) {
            if (!allFavoriteDappsKeys.includes(defaultDappKey)) {
                allFavoriteDappsKeys.push(defaultDappKey);
            }
        }

        for (const projectId of Object.keys(projectNFTs)) {
            if (!allFavoriteDappsKeys.includes(projectId)) {
                allFavoriteDappsKeys.splice(0, 0, projectId);
            }
        }

        const finalFavoriteDappsKeys = allFavoriteDappsKeys.filter(
            (key) => !excludedDappsKeys.includes(key)
        );

        const allFavorites = finalFavoriteDappsKeys
            .map((key) => (dappsMap.get(key) ?? projectNFTs[key]) as DappData)
            .filter((dapp) => dapp && !excludedDappsKeys.includes(dapp.id));

        if (!allFavorites.find((f) => f.id === CUSTOMIZE_ID)) {
            allFavorites.push(dappsMap.get(CUSTOMIZE_ID) as DappData);
        }

        const favoriteNfts = Object.values(projectNFTs);
        const favoriteDapps = allFavorites.filter(
            (dapp) => !projectNFTs[dapp.id]
        );

        newState.current = favoriteNfts.map((f) => f.id);

        return {
            favoriteNfts,
            favoriteDapps,
            allFavorites: nftsLoading ? undefined : allFavorites,
        };
    }, [
        nfts,
        excludedDappsKeys,
        favoriteDappsKeys,
        nftsLoading,
        selectedApiEnv,
    ]);

    useEffect(() => {
        if (!allFavorites) return;

        const finalFavoriteDappKeys = allFavorites.map((f) => f.id);
        if (
            JSON.stringify(finalFavoriteDappKeys) ===
                JSON.stringify(newState.current) &&
            JSON.stringify(finalFavoriteDappKeys) !==
                JSON.stringify(favoriteDappsKeys)
        ) {
            setFavoriteDappsKeys(finalFavoriteDappKeys);
        }
    }, [nfts, favoriteDappsKeys, allFavorites, setFavoriteDappsKeys]);

    const favoriteDappsForCurrentNetwork = useMemo(() => {
        if (!allFavorites) return [];

        return allFavorites.filter((dapp) => {
            if (!dapp?.urls[selectedApiEnv]) {
                return null;
            }
            return dapp;
        });
    }, [allFavorites, selectedApiEnv]);

    return {
        favoriteDappsForCurrentNetwork,
        favoriteNfts,
        favoriteDapps,
        allFavorites,
        excludedDappsKeys,
        setFavoriteDappsKeys,
        setExcludedDappsKeys,
    };
};

export const getProjectNftsFromAllNfts = (
    allNfts: SuiObjectData[],
    selectedApiEnv?: string
) => {
    return allNfts
        .map((nft) => ({ ...(getDisplay(nft.display) ?? {}) }))
        .filter((display) => {
            if (!display) return false;

            if (display.project_url === 'https://testnet.suifrens.com') {
                display.project_name = 'SuiFrens';
                display.project_image_url = capyart;
            }

            return (
                display &&
                display.project_url &&
                display.project_name &&
                display.project_image_url
            );
        })
        .reduce((acc, display) => {
            if (!display?.project_url) return acc;
            return {
                ...acc,
                [display.project_url]: {
                    id: display.project_url,
                    title: display.project_name,
                    description: display.project_description,
                    image: display.project_image_url,
                    urls: {
                        [selectedApiEnv ?? NetworkName.MAINNET]:
                            display.project_url,
                    },
                    tags: [],
                },
            };
        }, {} as Record<string, DappData>);
};
