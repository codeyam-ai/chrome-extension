import { getHumanReadable } from '../../helpers/transactions';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';

const ReceiptHeader = (analyzedTransaction: AnalyzedTransaction) => {
    const humanReadable = getHumanReadable(analyzedTransaction);

    const { action, timeDisplay, image } = humanReadable;
    const commands = analyzedTransaction.important.basic?.commands;

    return <div>HEADER</div>;
};

export default ReceiptHeader;
