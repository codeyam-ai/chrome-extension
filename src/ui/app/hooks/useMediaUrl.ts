// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import getDisplay from '../helpers/getDisplay';
import ipfs from '../helpers/ipfs';

import type { SuiObjectData } from '@mysten/sui.js';

export default function useMediaUrl(objData: SuiObjectData, fieldName = 'url') {
    const { display, content } = objData ?? {};
    const { fields } = (content?.dataType === 'moveObject' && content) || {};
    return useMemo(() => {
        const objDisplay = getDisplay(display);
        let mediaUrl = objDisplay?.[fieldName] ?? fields?.[fieldName];
        if (!mediaUrl && fieldName === 'url') {
            mediaUrl = objDisplay?.['image_url'] ?? fields?.['image_url'];
        }
        if (!mediaUrl && fieldName === 'url') {
            mediaUrl = objDisplay?.['img_url'] ?? fields?.['img_url'];
        }
        if (typeof mediaUrl === 'string') {
            return ipfs(mediaUrl);
        }
        return null;
    }, [fields, display, fieldName]);
}
