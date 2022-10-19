import { TxResultState } from '_src/ui/app/redux/slices/txresults';
import TransactionCard from '_components/transactions-card';
import TransactionRow from './TransactionRow';

interface TransactionRowsProps {
    transactions: TxResultState[];
}

const TransactionRows = ({ transactions }: TransactionRowsProps) => {
    return (
        <div className="px-6 pb-6 divide-y divide-ethos-light-text-stroke dark:divide-ethos-dark-text-stroke">
            {transactions.map((txn) => {
                return <TransactionRow txn={txn} key={txn.txId} />;
            })}
        </div>
    );
};

export default TransactionRows;
