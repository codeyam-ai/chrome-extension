import { type TxResultState } from '../../redux/slices/txresults';

export type TxAction = 'mint' | 'send' | 'receive' | 'transfer' | undefined;

const getTxAction = (txn: TxResultState): TxAction => {
    let type: TxAction;
    if (txn.callFunctionName === 'mint' || txn.type === 'Mint') {
        type = 'mint';
    } else if (txn.isSender && !txn.callFunctionName) {
        type = 'send';
    } else if (!txn.isSender && !txn.callFunctionName) {
        type = 'receive';
    } else if (txn.kind === 'TransferObject') {
        type = 'transfer';
    }

    return type;
};

export default getTxAction;
