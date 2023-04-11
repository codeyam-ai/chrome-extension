// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { BasePayload } from '_payloads';
import type { NetworkEnvType } from '_src/background/NetworkEnv';

export interface GetNetworkResponse extends BasePayload {
    type: 'get-network-response';
    network: NetworkEnvType;
}
