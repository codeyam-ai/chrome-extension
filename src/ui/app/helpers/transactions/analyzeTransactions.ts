import { type SuiTransactionBlockResponse } from '@mysten/sui.js/client';

import basicTransactionAnalysis, {
    type BasicTransactionInfo,
} from './basicTransactionAnalysis';
import faucetTransactionAnalysis, {
    type FaucetTransactionInfo,
} from './faucetTransactionAnalysis';
import findBalanceChanges from './findBalanceChanges';
import moveCallTransactionAnalysis, {
    type MoveCallTransactionInfo,
} from './moveCallTransactionAnalysis';
import sendTransactionAnalysis, {
    type SendTransactionInfo,
} from './sendTransactionAnalysis';
import stakingTransactionAnalysis, {
    type StakingTransactionInfo,
} from './stakingTransactionAnalysis';
import utils from '../utils';

export type ImportantTransactionInfo = {
    staking?: StakingTransactionInfo[];
    sending?: SendTransactionInfo[];
    moveCalls?: MoveCallTransactionInfo[];
    faucet?: FaucetTransactionInfo;
    basic?: BasicTransactionInfo;
};

export type AnalyzedTransaction = {
    owner: string;
    digest: string;
    timestampMs?: string | null;
    isSender: boolean;
    from?: string;
    totalGasUsed?: bigint;
    ownerBalanceChanges?: Record<string, bigint>;
    important: ImportantTransactionInfo;
    status: 'success' | 'failure';
    original: SuiTransactionBlockResponse;
};

const analyzeTransactions = (
    ownerAddress: string,
    transactions: SuiTransactionBlockResponse[]
) => {
    const results: AnalyzedTransaction[] = [];

    for (const transaction of transactions) {
        const isSender = ownerAddress === transaction.transaction?.data?.sender;

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

        const totalGasUsed = transaction?.effects
            ? utils.getTotalGasUsed(transaction.effects)
            : undefined;

        const ownerBalanceChanges = findBalanceChanges({
            balanceChanges: transaction.balanceChanges || [],
            ownerAddress: ownerAddress,
            // eslint-disable-next-line no-loop-func
        }).reduce((acc, { coinType, amount }) => {
            acc[coinType] = BigInt(amount);

            if (
                isSender &&
                coinType.indexOf('::sui::SUI') > -1 &&
                totalGasUsed
            ) {
                acc[coinType] += totalGasUsed;
            }

            return acc;
        }, {} as Record<string, bigint>);

        results.push({
            owner: ownerAddress,
            digest: transaction.digest,
            timestampMs: transaction.timestampMs,
            isSender,
            from: transaction.transaction?.data?.sender,
            totalGasUsed,
            ownerBalanceChanges,
            important,
            status: transaction.effects?.status.status ?? 'failure',
            original: transaction,
        });
    }

    return results;
};

export default analyzeTransactions;
