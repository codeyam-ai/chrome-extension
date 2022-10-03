// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { PreapprovalRequest } from '../PreapprovalRequest';
import type { BasePayload, Payload } from '_payloads';

export interface GetPreapprovalResponse extends BasePayload {
    type: 'get-preapproval-response';
    preapprovalRequests: PreapprovalRequest[];
}

export function isGetPreapprovalResponse(
    payload: Payload
): payload is GetPreapprovalResponse {
    return (
        isBasePayload(payload) && payload.type === 'get-preapproval-response'
    );
}
