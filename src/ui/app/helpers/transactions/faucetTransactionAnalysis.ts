import type { SuiAddress, SuiTransactionBlockResponse } from '@mysten/sui.js';

export type FaucetTransactionInfo = {
    amount: bigint;
};

const faucetTransactionAnalysis = (
    ownerAddress: SuiAddress,
    transactionResponse: SuiTransactionBlockResponse
) => {
    const analysis: FaucetTransactionInfo | undefined = undefined;

    const { transaction, balanceChanges } = transactionResponse;

    const innerTransaction = transaction?.data?.transaction;
    if (!balanceChanges || innerTransaction?.kind !== 'ProgrammableTransaction')
        return analysis;

    if (JSON.stringify(innerTransaction.transactions) !== FAUCET_COMMANDS)
        return analysis;

    const { inputs } = innerTransaction;
    if (inputs.length !== 2) return analysis;

    if (
        !inputs.find(
            (i) =>
                i.type === 'pure' &&
                i.valueType === 'address' &&
                i.value === ownerAddress
        )
    )
        return analysis;

    const amountInput = inputs.find(
        (i) => i.type === 'pure' && i.valueType === 'u64' && i.value
    );

    if (amountInput?.type === 'pure') {
        return {
            amount: BigInt(amountInput.value as string) * BigInt(5),
        };
    }
};

export default faucetTransactionAnalysis;

const FAUCET_COMMANDS = `[{"SplitCoins":["GasCoin",[{"Input":0},{"Input":0},{"Input":0},{"Input":0},{"Input":0}]]},{"TransferObjects":[[{"NestedResult":[0,0]},{"NestedResult":[0,1]},{"NestedResult":[0,2]},{"NestedResult":[0,3]},{"NestedResult":[0,4]}],{"Input":1}]}]`;
