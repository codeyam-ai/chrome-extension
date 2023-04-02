import { SUI_TYPE_ARG } from '@mysten/sui.js';

import Amount from './Amount';
import Gas from './Gas';
import Total from './Total';
import TransactionBody from './TransactionBody';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './SimpleAssetMint';

const MintTransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const { type, analysis } = stepInformation;

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-[#F8F5FF] flex flex-col divide-y divide-color-[#F0EBFE] overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    <BodyLarge>You are about to mint</BodyLarge>
                    <div className="text-lg flex justify-center gap-6">
                        <BodyLarge isSemibold>{type}</BodyLarge>
                    </div>
                </div>
                <Amount amount={analysis.rawAmount} coinType={SUI_TYPE_ARG} />
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default MintTransactionCard;
