// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import getDisplay from '../helpers/getDisplay';
import ipfs from '../helpers/ipfs';

import type { SuiObjectData } from '@mysten/sui.js/client';

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
        let mediaUrl: string | undefined;
        if (fieldName === 'url') {
            mediaUrl =
                objDisplay?.['image_url'] ??
                (fields &&
                'image_url' in fields &&
                typeof fields.image_url === 'string'
                    ? fields.image_url
                    : undefined); //fields?.['image_url']

            if (!mediaUrl) {
                mediaUrl =
                    objDisplay?.['img_url'] ??
                    (fields &&
                    'img_url' in fields &&
                    typeof fields.img_url === 'string'
                        ? fields.img_url
                        : undefined); //fields?.['img_url'];
            }
        }

        if (!mediaUrl) {
            const maybeFieldNameValue =
                fields && `${fieldName}` in fields
                    ? fields[fieldName as keyof typeof fields]
                    : undefined;
            mediaUrl = objDisplay?.[fieldName] ?? maybeFieldNameValue;
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
