// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getObjectId, getObjectFields } from '@mysten/sui.js';

import useFileExtentionType from './useFileExtentionType';
import useMediaUrl from './useMediaUrl';

import type { SuiObjectData } from '@mysten/sui.js';

export default function useTicketBasicData(ticketObj: SuiObjectData) {
    const ticketObjectID = getObjectId(ticketObj);
    const coverFilePath = useMediaUrl(ticketObj, 'cover_image');
    const urlFilePath = useMediaUrl(ticketObj, 'url');
    const filePath = coverFilePath || urlFilePath;

    const ticketFields =
        ticketObj.type === 'moveObject' ? getObjectFields(ticketObj) : null;
    const fileExtentionType = useFileExtentionType(filePath || '');
    return {
        ticketObjectID,
        filePath,
        ticketFields,
        fileExtentionType,
    };
}
