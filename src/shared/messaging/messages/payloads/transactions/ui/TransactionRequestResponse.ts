// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from '_payloads';

import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import type { SuiSignPersonalMessageOutput, SuiSignTransactionBlockOutput } from '@mysten/wallet-standard';
import type { BasePayload, Payload } from '_payloads';

export interface TransactionRequestResponse extends BasePayload {
    type: 'transaction-request-response';
    txID: string;
    approved: boolean;
    txResult?: SuiTransactionBlockResponse | SuiSignPersonalMessageOutput;
    txResultError?: string;
    txSigned?: SuiSignTransactionBlockOutput;
}

export function isTransactionRequestResponse(
    payload: Payload
): payload is TransactionRequestResponse {
    return (
        isBasePayload(payload) &&
        payload.type === 'transaction-request-response'
    );
}
