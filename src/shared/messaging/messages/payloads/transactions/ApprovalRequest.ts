// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import type {
    IdentifierString,
    SuiSignAndExecuteTransactionBlockInput,
    SuiSignPersonalMessageOutput,
    SuiSignTransactionBlockOutput,
} from '@mysten/wallet-standard';

export type TransactionDataType = {
    type: 'transaction';
    data: string;
    account: string;
    chain: IdentifierString;
    justSign?: boolean;
    requestType?: SuiSignAndExecuteTransactionBlockInput['requestType'];
    options?: SuiSignAndExecuteTransactionBlockInput['options'];
};

export type SignMessageDataType = {
    type: 'sign-personal-message';
    message: string;
    accountAddress: string;
};

export type ApprovalRequest = {
    id: string;
    approved: boolean | null;
    origin: string;
    originFavIcon?: string;
    txResult?: SuiTransactionBlockResponse | SuiSignPersonalMessageOutput;
    txResultError?: string;
    txSigned?: SuiSignTransactionBlockOutput;
    createdDate: string;
    tx: TransactionDataType | SignMessageDataType;
};

export interface SignPersonalMessageApprovalRequest
    extends Omit<ApprovalRequest, 'txResult' | 'tx'> {
    tx: SignMessageDataType;
    txResult?: SuiSignPersonalMessageOutput;
}

export interface TransactionApprovalRequest
    extends Omit<ApprovalRequest, 'txResult' | 'tx'> {
    tx: TransactionDataType;
    txResult?: SuiTransactionBlockResponse;
}

export function isSignPersonalMessageApprovalRequest(
    request: ApprovalRequest
): request is SignPersonalMessageApprovalRequest {
    return request.tx.type === 'sign-personal-message';
}

export function isTransactionApprovalRequest(
    request: ApprovalRequest
): request is TransactionApprovalRequest {
    return request.tx.type !== 'sign-personal-message';
}
