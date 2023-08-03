import addressOwner from './addressOwner';

import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

export type FindBalanceChangeProps = {
    balanceChanges: SuiTransactionBlockResponse['balanceChanges'];
    value?: bigint;
    ownerAddress?: string;
};

const findBalanceChanges = ({
    balanceChanges,
    value,
    ownerAddress,
}: FindBalanceChangeProps) => {
    let filtered = balanceChanges;

    if (!filtered) return [];

    if (value !== undefined) {
        filtered = filtered.filter(
            (balanceChange) => BigInt(balanceChange.amount) === value
        );
    }

    if (ownerAddress) {
        filtered = filtered.filter(
            (balanceChange) =>
                addressOwner(balanceChange.owner) === ownerAddress
        );
    }

    return filtered;
};

export default findBalanceChanges;
