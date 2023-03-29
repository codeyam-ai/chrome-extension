import type { FormattedTransaction } from './types';
import type { SuiObjectChange } from '@mysten/sui.js';

export type TxType = string;

function getType(objectChanges: SuiObjectChange[]) {
    let combinedTypes = '';

    for (const obj of objectChanges) {
        if ('objectType' in obj) {
            const objectType = obj.objectType.split('::');
            combinedTypes = combinedTypes.concat(objectType[1]);
        }
    }

    if (combinedTypes.includes('nft')) {
        return 'nft';
    } else if (combinedTypes.includes('coin')) {
        return 'coin';
    }
}

const getTxType = (txn: FormattedTransaction): string => {
    let type = 'func';

    if (txn.objectChanges && txn.objectChanges.length > 0) {
        type = getType(txn.objectChanges) || 'func';
    }

    return type;
};

export default getTxType;
