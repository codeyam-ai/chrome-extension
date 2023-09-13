import type { IdentifierString } from '@wallet-standard/standard';

export interface Preapproval {
    type: 'preapproval';
    address: string;
    chain: IdentifierString;
    target: string;
    objectId: string;
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
