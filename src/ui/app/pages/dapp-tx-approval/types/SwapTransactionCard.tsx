import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
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
    const additionPrimaryType = useMemo(
        () => addition.type ?? SUI_TYPE_ARG,
        [addition]
    );
    const reductionPrimaryType = useMemo(
        () => reduction.type ?? SUI_TYPE_ARG,
        [reduction]
    );
    const simpleAdditionType = useMemo(
        () => additionPrimaryType.split('::')[2],
        [additionPrimaryType]
    );
    const simpleReductionType = useMemo(
        () => reductionPrimaryType.split('::')[2],
        [reductionPrimaryType]
    );
    const [, additionSymbol, , additionName, additionIconUrl] = useFormatCoin(
        0,
        addition.type
    );
    const [, reductionSymbol, , reductionName, reductionIconUrl] =
        useFormatCoin(0, reduction.type);

    const action = useMemo(() => {
        const commonActions = [
            'mint',
            'swap',
            'borrow',
            'supply',
            'redeem',
            'add',
            'trade',
            'loan',
            'repay',
        ];
        for (const commonAction of commonActions) {
            const moveCall = analysis.moveCalls[0];
            if (!moveCall || !('target' in moveCall) || !moveCall.target)
                continue;
            if (moveCall.target.includes(commonAction)) {
                return commonAction;
            }
        }
        return 'swap';
    }, [analysis.moveCalls]);

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
                    <BodyLarge>You are about to {action}:</BodyLarge>
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
