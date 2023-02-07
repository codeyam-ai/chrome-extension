// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import ipfs from '../helpers/ipfs';

import type { SuiData } from '@mysten/sui.js';

export default function useMediaUrl(objData: SuiData, fieldName = 'url') {
    const { fields } = (objData.dataType === 'moveObject' && objData) || {};
    return useMemo(() => {
        if (fields) {
            const mediaUrl = fields[fieldName];
            if (typeof mediaUrl === 'string') {
                return ipfs(mediaUrl);
            }
        }
        return null;
    }, [fields, fieldName]);
}
