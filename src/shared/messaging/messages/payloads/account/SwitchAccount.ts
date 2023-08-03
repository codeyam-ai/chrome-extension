// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface SwitchAccount extends BasePayload {
    type: 'switch-account';
    address: string;
}

export function isSwitchAccount(payload: Payload): payload is SwitchAccount {
    return isBasePayload(payload) && payload.type === 'switch-account';
}
