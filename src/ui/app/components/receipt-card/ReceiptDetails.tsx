import { SUI_TYPE_ARG } from '@mysten/sui.js';

import truncateMiddle from '../../helpers/truncate-middle';
import { useFormatCoin } from '../../hooks';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import CopyBody from '../../shared/typography/CopyBody';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';

const ReceiptDetails = ({ totalGasUsed, digest }: AnalyzedTransaction) => {
    const [formattedGasFee, gasSymbol] = useFormatCoin(
        totalGasUsed,
        SUI_TYPE_ARG
    );

    return (
        <KeyValueList
            header={'Details'}
            keyNamesAndValues={[
                {
                    keyName: 'Gas Fee',
                    value: `${formattedGasFee} ${gasSymbol}`,
                },
                {
                    keyName: 'Digest',
                    value: (
                        <CopyBody txt={digest}>
                            {truncateMiddle(digest, 5)}
                        </CopyBody>
                    ),
                },
            ]}
        />
    );
};

export default ReceiptDetails;
