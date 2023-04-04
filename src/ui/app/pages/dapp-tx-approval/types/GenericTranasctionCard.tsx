import { useMemo } from 'react';

import { Costs, Gains } from './Amount';
import Gas from './Gas';
import MoveCall from './MoveCall';
import Total from './Total';
import TransactionBody from './TransactionBody';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './ComplexMoveCall';

const GenericTransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const { analysis } = stepInformation;

    const moveCalls = useMemo(() => {
        if (!analysis.blockData) return;
        return analysis.blockData.transactions
            .filter((tx) => tx.kind === 'MoveCall')
            .map((tx, index) =>
                tx.kind === 'MoveCall' ? (
                    <MoveCall key={`move-call-${index}`} {...tx} />
                ) : (
                    <></>
                )
            );
    }, [analysis]);

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-[#F8F5FF] flex flex-col divide-y divide-color-ethos-light-purple overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    <BodyLarge isSemibold>Transaction Information</BodyLarge>
                </div>
                {moveCalls && moveCalls.slice(0, 2)}
                {moveCalls && moveCalls.length > 2 && (
                    <div className="p-6 flex-col justify-center items-center text-center">
                        <BodyLarge isSemibold>
                            + {moveCalls.length - 2} Additional Move Calls
                        </BodyLarge>
                    </div>
                )}
                <Costs balanceReductions={analysis.balanceReductions} />
                <Gains balanceAdditions={analysis.balanceAdditions} />
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default GenericTransactionCard;
