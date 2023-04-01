import CardRow from './CardRow';
import From from './From';
import Gas from './Gas';
import Total from './Total';
import TransactionBody from './TransactionBody';
import TransactionImage from './TransactionImage';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './SimpleCoinTransfer';

const TransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const { name, formatted, iconUrl, symbol, dollars, to, analysis } =
        stepInformation;

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-[#F8F5FF] flex flex-col divide-y divide-color-[#F0EBFE] overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    <div className="pb-1 inline-block">
                        <TransactionImage iconUrl={iconUrl} symbol={symbol} />
                    </div>
                    <BodyLarge>You are about to send</BodyLarge>
                    <div className="text-lg flex justify-center gap-6">
                        <BodyLarge isSemibold>
                            {formatted} {name}
                        </BodyLarge>
                        <BodyLarge
                            isSemibold
                            className="text-[#74777C] text-xl"
                        >
                            ≈ {dollars}
                        </BodyLarge>
                    </div>
                </div>
                <From />
                <CardRow title="To" value={to} />
                <CardRow title="Amount" value={dollars} />
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default TransactionCard;
