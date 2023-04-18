import TransactionRow from './TransactionRow';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

const TransactionRows = ({
    transactions,
}: {
    transactions: FormattedTransaction[];
}) => {
    return (
        <div className="px-6 pb-6 flex flex-col gap-9 divide-ethos-light-text-stroke">
            {transactions &&
                transactions.map((txn: FormattedTransaction, index: number) => {
                    return (
                        <TransactionRow
                            txn={txn}
                            key={`txn-${index}-${txn.analyzedTransaction.digest}`}
                        />
                    );
                })}
        </div>
    );
};

export default TransactionRows;
