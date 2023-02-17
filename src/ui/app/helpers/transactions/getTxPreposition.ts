import type { TxAction } from './getTxAction';
import type { TxType } from './getTxType';

const getTxPreposition = (txType: TxType, txAction: TxAction): string => {
    if (txType === 'nft') {
        return '';
    } else if (txAction === 'send' || txAction === 'transfer') {
        return 'to';
    } else if (txAction === 'receive' || txAction === 'mint') {
        return 'from';
    } else {
        return '';
    }
};

export default getTxPreposition;
