import { type FormattedTxResultState } from '../../pages/home/transactions/FormattedTxResultState';

export type TxAction =
    | 'mint'
    | 'send'
    | 'receive'
    | 'transfer'
    | 'pool'
    | 'clone'
    | 'modify'
    | 'burn'
    | undefined;

const getTxAction = (txn: FormattedTxResultState): TxAction => {
    let type: TxAction;
    if (txn.callFunctionName === 'mint' || txn.type === 'Mint') {
        type = 'mint';
    } else if (txn.callFunctionName === 'clone' || txn.type === 'clone') {
        type = 'clone';
    } else if (txn.callFunctionName === 'modify' || txn.type === 'modify') {
        type = 'modify';
    } else if (txn.callFunctionName === 'burn' || txn.type === 'burn') {
        type = 'burn';
    } else if (txn.callModuleName === 'pool') {
        type = 'pool';
    } else if (txn.isSender && !txn.callFunctionName) {
        type = 'send';
    } else if (!txn.isSender && !txn.callFunctionName) {
        type = 'receive';
        // } else if (txn.kind === 'TransferObject') {
        //     type = 'transfer';
    }

    return type;
};

export default getTxAction;
