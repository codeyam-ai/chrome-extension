// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import ipfs from '../helpers/ipfs';

import type { SuiObjectData } from '@mysten/sui.js';

export default function useMediaUrl(objData: SuiObjectData, fieldName = 'url') {
    const { fields } =
        (objData?.content?.dataType === 'moveObject' && objData?.content) || {};
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
