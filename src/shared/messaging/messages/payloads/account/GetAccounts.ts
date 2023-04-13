// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface GetAccounts extends BasePayload {
    type: 'get-accounts';
}

export function isGetAccounts(payload: Payload): payload is GetAccounts {
    return isBasePayload(payload) && payload.type === 'get-accounts';
}
