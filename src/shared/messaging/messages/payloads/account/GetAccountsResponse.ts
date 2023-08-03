// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { BasePayload } from '_payloads';

export interface GetAccountsResponse extends BasePayload {
    type: 'get-accounts-response';
    accounts: string[];
}
