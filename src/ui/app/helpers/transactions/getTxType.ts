import type { FormattedTransaction } from './types';

export type TxType = string;

const getTxType = (txn: FormattedTransaction): string => {
    let type = 'func';

    // Get the first object in the list of object changes and
    // and determine the type from the object. This will need
    // to be tested against all transaction types and assumes
    // The key is always the first object in the list.
    if (!!txn.objectChanges && txn.objectChanges.length > 0) {
        const val = txn.objectChanges[0].objectType.split('::');
        const objType = val[1].toLowerCase();

        if (objType !== 'coin') {
            type = 'nft';
        } else if (
            objType === 'coin' &&
            txn.objectChanges[0].objectType.toLowerCase().includes('sui')
        ) {
            type = 'sui';
        } else if (objType === 'coin') {
            type = 'coin';
        }
    }

    return type;
};

export default getTxType;
