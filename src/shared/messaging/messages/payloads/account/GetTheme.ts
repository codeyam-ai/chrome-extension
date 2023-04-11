// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface GetTheme extends BasePayload {
    type: 'get-theme';
}

export function isGetTheme(payload: Payload): payload is GetTheme {
    return isBasePayload(payload) && payload.type === 'get-theme';
}
