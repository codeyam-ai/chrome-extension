import { FormattedTransaction } from './types';
import getDisplayImage from './getDisplayImage';

export type TxType = string;

const getTxType = (txn: FormattedTransaction): string => {
    const hasImg = getDisplayImage(txn);
    const isSui = txn.balanceChanges.length === 1;
    const isCoin = txn.balanceChanges.length > 1;

    if (hasImg) {
        return 'nft';
    } else if (isSui) {
        return 'sui';
    } else if (isCoin) {
        return 'coin';
    } else {
        return 'func';
    }
};

export default getTxType;
