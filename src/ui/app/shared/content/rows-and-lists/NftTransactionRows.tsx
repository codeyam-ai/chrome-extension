import NftTransactionRow from './NFTTransactionRow';

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

    // const tempData = [
    //     {
    //         txId: 'ID',
    //         status: '',
    //         txType: 'Sold',
    //         toAddr: '0000000000000000000000',
    //         fromAddr: '0000000000000000000000',
    //         txAmount: 500000,
    //         txGas: 10000,
    //         coinType: 'SUI',
    //         vendor: 'Clutchy',
    //         date: 'Wed, Sept. 14',
    //         kind: '',
    //         from: '',
    //     },
    //     {
    //         txId: 'ID',
    //         status: '',
    //         txType: 'Listed',
    //         toAddr: '0000000000000000000000',
    //         fromAddr: '0000000000000000000000',
    //         txAmount: 500000,
    //         txGas: 10000,
    //         coinType: 'SUI',
    //         vendor: 'Clutchy',
    //         date: 'Wed, Sept. 14',
    //         kind: '',
    //         from: '',
    //     },
    //     {
    //         txId: 'ID',
    //         status: '',
    //         txType: 'Sent',
    //         toAddr: '0000000000000000000000',
    //         fromAddr: '0000000000000000000000',
    //         txAmount: 500000,
    //         txGas: 10000,
    //         coinType: 'SUI',
    //         vendor: 'Clutchy',
    //         date: 'Wed, Sept. 14',
    //         kind: '',
    //         from: '',
    //     },
    // ];

    return (
        <div className="pb-6 dark:divide-ethos-dark-text-stroke">
            {(transactions || []).map((txn, idx) => {
                return <NftTransactionRow txn={txn} key={idx} />;
            })}
        </div>
    );
};

export default NftTransactionRows;
