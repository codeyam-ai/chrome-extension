import BigNumber from 'bignumber.js';

import CardRow from './CardRow';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';

import type { BalanceReduction, BalanceAddition } from '../lib/analyzeChanges';
import { useDependencies } from '_shared/utils/dependenciesContext';

export const Costs = ({
    balanceReductions,
}: {
    balanceReductions: BalanceReduction[];
}) => {
    return (
        <CardRow>
            <Body>Cost{balanceReductions.length > 0 ? 's' : ''}</Body>
            {balanceReductions.length === 0 ? (
                <Body isSemibold>Free</Body>
            ) : (
                <div className="flex flex-col gap-1 items-end">
                    {balanceReductions.map((balanceReduction, index) => (
                        <Amount
                            key={`gain-${index}`}
                            balanceChange={balanceReduction}
                            positive={false}
                        />
                    ))}
                </div>
            )}
        </CardRow>
    );
};

export const Gains = ({
    balanceAdditions,
}: {
    balanceAdditions: BalanceAddition[];
}) => {
    if (balanceAdditions.length === 0) return <></>;

    return (
        <CardRow>
            <Body>Gain{balanceAdditions.length > 0 ? 's' : ''}</Body>
            <div className="flex flex-col gap-1 items-end">
                {balanceAdditions.map((balanceAddition, index) => (
                    <Amount
                        key={`gain-${index}`}
                        balanceChange={balanceAddition}
                        positive={true}
                    />
                ))}
            </div>
        </CardRow>
    );
};

const Amount = ({
    balanceChange,
    positive,
}: {
    balanceChange: BalanceReduction | BalanceAddition;
    positive: boolean;
}) => {
    const bnAmount = new BigNumber(balanceChange.amount);
    const [formatted, symbol, dollars] = useFormatCoin(
        bnAmount.abs().toString(),
        balanceChange.type
    );

    const { featureFlags } = useDependencies();
    return featureFlags.showUsd ? (
        <div className="flex flex-col items-end text-right">
            <div
                className={`flex items-center gap-1 text-base ${
                    positive ? 'text-green-700' : ''
                }`}
            >
                <Body className="font-light">USD</Body>
                <Body isSemibold>{dollars}</Body>
            </div>
            <Body className="text-size-ethos-small text-[#74777C]">
                {formatted} {symbol}
            </Body>
        </div>
    ) : (
        <div className="flex flex-col items-end text-right">
            <div
                className={`flex items-center gap-1 text-base ${
                    positive ? 'text-green-700' : ''
                }`}
            >
                <Body isSemibold>
                    {formatted} {symbol}
                </Body>
            </div>
        </div>
    );
};

export default Amount;
