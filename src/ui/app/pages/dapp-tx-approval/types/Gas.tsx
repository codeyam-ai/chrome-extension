import { SUI_TYPE_ARG } from '@mysten/sui.js';

import CardRow from './CardRow';
import { useDependencies } from '_shared/utils/dependenciesContext';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';

import type { GasCostSummary } from '../lib/analyzeChanges';

const Gas = ({ gasSummary }: { gasSummary: GasCostSummary }) => {
    const [formatted, symbol, dollars] = useFormatCoin(
        gasSummary.total,
        SUI_TYPE_ARG
    );

    const { featureFlags } = useDependencies();

    return (
        <CardRow>
            <Body>Gas Fee</Body>
            {featureFlags.showUsd ? (
                <div className="flex flex-col items-end text-right">
                    <div className="flex items-center gap-1 text-base">
                        <Body isSemibold>
                            {formatted} {symbol}
                        </Body>
                    </div>
                    <Body className="text-size-ethos-small text-[#74777C]">
                        {dollars} USD
                    </Body>
                </div>
            ) : (
                <div className="flex flex-col items-end text-right">
                    <div className="flex items-center gap-1 text-base">
                        <Body isSemibold>
                            {formatted} {symbol}
                        </Body>
                    </div>
                </div>
            )}
        </CardRow>
    );
};

export default Gas;
