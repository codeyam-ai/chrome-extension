// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface DisconnectRequest extends BasePayload {
    type: 'disconnect-request';
}

export function isDisconnectRequest(
    payload: Payload
): payload is DisconnectRequest {
    return isBasePayload(payload) && payload.type === 'disconnect-request';
}
