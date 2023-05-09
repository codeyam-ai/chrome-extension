import { Coin, SUI_TYPE_ARG } from '@mysten/sui.js';
import { useMemo } from 'react';

import { Costs, Gains } from './Amount';
import Gas from './Gas';
import Total from './Total';
import TransactionBody from './TransactionBody';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './SimpleAssetSwap';

const CoinImage = ({ symbol, icon }: { symbol?: string; icon: string }) => {
    return <img src={icon} alt={`coin-${symbol}`} height={60} width={60} />;
};

const SwapTransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const { addition, reduction, analysis } = stepInformation;
    const additionCoinType = useMemo(
        () => Coin.getCoinType(addition.type ?? SUI_TYPE_ARG),
        [addition]
    );
    const reductionCoinType = useMemo(
        () => Coin.getCoinType(reduction.type ?? SUI_TYPE_ARG),
        [reduction]
    );
    const additionPrimaryType = useMemo(
        () => additionCoinType ?? addition.type ?? SUI_TYPE_ARG,
        [additionCoinType, addition]
    );
    const reductionPrimaryType = useMemo(
        () => reductionCoinType ?? reduction.type ?? SUI_TYPE_ARG,
        [reductionCoinType, reduction]
    );
    const simpleAdditionType = useMemo(
        () => additionPrimaryType.split('::')[2],
        [additionPrimaryType]
    );
    const simpleReductionType = useMemo(
        () => reductionPrimaryType.split('::')[2],
        [reductionPrimaryType]
    );
    console.log('additionCoinType', additionCoinType);
    const [, additionSymbol, , additionName, additionIconUrl] = useFormatCoin(
        0,
        additionCoinType
    );
    const [, reductionSymbol, , reductionName, reductionIconUrl] =
        useFormatCoin(0, reductionCoinType);

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-ethos-light-gray dark:bg-ethos-dark-background-secondary flex flex-col divide-y divide-ethos-light-purple dark:divide-ethos-dark-text-stroke overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    {reductionIconUrl && additionIconUrl && (
                        <div className="flex items-center justify-center gap-3">
                            <div className="inline-block pb-3">
                                <CoinImage
                                    symbol={reductionSymbol}
                                    icon={reductionIconUrl}
                                />
                            </div>
                            <div className="inline-block pb-3">
                                <CoinImage
                                    symbol={additionSymbol}
                                    icon={additionIconUrl}
                                />
                            </div>
                        </div>
                    )}
                    <BodyLarge>You are about to swap:</BodyLarge>
                    <div className="text-lg flex justify-center items-center gap-1 pt-1">
                        <BodyLarge isSemibold>
                            {reductionName ?? simpleReductionType}
                        </BodyLarge>
                        <Body isTextColorMedium>for</Body>
                        <BodyLarge isSemibold>
                            {additionName ?? simpleAdditionType}
                        </BodyLarge>
                    </div>
                </div>
                <Costs balanceReductions={analysis.balanceReductions} />
                <Gains balanceAdditions={analysis.balanceAdditions} />
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default SwapTransactionCard;
