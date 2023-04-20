import { formatRelative } from 'date-fns';

import getDisplayImage from './getDisplayImage';
import getTxAction from './getTxAction';
import capitalize from '../capitalize';

import type { AnalyzedTransaction } from './analyzeTransactions';

const getHumanReadable = (analyzedTransaction: AnalyzedTransaction) => {
    const timeDisplay = capitalize(
        formatRelative(
            new Date(Number(analyzedTransaction.timestampMs) || 0),
            new Date()
        )
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
