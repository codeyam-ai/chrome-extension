import Body from '../../shared/typography/Body';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';

const ReceiptSpecifics = (analyzedTransaction: AnalyzedTransaction) => {
    return (
        <div>
            Transaction Specifics
            <Body isTextColorMedium>{analyzedTransaction.digest}</Body>
        </div>
    );
};

export default ReceiptSpecifics;
