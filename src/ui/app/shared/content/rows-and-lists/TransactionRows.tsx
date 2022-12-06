import TransactionRow from './TransactionRow';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface TransactionRowsProps {
    transactions: TxResultState[];
}

const TransactionRows = ({ transactions }: TransactionRowsProps) => {
    return (
        <div className="px-6 pb-6 divide-ethos-light-text-stroke">
            {transactions.map((txn) => {
                return <TransactionRow txn={txn} key={txn.txId} />;
            })}
        </div>
    );
};

export default TransactionRows;
