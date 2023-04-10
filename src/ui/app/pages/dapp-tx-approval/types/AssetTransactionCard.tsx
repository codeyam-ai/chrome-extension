import CardRow from './CardRow';
import From from './From';
import Gas from './Gas';
import SendAssetImage from './SendAssetImage';
import Total from './Total';
import TransactionBody from './TransactionBody';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './SimpleAssetTransfer';

const AssetTransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const { name, imageUrl, to, analysis } = stepInformation;

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-ethos-light-gray dark:bg-ethos-dark-background-secondary flex flex-col divide-y divide-color-ethos-light-purple overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    <div className="pb-1 inline-block">
                        <SendAssetImage imageUrl={imageUrl} name={name} />
                    </div>
                    <BodyLarge>You are about to send</BodyLarge>
                    <div className="text-lg flex justify-center gap-6">
                        <BodyLarge isSemibold>{name}</BodyLarge>
                    </div>
                </div>
                <From />
                <CardRow title="To" value={to} />
                {/* <Amount amount={analysis.rawAmount} coinType={SUI_TYPE_ARG} /> */}
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default AssetTransactionCard;
