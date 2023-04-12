// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { Payload } from './Payload';

export type PayloadType =
    | 'permission-request'
    | 'permission-response'
    | 'get-permission-requests'
    | 'get-account'
    | 'get-account-response'
    | 'has-permissions-request'
    | 'has-permissions-response'
    | 'acquire-permissions-request'
    | 'acquire-permissions-response'
    | 'execute-transaction-request'
    | 'execute-transaction-response'
    | 'get-transaction-requests'
    | 'get-transaction-requests-response'
    | 'transaction-request-response'
    | 'sign-message-request'
    | 'get-account-customizations'
    | 'get-account-customizations-response'
    | 'get-network'
    | 'get-network-response'
    | 'open-wallet'
    | 'open-wallet-response'
    | 'disconnect-request'
    | 'disconnect-response'
    | 'preapproval-request'
    | 'preapproval-response'
    | 'get-preapproval-requests'
    | 'get-preapproval-response'
    | 'execute-sign-message-request'
    | 'execute-sign-message-response'
    | 'sign-message-request-response'
    | 'get-sign-message-requests'
    | 'get-sign-message-request-response'
    | 'sign-transaction-request'
    | 'sign-transaction-response'
    | 'update-active-origin'
    | 'disconnect-app'
    | 'done'
    | 'keyring'
    | 'stake-request'
    | 'wallet-status-changed'
    | 'get-features'
    | 'features-response'
    | 'get-network'
    | 'set-network'
    | 'heartbeat'
    | 'wallet-locked'
    | 'lock-wallet-request'
    | 'get-theme'
    | 'get-theme-response'
    | 'set-account-customizations'
    | 'set-account-customizations-response'
    | 'set-contacts'
    | 'set-contacts-response'
    | 'set-favorites'
    | 'set-favorites-response'
    | 'get-contacts'
    | 'get-contacts-response'
    | 'get-favorites'
    | 'get-favorites-response';

export interface BasePayload {
    type: PayloadType;
}

export function isBasePayload(payload: Payload): payload is BasePayload {
    return 'type' in payload && typeof payload.type !== 'undefined';
}
