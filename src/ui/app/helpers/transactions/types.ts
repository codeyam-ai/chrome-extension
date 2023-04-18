import type { AnalyzedTransaction } from './analyzeTransactions';
import type { TxAction } from './getTxAction';
import type { ReactNode } from 'react';

export interface TransactionCoinInfo {
    type: string;
    name?: string;
    amount?: string;
    formattedBalance?: string;
    dollars?: string;
    symbol?: string;
    icon?: string;
}

export interface TransactionObjectInfo {
    id: string;
    type: string;
    uri?: string;
}

export interface BalanceChange {
    owner:
        | {
              AddressOwner: string;
          }
        | {
              ObjectOwner: string;
          }
        | {
              Shared: {
                  initial_shared_version: number;
              };
          }
        | 'Immutable';
    coinType: string;
    amount: string;
}

export interface HumanReadableTransactionValues {
    timeDisplay?: string;
    image?: ReactNode;
    action?: TxAction;
}

export interface FormattedTransaction {
    analyzedTransaction: AnalyzedTransaction;
    humanReadable: HumanReadableTransactionValues;
}
