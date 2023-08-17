import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';

export type MoveCallTransactionInfo = {
    packageObjectId: string;
    moduleName: string;
    functionName: string;
    possibleDisplayObjectIds?: string[];
};

const moveCallTransactionAnalysis = (
    transactionResponse: SuiTransactionBlockResponse
) => {
    const analysis: MoveCallTransactionInfo[] = [];

    const { transaction, objectChanges } = transactionResponse;

    const internalTransaction = transaction?.data?.transaction;

    if (internalTransaction?.kind !== 'ProgrammableTransaction')
        return analysis;

    const { transactions } = internalTransaction;

    const moveCalls = transactions.filter(
        (transaction) => 'MoveCall' in transaction
    );

    if (moveCalls.length === 0) return analysis;

    return moveCalls
        .map((call) => {
            if (!('MoveCall' in call)) return undefined;

            const possibleDisplayObjectIds = (objectChanges ?? [])
                .map((change) =>
                    change.type !== 'published' &&
                    change.objectType.search(/0x[0-9]::/) === -1
                        ? change.objectId
                        : undefined
                )
                .filter((c) => !!c) as string[];

            return {
                packageObjectId: call.MoveCall.package,
                moduleName: call.MoveCall.module,
                functionName: call.MoveCall.function,
                possibleDisplayObjectIds,
            };
        })
        .filter((call) => call !== undefined) as MoveCallTransactionInfo[];
};

export default moveCallTransactionAnalysis;
