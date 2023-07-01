import { SUI_TYPE_ARG } from '@mysten/sui.js';

import truncateMiddle from '../../helpers/truncate-middle';
import { useFormatCoin } from '../../hooks';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import CopyBody from '../../shared/typography/CopyBody';

import type React from 'react';

type Props = {
    totalGasUsed?: bigint;
    digest: string;
};

const ReceiptDetails: React.FC<Props> = ({ totalGasUsed, digest }) => {
    let gasFeeValue;

    const [formattedGasFee, gasSymbol, dollars, , , , , hasConversion] =
        useFormatCoin(totalGasUsed, SUI_TYPE_ARG);

    if (hasConversion) {
        gasFeeValue = `${formattedGasFee} ${gasSymbol} ≈ ${dollars} USD`;
    } else {
        gasFeeValue = `${formattedGasFee} ${gasSymbol}`;
    }

    return (
        <div className="-mx-6">
            <KeyValueList
                header={'Details'}
                keyNamesAndValues={[
                    {
                        keyName: 'Gas Fee',
                        value: gasFeeValue,
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
        </div>
    );
};

export default ReceiptDetails;
