import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';

export type BasicTransactionInfo = {
    type: string;
    commands?: string[];
};

const basicTransactionAnalysis = (
    transactionResponse: SuiTransactionBlockResponse
) => {
    const analysis: BasicTransactionInfo | undefined = undefined;

    const { transaction } = transactionResponse;

    const innerTransaction = transaction?.data?.transaction;

    if (!innerTransaction) return analysis;

    if (innerTransaction?.kind !== 'ProgrammableTransaction') {
        return {
            type: innerTransaction?.kind,
        };
    }

    return {
        type: innerTransaction.kind,
        commands: innerTransaction.transactions
            .map((command) => Object.keys(command)[0])
            .filter(
                (commandName) =>
                    !['SplitCoins', 'MergeCoins', 'MakeMoveVec'].includes(
                        commandName
                    )
            ),
    };
};

export default basicTransactionAnalysis;
