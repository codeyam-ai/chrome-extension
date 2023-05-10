import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

const sortUniqueTransactions = (
    transactionBlockResponses: SuiTransactionBlockResponse[]
) => {
    return transactionBlockResponses
        .filter(
            (value, index, self) =>
                self.findIndex((tx) => tx.digest === value.digest) === index
        )
        .sort(
            (a, b) =>
                Number(b.timestampMs ?? '0') - Number(a.timestampMs || '0')
        );
};

export default sortUniqueTransactions;
