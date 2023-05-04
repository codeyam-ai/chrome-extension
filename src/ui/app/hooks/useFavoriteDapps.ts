import { useCallback, useEffect, useMemo } from 'react';

import getDisplay from '../helpers/getDisplay';
import capyart from '_images/dapps/logos/capyart.png';
import dappsMap, { CUSTOMIZE_ID, NetworkName } from '_src/data/dappsMap';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    accountNftsSelector,
    saveExcludedDappsKeys,
    saveFavoriteDappsKeys,
} from '_src/ui/app/redux/slices/account';

import type { SuiObjectData } from '@mysten/sui.js';
import type { DappData } from '_src/types/DappData';

export const useFavoriteDapps = () => {
    const dispatch = useAppDispatch();
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
        async (keys: string[]) => {
            await dispatch(saveExcludedDappsKeys(keys));
        },
        [dispatch]
    );

    const setFavoriteDappsKeys = useCallback(
        async (keys: string[]) => {
            await dispatch(saveFavoriteDappsKeys(keys));
        },
        [dispatch]
    );

    const favoriteDapps: {
        allFavoriteDapps: DappData[];
        favoriteDappsForCurrentNetwork: DappData[];
    } = useMemo(() => {
        let projectNFTs: Record<string, DappData> = {};
        if (nfts) {
            projectNFTs = getProjectNftsFromAllNfts(nfts, selectedApiEnv);
        }

        const allFavoriteDappsKeys = [...favoriteDappsKeys].filter(
            (key) => !excludedDappsKeys.includes(key)
        );

        if (!favoriteDappsKeys.includes(CUSTOMIZE_ID)) {
            allFavoriteDappsKeys.push(CUSTOMIZE_ID);
        }

        const allFavoriteDapps = allFavoriteDappsKeys
            .map((key) => {
                const dapp = dappsMap.get(key);

                if (projectNFTs[key]) {
                    return projectNFTs[key];
                }

                return dapp;
            })
            .filter(Boolean) as DappData[];

        const favoriteDappsForCurrentNetwork = allFavoriteDapps.filter(
            (dapp) => {
                if (!dapp?.urls[selectedApiEnv]) {
                    return null;
                }
                return dapp;
            }
        );

        return {
            allFavoriteDapps,
            favoriteDappsForCurrentNetwork,
        };
    }, [excludedDappsKeys, favoriteDappsKeys, nfts, selectedApiEnv]);

    const favoriteNfts: DappData[] = useMemo(() => {
        let projectNFTs: Record<string, DappData> = {};
        if (nfts) {
            projectNFTs = getProjectNftsFromAllNfts(nfts, selectedApiEnv);
        }
        return Object.keys(projectNFTs)
            .filter((nftKey) => {
                return (
                    !excludedDappsKeys.includes(nftKey) &&
                    !favoriteDappsKeys.includes(nftKey)
                );
            })
            .map((key) => projectNFTs[key]);
    }, [nfts, selectedApiEnv, excludedDappsKeys, favoriteDappsKeys]);

    const allFavorites: DappData[] = useMemo(() => {
        return [
            ...favoriteNfts,
            ...favoriteDapps.favoriteDappsForCurrentNetwork,
        ].filter(
            (dapp, index, self) =>
                self.findIndex((d) => d.id === dapp.id) === index
        );
    }, [favoriteNfts, favoriteDapps]);

    useEffect(() => {
        const allFavoriteDappsKeys = favoriteDapps.allFavoriteDapps.map(
            (dapp) => dapp.id
        );
        if (
            JSON.stringify(allFavoriteDappsKeys) !==
            JSON.stringify(favoriteDappsKeys)
        ) {
            setFavoriteDappsKeys(allFavoriteDappsKeys);
        }
    }, [
        allFavorites,
        favoriteDapps.allFavoriteDapps,
        favoriteDappsKeys,
        setFavoriteDappsKeys,
    ]);

    return {
        favoriteDapps: favoriteDapps.allFavoriteDapps,
        favoriteNfts,
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
