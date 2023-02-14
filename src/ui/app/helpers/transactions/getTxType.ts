import { type TxResultState } from '../../redux/slices/txresults';

export type TxType = 'nft' | 'sui' | 'func' | 'coin';

const getTxType = (txn: TxResultState): TxType => {
    if (txn?.callFunctionName === 'transfer' || txn?.objectId?.length) {
        return 'nft';
    } else if (txn?.kind === 'PaySui') {
        return 'sui';
    } else if (txn?.callFunctionName && txn?.callFunctionName !== 'mint') {
        return 'func';
    } else {
        return 'coin';
    }
};

export default getTxType;
