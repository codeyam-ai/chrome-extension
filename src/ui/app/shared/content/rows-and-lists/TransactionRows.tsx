import TransactionRow from './TransactionRow';
import { type FormattedTxResultState } from '_src/ui/app/pages/home/transactions/FormattedTxResultState';

interface TransactionRowsProps {
    transactions: FormattedTxResultState[];
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
