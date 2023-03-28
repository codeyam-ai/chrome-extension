import { SuiObjectChange } from '@mysten/sui.js';
import type { FormattedTransaction } from './types';

export type TxType = string;

function getType(objectChanges: SuiObjectChange[]) {
    let combinedTypes = '';

    for (const obj of objectChanges) {
        if ('objectType' in obj) {
            const objectType = obj.objectType;
            combinedTypes = combinedTypes.concat(objectType);
        }
    }

    if (combinedTypes.includes('nft')) {
        return 'nft';
    } else if (
        combinedTypes.includes('coin') &&
        combinedTypes.includes('sui')
    ) {
        return 'sui';
    } else if (combinedTypes.includes('coin')) {
        return 'coin';
    } else {
        return 'func';
    }
}

const getTxType = (txn: FormattedTransaction): string => {
    let type = 'func';

    if (txn.objectChanges && txn.objectChanges.length > 0) {
        type = getType(txn.objectChanges) || 'func';
    }

    console.log('type: ', type);
    return type;
};

export default getTxType;
