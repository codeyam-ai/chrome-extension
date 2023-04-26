import { isEqual } from 'lodash';
import { useCallback, useMemo } from 'react';

import getDisplay from '../helpers/getDisplay';
import capyart from '_images/dapps/logos/capyart.png';
import dappsMap, { CUSTOMIZE_ID, NetworkName } from '_src/data/dappsMap';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    accountNftsSelector,
    saveExcludedNftKeys,
    saveFavoriteDappsKeys,
} from '_src/ui/app/redux/slices/account';

import type { SuiObjectData } from '@mysten/sui.js';
import type { DappData } from '_src/types/DappData';

export const useFavoriteDapps = () => {
    const favoriteDappsKeys = useAppSelector(
        ({ account }) => account.favoriteDappsKeys
    );
    const excludedNFTKeys = useAppSelector(
        ({ account }) => account.excludedNftKeys
    );
    const nfts = useAppSelector(accountNftsSelector);

    const dispatch = useAppDispatch();

    const setExcludedNftKeys = useCallback(
        (keys: string[]) => {
            dispatch(saveExcludedNftKeys(keys));
        },
        [dispatch]
    );

    const setFavoriteDappsKeys = useCallback(
        (keys: string[]) => {
            dispatch(saveFavoriteDappsKeys(keys));
        },
        [dispatch]
    );

    const favoriteDapps: DappData[] = useMemo(() => {
        const allFavoriteDappsKeys = [...favoriteDappsKeys];
        if (!favoriteDappsKeys.includes(CUSTOMIZE_ID)) {
            allFavoriteDappsKeys.push(CUSTOMIZE_ID);
        }

        return allFavoriteDappsKeys
            .map((key) => dappsMap.get(key))
            .filter(Boolean) as DappData[];
    }, [favoriteDappsKeys]);

    const favoriteNfts: DappData[] = useMemo(() => {
        let projectNFTs: Record<string, DappData> = {};
        if (nfts) {
            projectNFTs = getProjectNftsFromAllNfts(nfts);
        }
        return Object.keys(projectNFTs)
            .filter((nft) => !excludedNFTKeys.includes(nft))
            .map((key) => projectNFTs[key]);
    }, [nfts, excludedNFTKeys]);

    const allFavorites: DappData[] = useMemo(() => {
        return [...favoriteNfts, ...favoriteDapps];
    }, [favoriteNfts, favoriteDapps]);

    return {
        favoriteDapps,
        favoriteNfts,
        allFavorites,
        setFavoriteDappsKeys,
        setExcludedNftKeys,
    };
};

export const getProjectNftsFromAllNfts = (allNfts: SuiObjectData[]) => {
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
                        [NetworkName.DEVNET]: display.project_url,
                        [NetworkName.TESTNET]: display.project_url,
                    },
                    tags: [],
                },
            };
        }, {} as Record<string, DappData>);
};
