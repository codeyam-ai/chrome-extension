import CardRow from './CardRow';
import From from './From';
import TransactionBody from './TransactionBody';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './SimpleCoinTransfer';
import Gas from './Gas';

const TransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const {
        name,
        formatted,
        formattedRemainder,
        iconUrl,
        symbol,
        dollars,
        to,
        gas,
    } = stepInformation;

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-[#F8F5FF] flex flex-col divide-y divide-ethos-dark-text-medium">
                <div className="p-6 flex-col items-center text-center">
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
                <Gas gasSummary={gas} />
            </div>
        </TransactionBody>
    );
};

export default TransactionCard;
