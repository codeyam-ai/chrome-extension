import { Coin } from '@mysten/sui.js/dist/cjs/framework/framework';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { useMemo } from 'react';

import { Costs, Gains } from './Amount';
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
    const simpleType = useMemo(
        () =>
            /*
                From data that looks like:
                0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0x1cbfdf7de5004f887705fa53bb345d4372e5004bd8b04a6f8868f5e1ca1af9c7::ethos_example_coin::ETHOS_EXAMPLE_COIN>
                extract ETHOS_EXAMPLE_COIN
            */
            primaryType
                .substring(primaryType.indexOf('<'), primaryType.indexOf('>'))
                .split('::')[2],
        [primaryType]
    );

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
        return 'mint';
    }, [analysis.moveCalls]);

    return (
        <TransactionBody>
            <div className="w-full rounded-xl bg-ethos-light-gray dark:bg-ethos-dark-background-secondary flex flex-col divide-y divide-ethos-light-purple dark:divide-ethos-dark-text-stroke overflow-hidden">
                <div className="p-6 flex-col justify-center items-center text-center">
                    {coinType && (
                        <div className="inline-block pb-3">
                            <CoinImage coinType={coinType} />
                        </div>
                    )}
                    <BodyLarge>You are about to {action}</BodyLarge>
                    <div className="text-lg flex justify-center gap-6">
                        <BodyLarge isSemibold>{simpleType}</BodyLarge>
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

export default MintTransactionCard;
