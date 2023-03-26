import TransactionRow from './TransactionRow';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';
import { useAppSelector } from '_src/ui/app/hooks';

// interface TransactionRowsProps {
//     transactions: TxResultState[] | undefined;
// }

const TransactionRows = ({
    transactions,
}: {
    transactions: TxResultState[];
}) => {
    const address = useAppSelector(({ account }) => account.address);
    return (
        <div className="px-6 pb-6 divide-ethos-light-text-stroke">
            {transactions &&
                transactions.map((txn: TxResultState, index: number) => {
                    return (
                        <TransactionRow
                            txn={txn}
                            address={address}
                            key={`txn-${index}-${txn.txId}`}
                        />
                    );
                })}
        </div>
    );
};

export default TransactionRows;
