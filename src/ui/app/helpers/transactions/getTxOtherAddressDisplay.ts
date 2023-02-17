import type { TxAction } from './getTxAction';
import type { TxType } from './getTxType';

const getTxOtherAddressDisplay = (
    txType: TxType,
    txAction: TxAction,
    fromAddress: string,
    toAddress?: string
): string => {
    if (txType === 'nft') {
        return '';
    } else if (txAction === 'send' || txAction === 'transfer') {
        return toAddress || '';
    } else if (txAction === 'receive' || txAction === 'mint') {
        return fromAddress;
    } else {
        return '';
    }
};

export default getTxOtherAddressDisplay;
