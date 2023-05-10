import type { AnalyzedTransaction } from './analyzeTransactions';

export type TxAction =
    | 'faucet'
    | 'send'
    | 'receive'
    | 'staking'
    | 'mint'
    | 'transfer'
    | 'function'
    | 'clone'
    | 'modify'
    | 'burn'
    | 'unknown';

const getTxAction = (analyzedTransaction: AnalyzedTransaction): TxAction => {
    if (analyzedTransaction.important?.faucet) {
        return 'faucet';
    }

    if (analyzedTransaction.important?.staking) {
        return 'staking';
    }

    if (analyzedTransaction.important?.moveCalls) {
        return 'function';
    }

    if (analyzedTransaction.important?.sending) {
        if (analyzedTransaction.important.sending?.[0].isSender) {
            return 'send';
        } else {
            return 'receive';
        }
    }

    return 'unknown';
};

export default getTxAction;
