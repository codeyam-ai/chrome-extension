import NftTransactionRow from './NftTransactionRow';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface NftTransactionRowsProps {
    transactions?: TxResultState[];
}

const NftTransactionRows = ({ transactions }: NftTransactionRowsProps) => {
    /*
    
    TODO: Determine where the event data comes from for NFT transactions. Are the
    events already in the wallet or do the events need to be added.

    -> Get transactions prop

    */

    const tempData = [
        {
            txType: 'Sold',
            toAddr: '0000000000000000000000',
            fromAddr: '0000000000000000000000',
            txAmount: 500000,
            coinType: 'SUI',
            vendor: 'Clutchy',
            date: 'Wed, Sept. 14',
        },
        {
            txType: 'Listed',
            toAddr: '0000000000000000000000',
            fromAddr: '0000000000000000000000',
            txAmount: 500000,
            coinType: 'SUI',
            vendor: 'Clutchy',
            date: 'Wed, Sept. 14',
        },
        {
            txType: 'Sent',
            toAddr: '0000000000000000000000',
            fromAddr: '0000000000000000000000',
            txAmount: 500000,
            coinType: 'SUI',
            vendor: 'Clutchy',
            date: 'Wed, Sept. 14',
        },
    ];

    return (
        <div className="pb-6 dark:divide-ethos-dark-text-stroke">
            {tempData.map((txn, idx) => {
                return <NftTransactionRow txn={txn} key={idx} />;
            })}
        </div>
    );
};

export default NftTransactionRows;
