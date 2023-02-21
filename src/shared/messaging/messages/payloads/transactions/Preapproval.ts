import type { ObjectId, SuiAddress } from '@mysten/sui.js';

export interface Preapproval {
    type: 'preapproval';
    address: SuiAddress;
    packageObjectId: ObjectId;
    objectId: ObjectId;
    module: string;
    function: string;
    description: string;
    totalGasLimit: number;
    perTransactionGasLimit: number;
    maxTransactionCount: number;
    approved?: boolean;
    createdDate?: string;
}

export interface TransactionSummary {
    gasUsed: number;
}
