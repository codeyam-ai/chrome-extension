import {
    type SuiAddress,
    type SuiTransactionBlockResponse,
    getTotalGasUsed,
} from '@mysten/sui.js';

import addressOwner from './addressOwner';
import findBalanceChanges from './findBalanceChanges';

export type SendTransactionInfo = {
    isSender: boolean;
    sender: SuiAddress;
    recipient: SuiAddress;
    coinType?: string;
    coinAmount?: bigint;
    objectId?: string;
    objectType?: string;
};

const sendTransactionAnalysis = (
    ownerAddress: SuiAddress,
    transactionResponse: SuiTransactionBlockResponse
) => {
    const analysis: SendTransactionInfo[] = [];

    const { effects, events, transaction, balanceChanges, objectChanges } =
        transactionResponse;
    if (!effects || !events) return analysis;

    const sender = transaction?.data?.sender;

    if (!sender) return analysis;

    const gasUsed = getTotalGasUsed(effects) || BigInt(0);

    const ownerBalanceChanges = findBalanceChanges({
        balanceChanges,
        ownerAddress: sender,
    });

    for (const balanceChange of ownerBalanceChanges) {
        if (balanceChange.coinType.indexOf('::sui::SUI') > -1) {
            const recipientBalanceChange = findBalanceChanges({
                balanceChanges,
                value: (BigInt(balanceChange.amount) + gasUsed) * BigInt(-1),
            })[0];

            if (recipientBalanceChange) {
                const recipient = addressOwner(recipientBalanceChange.owner);
                if (recipient) {
                    analysis.push({
                        isSender: sender === ownerAddress,
                        sender,
                        recipient,
                        coinType: recipientBalanceChange.coinType,
                        coinAmount: BigInt(recipientBalanceChange.amount),
                    });
                }
            }
        }
    }

    for (const objectChange of objectChanges || []) {
        if (objectChange.type !== 'mutated') continue;

        const sender = objectChange.sender;
        const recipient = addressOwner(objectChange.owner);
        if (!sender || !recipient || sender === recipient) continue;

        analysis.push({
            isSender: sender === ownerAddress,
            sender,
            recipient,
            objectId: objectChange.objectId,
            objectType: objectChange.objectType,
        });
    }

    return analysis;
};

export default sendTransactionAnalysis;
