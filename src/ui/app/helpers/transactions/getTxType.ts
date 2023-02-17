import { type FormattedTxResultState } from '../../pages/home/transactions/FormattedTxResultState';

export type TxType = 'nft' | 'sui' | 'func' | 'coin';

const getTxType = (txn: FormattedTxResultState): TxType => {
    if (txn?.callFunctionName === 'transfer' || txn?.objectId?.length) {
        return 'nft';
    } else if (txn?.kind === 'PaySui' || txn?.kind === 'PayAllSui') {
        return 'sui';
    } else if (txn?.callFunctionName && txn?.callFunctionName !== 'mint') {
        return 'func';
    } else {
        return 'coin';
    }
};

export default getTxType;
