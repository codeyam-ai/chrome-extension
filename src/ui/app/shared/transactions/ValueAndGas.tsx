import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useMemo } from 'react';

import { useFormatCoin } from '../../hooks';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';
import classNames from 'classnames';

const ValueAndGas = ({
    totalGasUsed,
    ownerBalanceChanges,
    isSender,
}: AnalyzedTransaction) => {
    const safeOwnerBalanceChanges = ownerBalanceChanges ?? {};
    let primaryBalanceChange;
    let primaryCoinType;
    if (safeOwnerBalanceChanges[SUI_TYPE_ARG]) {
        primaryCoinType = SUI_TYPE_ARG;
        primaryBalanceChange = safeOwnerBalanceChanges[SUI_TYPE_ARG];
    } else {
        primaryCoinType = Object.keys(safeOwnerBalanceChanges)[0];
        primaryBalanceChange = safeOwnerBalanceChanges[primaryCoinType];
    }

    const [formattedGas, gasSymbol] = useFormatCoin(totalGasUsed, SUI_TYPE_ARG);
    const [formattedBalanceChange, balanceChangeSymbol] = useFormatCoin(
        primaryBalanceChange ?? 0,
        primaryCoinType ?? SUI_TYPE_ARG
    );

    const displayGas = useMemo(
        () => isSender && !!totalGasUsed && totalGasUsed !== BigInt(0),
        [isSender, totalGasUsed]
    );

    return (
        <div className="flex flex-col gap-1 items-end">
            {!!primaryBalanceChange && (
                <BodyLarge
                    isSemibold
                    className={classNames(
                        'flex items-center gap-1',
                        primaryBalanceChange > 0
                            ? 'text-ethos-light-green dark:text-ethos-dark-green'
                            : 'text-ethos-light-red dark:text-ethos-dark-red'
                    )}
                >
                    {primaryBalanceChange > 0 && '+'} {formattedBalanceChange}{' '}
                    {balanceChangeSymbol}
                </BodyLarge>
            )}

            {displayGas && (
                <Body isTextColorMedium className="!text-xs">
                    Gas: {formattedGas} {gasSymbol}
                </Body>
            )}
        </div>
    );
};

export default ValueAndGas;
