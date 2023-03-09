// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getObjectId, getObjectFields } from '@mysten/sui.js';
import { useEffect, useState } from 'react';

import useFileExtentionType from './useFileExtentionType';
import useMediaUrl from './useMediaUrl';
import { NFT } from '_redux/slices/sui-objects/NFT';
import { api } from '_redux/store/thunk-extras';

import type { SuiObjectData } from '@mysten/sui.js';

export default function useNFTBasicData(nftObj: SuiObjectData) {
    const nftObjectID = getObjectId(nftObj);

    const defaultFilePath = useMediaUrl(nftObj);
    const [filePath, setFilePath] = useState(defaultFilePath);
    const fileExtentionType = useFileExtentionType(filePath || '');

    const defaultNftFields =
        nftObj.type === 'moveObject' ? getObjectFields(nftObj) : null;
    const [nftFields, setNftFields] = useState(defaultNftFields);

    useEffect(() => {
        if (!NFT.isBagNFT(nftObj)) return;

        const getBagNft = async () => {
            const provider = api.instance.fullNode;
            const bagNFT = await NFT.parseBagNFT(provider, nftObj);
            if ('url' in bagNFT && bagNFT.url) {
                setNftFields(bagNFT);
                setFilePath(bagNFT.url);
            }
        };

        getBagNft();
    }, [nftObj]);

    return {
        nftObjectID,
        filePath,
        fileExtentionType,
        nftFields,
    };
}
