import { Coin, SUI_TYPE_ARG } from '@mysten/sui.js';
import { useMemo } from 'react';

import { Costs } from './Amount';
import Gas from './Gas';
import Total from './Total';
import TransactionBody from './TransactionBody';
import { useFormatCoin } from '_src/ui/app/hooks';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { StepInformation } from './SimpleAssetMint';

const CoinImage = ({ coinType }: { coinType: string }) => {
    const [, symbol, , , iconUrl] = useFormatCoin(0, coinType);

    if (!iconUrl) return <></>;

    return <img src={iconUrl} alt={`coin-${symbol}`} height={60} width={60} />;
};

const MintTransactionCard = ({
    stepInformation,
}: {
    stepInformation: StepInformation;
}) => {
    const { type, analysis } = stepInformation;
    const coinType = useMemo(
        () => Coin.getCoinType(type ?? SUI_TYPE_ARG),
        [type]
    );
    const primaryType = useMemo(
        () => coinType ?? type ?? SUI_TYPE_ARG,
        [coinType, type]
    );
    const simpleType = useMemo(() => primaryType.split('::')[2], [primaryType]);

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-[#F8F5FF] flex flex-col divide-y divide-color-ethos-light-purple overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    {coinType && (
                        <div className="inline-block pb-3">
                            <CoinImage coinType={coinType} />
                        </div>
                    )}
                    <BodyLarge>You are about to mint</BodyLarge>
                    <div className="text-lg flex justify-center gap-6">
                        <BodyLarge isSemibold>{simpleType}</BodyLarge>
                    </div>
                </div>
                <Costs balanceReductions={analysis.balanceReductions} />
                <Gas gasSummary={analysis.gas} />
                <Total analysis={analysis} />
            </div>
        </TransactionBody>
    );
};

export default MintTransactionCard;
