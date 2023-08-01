import type { TransactionEffects, SuiTransactionBlockResponse, ExecutionStatusType } from "@mysten/sui.js";

const utils = {

    getTransactionEffects: (
        data: SuiTransactionBlockResponse,
    ): TransactionEffects | undefined => {
        return data.effects;
    },

    getTotalGasUsed: (effects?: TransactionEffects | null): bigint => {
        const gasSummary = effects?.gasUsed;
        if (!gasSummary) return BigInt(0);
        return BigInt(gasSummary.computationCost) +
                    BigInt(gasSummary.storageCost) -
                    BigInt(gasSummary.storageRebate)
    },

    getExecutionStatusType: (effects?: TransactionEffects | null): ExecutionStatusType | undefined => {
        return effects?.status?.status ?? undefined;
    },

    getTimestampFromTransactionResponse: (timestampMs?: string | null): string | undefined => {
        return timestampMs ?? undefined
    }
}

export default utils;