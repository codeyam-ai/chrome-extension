import type { TxAction } from './getTxAction';

const getTxVerb = (txAction: TxAction): string => {
    if (txAction === 'send') {
        return 'Sent';
    } else if (txAction === 'receive') {
        return 'Received';
    } else if (txAction === 'mint') {
        return 'Minted';
    } else if (txAction === 'transfer') {
        return 'Transferred';
    } else {
        return 'Transacted with';
    }
};

export default getTxVerb;
