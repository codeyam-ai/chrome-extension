import { useCallback, useMemo, useState } from 'react';

import { Costs, Gains, Receiving, Sending } from './Amount';
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
    const [showAdditionalMoveCalls, setShowAdditionalMoveCalls] =
        useState(false);
    const { analysis } = stepInformation;

    const moveCalls = useMemo(() => {
        if (!analysis.moveCalls) return;
        return analysis.moveCalls
            .filter((tx) => tx.kind === 'MoveCall')
            .map((tx, index) =>
                tx.kind === 'MoveCall' ? (
                    <MoveCall key={`move-call-${index}`} {...tx} />
                ) : (
                    <></>
                )
            );
    }, [analysis]);

    const toggleAdditionalMoveCalls = useCallback(() => {
        setShowAdditionalMoveCalls(
            (showAdditionalMoveCalls) => !showAdditionalMoveCalls
        );
    }, []);

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-ethos-light-gray dark:bg-ethos-dark-background-secondary flex flex-col divide-y divide-ethos-light-purple dark:divide-ethos-dark-text-stroke overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    <BodyLarge isSemibold>Transaction Information</BodyLarge>
                </div>
                {moveCalls && moveCalls.slice(0, 2)}
                {moveCalls && moveCalls.length > 2 && (
                    <div
                        className="p-6 flex-col justify-center items-center text-center cursor-pointer"
                        onClick={toggleAdditionalMoveCalls}
                    >
                        <BodyLarge isSemibold>
                            {showAdditionalMoveCalls ? '-' : '+'}{' '}
                            {moveCalls.length - 2} Additional Move Calls
                        </BodyLarge>
                    </div>
                )}
                {showAdditionalMoveCalls && moveCalls && moveCalls.slice(2)}
                <Costs balanceReductions={analysis.balanceReductions} />
                <Sending
                    owner={analysis.owner}
                    transfers={analysis.assetTransfers}
                />
                <Gains balanceAdditions={analysis.balanceAdditions} />
                <Receiving
                    owner={analysis.owner}
                    transfers={analysis.assetTransfers}
                />
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default GenericTransactionCard;
