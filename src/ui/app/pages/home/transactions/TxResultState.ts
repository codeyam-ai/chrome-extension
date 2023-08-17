import type { ExecutionStatus } from '@mysten/sui.js/client';
import type { TransactionKindName } from '@mysten/sui.js/src/types/transactions';

type ExecutionStatusType = ExecutionStatus['status']

export interface TxResultState {
    to?: string;
    txId: string;
    status: ExecutionStatusType;
    txGas: number;
    kind: TransactionKindName | undefined;
    from: string;
    amount?: number;
    timestampMs?: number;
    url?: string;
    balance?: number;
    objectId?: string;
    description?: string;
    name?: string;
    isSender?: boolean;
    error?: string;
    callModuleName?: string;
    callFunctionName?: string;
    objSymbol?: string;
    objType?: string;
    toAddr?: string;
    txAmount?: number;
    vendor?: string;
    txType?: string;
    type: string;
}
