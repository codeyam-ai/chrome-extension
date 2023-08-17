import { getTotalGasUsed } from '@mysten/sui.js';
import {
    type SuiTransactionBlockResponse,
    type SuiJsonValue,
} from '@mysten/sui.js/client';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import addressOwner from './addressOwner';

export type StakingTransactionInfo = {
    coinType?: string;
    amount: bigint;
    validatorAddress: string;
};

const stakingTransactionAnalysis = (
    ownerAddress: string,
    transaction: SuiTransactionBlockResponse
) => {
    const analysis: StakingTransactionInfo[] = [];
    if (!transaction.effects || !transaction.events) return analysis;

    const { isStakingFailure, failedStakingAnalysis } =
        getStakingFailureInfo(transaction);

    if (isStakingFailure) {
        analysis.push(failedStakingAnalysis);
        return analysis;
    }

    const gasUsed = getTotalGasUsed(transaction.effects) || BigInt(0);
    const stakingEvents = transaction.events.filter(
        (event) =>
            event.sender === ownerAddress &&
            event.type === '0x3::validator::StakingRequestEvent'
    );

    if (stakingEvents.length === 0) return analysis;

    for (const stakingEvent of stakingEvents) {
        let coinType;
        // const amount = BigInt(stakingEvent.parsedJson?.amount || 0);
        const amount = BigInt(
            stakingEvent.parsedJson &&
                typeof stakingEvent.parsedJson === 'object' &&
                'amount' in stakingEvent.parsedJson &&
                (typeof stakingEvent.parsedJson.amount === 'string' ||
                    typeof stakingEvent.parsedJson.amount === 'number' ||
                    typeof stakingEvent.parsedJson.amount === 'bigint' ||
                    typeof stakingEvent.parsedJson.amount === 'boolean')
                ? stakingEvent.parsedJson.amount
                : 0
        );
        // const validator = stakingEvent.parsedJson?.validator_address;
        const validator =
            stakingEvent.parsedJson &&
            typeof stakingEvent.parsedJson === 'object' &&
            'validator_address' in stakingEvent.parsedJson &&
            typeof stakingEvent.parsedJson.validator_address === 'string'
                ? stakingEvent.parsedJson?.validator_address
                : '';
        if (transaction.balanceChanges) {
            const stakeBalanceChange = transaction.balanceChanges.find(
                (balanceChange) =>
                    addressOwner(balanceChange.owner) === stakingEvent.sender &&
                    Number(balanceChange.amount) + Number(gasUsed) ===
                        Number(amount) * -1
            );

            if (stakeBalanceChange) {
                coinType = stakeBalanceChange.coinType;
            }
        }

        analysis.push({ coinType, amount, validatorAddress: validator });
    }

    return analysis;
};

const getStakingFailureInfo = (
    transaction: SuiTransactionBlockResponse
): {
    isStakingFailure: boolean;
    failedStakingAnalysis: StakingTransactionInfo;
} => {
    if (!transaction.effects || !transaction.events) {
        return {
            isStakingFailure: false,
            failedStakingAnalysis: { amount: BigInt(0), validatorAddress: '' },
        };
    }

    const isTxFailure = transaction.effects.status.status === 'failure';
    const tx = transaction.transaction;
    const internalTransaction = tx?.data?.transaction;

    if (internalTransaction?.kind !== 'ProgrammableTransaction') {
        return {
            isStakingFailure: false,
            failedStakingAnalysis: { amount: BigInt(0), validatorAddress: '' },
        };
    }

    const { transactions: internalTransactions } = internalTransaction;

    const moveCalls = internalTransactions.filter(
        (transaction) => 'MoveCall' in transaction
    );

    const isStakingMoveCall = moveCalls.some((call) => {
        if (!('MoveCall' in call)) return undefined;

        return (
            call.MoveCall.function === 'request_add_stake' ||
            call.MoveCall.function === 'request_withdraw_stake'
        );
    });

    if (!isTxFailure || !isStakingMoveCall) {
        return {
            isStakingFailure: false,
            failedStakingAnalysis: { amount: BigInt(0), validatorAddress: '' },
        };
    }

    let validatorAddress: SuiJsonValue | undefined;
    let suiAmount: SuiJsonValue | undefined;

    internalTransaction.inputs.forEach((input) => {
        if ('valueType' in input && input.valueType === 'address') {
            validatorAddress = input.value as SuiJsonValue | undefined;
        }
        if ('valueType' in input && input.valueType === 'u64') {
            suiAmount = input.value as SuiJsonValue | undefined;
        }
    });

    return {
        isStakingFailure: true,
        failedStakingAnalysis: {
            coinType: SUI_TYPE_ARG,
            amount: BigInt(suiAmount?.toString() ?? '0'),
            validatorAddress: validatorAddress?.toString() ?? '',
        },
    };
};
export default stakingTransactionAnalysis;
