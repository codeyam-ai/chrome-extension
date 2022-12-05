import NftTransactionRow from './NftTransactionRow';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface NftTransactionRowsProps {
    transactions?: TxResultState[];
}

const NftTransactionRows = ({ transactions }: NftTransactionRowsProps) => {
    return (
        <div className="pb-6 dark:divide-ethos-dark-text-stroke">
            {(transactions || []).map((txn, idx) => {
                return <NftTransactionRow txn={txn} key={idx} />;
            })}
        </div>
    );
};

export default NftTransactionRows;
