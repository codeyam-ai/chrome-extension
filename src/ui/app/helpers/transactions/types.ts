import type {
    SuiAddress,
    SuiTransaction,
    TransactionEffects,
} from '@mysten/sui.js';

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

export interface FormattedTransaction {
    digest?: string;
    type?: string;
    effects?: TransactionEffects;
    transaction?: SuiTransaction;
    balanceChanges?: BalanceChange[];
    objectChanges?: any[];
    primaryObject?: TransactionObjectInfo;
    primaryCoin?: TransactionCoinInfo;
    timestampMs?: number;
    isSender?: boolean;
    from?: SuiAddress;
    to?: SuiAddress;
}
