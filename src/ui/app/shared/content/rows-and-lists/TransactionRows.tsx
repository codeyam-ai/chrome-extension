import TransactionRow from './TransactionRow';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

const TransactionRows = ({
    transactions,
}: {
    transactions: FormattedTransaction[];
}) => {
    return (
        <div className="pb-6 flex flex-col divide-ethos-light-text-stroke">
            {transactions &&
                transactions.map((txn: FormattedTransaction, index: number) => {
                    return (
                        <div
                            className="even:bg-ethos-light-background-secondary even:dark:bg-ethos-dark-background-secondary p-6"
                            key={`txn-${index}-${txn.analyzedTransaction.digest}`}
                        >
                            <TransactionRow txn={txn} />
                        </div>
                    );
                })}
        </div>
    );
};

export default TransactionRows;
