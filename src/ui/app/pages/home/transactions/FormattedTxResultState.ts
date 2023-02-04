import { FormattedCoin } from './FormattedCoin';
import { TxResultState } from './TxResultState';

export interface FormattedTxResultState extends TxResultState {
    formatted?: FormattedCoin;
}
