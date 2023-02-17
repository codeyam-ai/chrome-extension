import truncateString from '../truncate-string';

import type { TxType } from './getTxType';

const getTxSubject = (
    txType: TxType,
    coinSymbol?: string,
    formattedAmount?: string,
    name?: string,
    callModuleName?: string,
    callFunctionName?: string
): string => {
    if (txType === 'nft' || txType === 'func') {
        if (name) return name;
        if (callFunctionName)
            return `${callModuleName || 'function'}: "${callFunctionName}"`;
        return '';
    } else {
        return formattedAmount && coinSymbol
            ? `${truncateString(formattedAmount, 9)} ${truncateString(
                  coinSymbol,
                  9
              )}`
            : coinSymbol
            ? truncateString(coinSymbol, 9)
            : '';
    }
};

export default getTxSubject;
