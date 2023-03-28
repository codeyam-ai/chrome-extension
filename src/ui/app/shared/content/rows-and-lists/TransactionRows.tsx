import TransactionRow from './TransactionRow';

import { useAppSelector } from '_src/ui/app/hooks';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

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
