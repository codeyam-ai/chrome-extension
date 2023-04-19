import {
    type SuiAddress,
    type SuiTransactionBlockResponse,
    getTotalGasUsed,
} from '@mysten/sui.js';

import addressOwner from './addressOwner';

export type StakingTransactionInfo = {
    coinType?: string;
    amount: bigint;
    validator: string;
};

const stakingTransactionAnalysis = (
    ownerAddress: SuiAddress,
    transaction: SuiTransactionBlockResponse
) => {
    const analysis: StakingTransactionInfo[] = [];
    if (!transaction.effects || !transaction.events) return analysis;

    const gasUsed = getTotalGasUsed(transaction.effects) || BigInt(0);
    const stakingEvents = transaction.events.filter(
        (event) =>
            event.sender === ownerAddress &&
            event.type === '0x3::validator::StakingRequestEvent'
    );

    if (stakingEvents.length === 0) return analysis;

    for (const stakingEvent of stakingEvents) {
        let coinType;
        const amount = BigInt(stakingEvent.parsedJson?.amount || 0);
        const validator = stakingEvent.parsedJson?.validator_address;
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

        analysis.push({ coinType, amount, validator });
    }

    return analysis;
};

export default stakingTransactionAnalysis;
