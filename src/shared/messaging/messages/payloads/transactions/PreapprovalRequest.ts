// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { Preapproval } from './Preapproval';
import type { BasePayload, Payload } from '_payloads';

export interface PreapprovalRequest extends BasePayload {
    type: 'preapproval-request';
    id?: string;
    preapproval: Preapproval;
    origin?: string;
    originTitle?: string;
    approved?: boolean;
    originFavIcon?: string;
    createdDate?: string;
}

export function isPreapprovalRequest(
    payload: Payload
): payload is PreapprovalRequest {
    return isBasePayload(payload) && payload.type === 'preapproval-request';
}
