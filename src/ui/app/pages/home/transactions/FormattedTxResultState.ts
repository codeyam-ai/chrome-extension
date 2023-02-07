import type { FormattedCoin } from './FormattedCoin';
import type { TxResultState } from './TxResultState';

export interface FormattedTxResultState extends TxResultState {
    formatted?: FormattedCoin;
}
