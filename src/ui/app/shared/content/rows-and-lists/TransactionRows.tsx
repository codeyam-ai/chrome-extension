import TransactionRow from './TransactionRow';
import { TxResultState } from '_src/ui/app/redux/slices/txresults';
import { FormattedCoin } from '_src/ui/app/pages/home/transactions/FormattedCoin';

interface txnType extends TxResultState {
    formatted: FormattedCoin;
}

interface TransactionRowsProps {
    transactions: txnType[] | undefined;
}

const TransactionRows = ({ transactions }: TransactionRowsProps) => {
    return (
        <div className="px-6 pb-6 divide-ethos-light-text-stroke">
            {transactions &&
                transactions.map((txn) => {
                    return <TransactionRow txn={txn} key={txn.txId} />;
                })}
        </div>
    );
};

export default TransactionRows;
