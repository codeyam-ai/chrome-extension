import type { AnalyzedTransaction } from './analyzeTransactions';
import type { toFrom } from './getToFromAddress';

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

export interface HumanReadableDetails {
    addresses?: toFrom;
    timeDisplay: string;
    txType: string;
    txAction: string;
    txAmount: string;
    txStatus: 'success' | 'failure' | undefined;
    txUsdAmount: string | number | undefined;
    gasFeeInSui: string | undefined;
    gasFeeInUsd: string | undefined;
    txCommands: string | null;
    preposition: string;
    isSender: boolean;
    otherAddress: string;
    otherAddressStr: string;
    displayImage: string | null;
}

export interface FormattedTransaction {
    analyzedTransaction: AnalyzedTransaction;
    humanReadable: HumanReadableDetails;
}
