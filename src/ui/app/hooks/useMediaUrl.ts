// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import getDisplay from '../helpers/getDisplay';
import ipfs from '../helpers/ipfs';

import type { SuiObjectData } from '@mysten/sui.js';

export const safeUrl = (testUrl: string) => {
    if (testUrl.startsWith('data:')) {
        return true;
    }

    let url;

    try {
        url = new URL(testUrl);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};

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
            mediaUrl = ipfs(mediaUrl);
            if (safeUrl(mediaUrl)) {
                return mediaUrl;
            }
        }
        return null;
    }, [fields, display, fieldName]);
}
