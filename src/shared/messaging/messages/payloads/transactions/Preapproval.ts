import type { ObjectId } from '@mysten/sui.js';
import type { IdentifierString } from '@wallet-standard/standard';

export interface Preapproval {
    type: 'preapproval';
    address: string;
    chain: IdentifierString;
    target: string;
    objectId: ObjectId;
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
