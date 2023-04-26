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

        let projectNFTs: Record<string, DappData> = {};
        if (nfts) {
            projectNFTs = getProjectNftsFromAllNfts(nfts);
        }

        const validProjectNFTs = Object.keys(projectNFTs)
            .filter((nft) => excludedNFTKeys.includes(nft))
            .reduce((acc, key) => {
                acc[key] = projectNFTs[key];
                return acc;
            }, {} as Record<string, DappData>);

        const dapps = allFavoriteDappsKeys
            .map((key) => dappsMap.get(key))
            .filter(Boolean) as DappData[];

        if (Object.values(validProjectNFTs).length > 0) {
            Object.keys(validProjectNFTs).forEach((key) => {
                if (!dapps.find((d) => d.id === key)) {
                    dapps.splice(0, 0, validProjectNFTs[key]);
                }
            });
        }

        if (
            !isEqual(
                dapps.map((d) => d.id),
                allFavoriteDappsKeys
            )
        ) {
            setFavoriteDappsKeys(dapps.map((d) => d.id));
        }

        return dapps;
    }, [favoriteDappsKeys, nfts, setFavoriteDappsKeys, excludedNFTKeys]);

    return {
        favoriteDapps,
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
