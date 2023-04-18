import {
    type SuiAddress,
    type SuiTransactionBlockResponse,
    getTotalGasUsed,
} from '@mysten/sui.js';

import basicTransactionAnalysis, {
    type BasicTransactionInfo,
} from './basicTransactionAnalysis';
import faucetTransactionAnalysis, {
    type FaucetTransactionInfo,
} from './faucetTransactionAnalysis';
import moveCallTransactionAnalysis, {
    type MoveCallTransactionInfo,
} from './moveCallTransactionAnalysis';
import sendTransactionAnalysis, {
    type SendTransactionInfo,
} from './sendTransactionAnalysis';
import stakingTransactionAnalysis, {
    type StakingTransactionInfo,
} from './stakingTransactionAnalysis';

export type ImportantTransactionInfo = {
    staking?: StakingTransactionInfo[];
    sending?: SendTransactionInfo[];
    moveCalls?: MoveCallTransactionInfo[];
    faucet?: FaucetTransactionInfo;
    basic?: BasicTransactionInfo;
};

export type AnalyzedTransaction = {
    owner: SuiAddress;
    digest: string;
    timestampMs?: string;
    isSender: boolean;
    from?: SuiAddress;
    totalGasUsed?: bigint;
    important: ImportantTransactionInfo;
    status: 'success' | 'failure';
    original: SuiTransactionBlockResponse;
};

const analyzeTransactions = (
    ownerAddress: SuiAddress,
    transactions: SuiTransactionBlockResponse[]
) => {
    const results: AnalyzedTransaction[] = [];

    for (const transaction of transactions) {
        const important: ImportantTransactionInfo = {};

        const stakingTransactions = stakingTransactionAnalysis(
            ownerAddress,
            transaction
        );
        if (stakingTransactions.length > 0) {
            important.staking = stakingTransactions;
        }

        const sendingTransactions = sendTransactionAnalysis(
            ownerAddress,
            transaction
        );
        if (sendingTransactions.length > 0) {
            important.sending = sendingTransactions;
        }

        const moveCallTransactions = moveCallTransactionAnalysis(transaction);
        if (moveCallTransactions.length > 0) {
            important.moveCalls = moveCallTransactions;
        }

        const faucetTransaction = faucetTransactionAnalysis(
            ownerAddress,
            transaction
        );
        if (faucetTransaction) {
            important.faucet = faucetTransaction;
        }

        const basicAnalysis = basicTransactionAnalysis(transaction);
        if (basicAnalysis) {
            important.basic = basicAnalysis;
        }

        const totalGasUsed =
            transaction?.effects &&
            ownerAddress === transaction.transaction?.data?.sender
                ? getTotalGasUsed(transaction.effects)
                : undefined;

        results.push({
            owner: ownerAddress,
            digest: transaction.digest,
            timestampMs: transaction.timestampMs,
            isSender: ownerAddress === transaction.transaction?.data?.sender,
            from: transaction.transaction?.data?.sender,
            totalGasUsed,
            important,
            status: transaction.effects?.status.status ?? 'failure',
            original: transaction,
        });
    }

    return results;
};

export default analyzeTransactions;
