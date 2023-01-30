// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface GetNetwork extends BasePayload {
    type: 'get-network';
}

export function isGetNetwork(payload: Payload): payload is GetNetwork {
    return isBasePayload(payload) && payload.type === 'get-network';
}
