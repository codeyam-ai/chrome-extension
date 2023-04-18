import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useMemo } from 'react';

import { useFormatCoin } from '../../hooks';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';

const ValueAndGas = ({ totalGasUsed, isSender }: AnalyzedTransaction) => {
    const [formattedGas, gasSymbol] = useFormatCoin(totalGasUsed, SUI_TYPE_ARG);

    const displayGas = useMemo(
        () => isSender && !!totalGasUsed && totalGasUsed !== BigInt(0),
        [isSender, totalGasUsed]
    );

    return (
        <div className="flex flex-col gap-1 items-end">
            <BodyLarge isSemibold>BALANCE</BodyLarge>

            {displayGas && (
                <Body isTextColorMedium className="!text-xs">
                    Gas: {formattedGas} {gasSymbol}
                </Body>
            )}
        </div>
    );
};

export default ValueAndGas;
