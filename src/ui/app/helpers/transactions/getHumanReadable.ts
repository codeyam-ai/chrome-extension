import getDisplayImage from './getDisplayImage';
import getTxAction from './getTxAction';
import convertUnixTimeToLocalTime from '../convertUnixTimeToLocalTime';

import type { AnalyzedTransaction } from './analyzeTransactions';
import type { TxAction } from './getTxAction';
import type { ReactNode } from 'react';

const getHumanReadable = (analyzedTransaction: AnalyzedTransaction) => {
    const timeDisplay = convertUnixTimeToLocalTime(
        Number(analyzedTransaction.timestampMs || '0')
    );
    const action = getTxAction(analyzedTransaction);
    const image = getDisplayImage(analyzedTransaction, action);

    return {
        timeDisplay,
        image,
        action,
    };
};

export default getHumanReadable;
