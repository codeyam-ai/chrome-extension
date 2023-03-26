import TransactionRow from './TransactionRow';

import { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';
import { useAppSelector } from '_src/ui/app/hooks';

// interface TransactionRowsProps {
//     transactions: TxResultState[] | undefined;
// }

const TransactionRows = ({
    transactions,
}: {
    transactions: FormattedTransaction[];
}) => {
    const address = useAppSelector(({ account }) => account.address);
    return (
        <div className="px-6 pb-6 divide-ethos-light-text-stroke">
            {transactions &&
                transactions.map((txn: FormattedTransaction, index: number) => {
                    return (
                        <TransactionRow
                            txn={txn}
                            address={address || ''}
                            key={`txn-${index}-${txn.digest}`}
                        />
                    );
                })}
        </div>
    );
};

export default TransactionRows;
