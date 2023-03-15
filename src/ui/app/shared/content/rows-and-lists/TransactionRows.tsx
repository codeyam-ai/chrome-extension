import TransactionRow from './TransactionRow';

// import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

// interface TransactionRowsProps {
//     transactions: TxResultState[] | undefined;
// }

const TransactionRows = ({ transactions }: any) => {
    return (
        <div className="px-6 pb-6 divide-ethos-light-text-stroke">
            {transactions &&
                transactions.map((txn: any, index: number) => {
                    return (
                        <TransactionRow
                            txn={txn}
                            key={`txn-${index}-${txn.txId}`}
                        />
                    );
                })}
        </div>
    );
};

export default TransactionRows;
