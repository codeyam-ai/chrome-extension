import type { BalanceChange, SuiTransactionBlockResponse } from '@mysten/sui.js/client';

export type TxType = string;

// Check if the coinType property in balanceChanges
// is ever not equal to sui if so return 'coin'
const findCoinType = (balanceChanges: BalanceChange[]) => {
    let coinType = 'sui';

    for (const coin in balanceChanges) {
        if (balanceChanges[coin].coinType.split('::')[1] !== 'sui') {
            coinType = 'coin';
        }
    }

    return coinType;
};

// Get the type for the transaction
const getTxType = (txn: SuiTransactionBlockResponse): string => {
    let type = 'coin';

    if (txn.objectChanges && txn.balanceChanges) {
        for (const obj of txn.objectChanges) {
            if ('objectType' in obj) {
                const objectType = obj.objectType.split('::')[1];

                if (objectType !== 'coin') {
                    type = 'nft';
                }
            }
        }

        if (type === 'coin') {
            type = findCoinType(txn.balanceChanges);
        }
    }

    return type;
};

export default getTxType;
