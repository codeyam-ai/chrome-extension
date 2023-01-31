import { useCallback, useState } from 'react';

import Button from '../../button';
import TransactionRow from './TransactionRow';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface TransactionRowsProps {
    transactions: TxResultState[];
}

const TransactionRows = ({ transactions }: TransactionRowsProps) => {
    const totalNumTxs = transactions.length;
    const [showBtn, setShowBtn] = useState(true);
    const txPerPage = 10;
    const [page, setPage] = useState(1);
    const [txs, setTxs] = useState(transactions.slice(0, txPerPage));

    const loadMore = useCallback(() => {
        const nextPage = page + 1;
        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;
        const newTxs = transactions.slice(start, end);
        setTxs([...txs, ...newTxs]);
        setPage(nextPage);

        if (nextPage * txPerPage >= totalNumTxs) {
            setShowBtn(false);
        }
    }, [page, txs, transactions, totalNumTxs]);

    if (showBtn && transactions.length < txPerPage) {
        setShowBtn(false);
    }

    return (
        <div className="px-6 pb-6 divide-ethos-light-text-stroke">
            {txs.map((txn) => {
                return <TransactionRow txn={txn} key={txn.txId} />;
            })}
            {showBtn && (
                <div
                    className={
                        'w-full flex flex-row items-center justify-center'
                    }
                >
                    <Button
                        mode={'secondary'}
                        className={'mt-4'}
                        onClick={loadMore}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TransactionRows;
