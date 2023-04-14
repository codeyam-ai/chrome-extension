// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface OpenWallet extends BasePayload {
    type: 'open-wallet';
    accessToken?: string;
    refreshToken?: string;
}

export function isGetUrl(payload: Payload): payload is OpenWallet {
    return isBasePayload(payload) && payload.type === 'open-wallet';
}
