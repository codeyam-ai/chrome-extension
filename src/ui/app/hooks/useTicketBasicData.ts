// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import useFileExtentionType from './useFileExtentionType';
import useMediaUrl from './useMediaUrl';
import utils from '../helpers/utils';

import type { SuiObjectData } from '@mysten/sui.js/client';

export default function useTicketBasicData(ticketObj: SuiObjectData) {
    const ticketObjectID = ticketObj.objectId;
    const coverFilePath = useMediaUrl(ticketObj, 'cover_image');
    const urlFilePath = useMediaUrl(ticketObj, 'url');
    const filePath = coverFilePath || urlFilePath;

    const ticketFields =
        ticketObj.type === 'moveObject' ? utils.getObjectFields(ticketObj) : null;
    const fileExtentionType = useFileExtentionType(filePath || '');
    return {
        ticketObjectID,
        filePath,
        ticketFields,
        fileExtentionType,
    };
}
