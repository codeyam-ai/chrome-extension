import { SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';

import CardRow from './CardRow';
import { useDependencies } from '_shared/utils/dependenciesContext';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';

const Total = ({ analysis }: { analysis: AnalyzeChangesResult }) => {
    const bnTotalFee = new BigNumber(analysis.totalFee);
    const [formatted, symbol, dollars] = useFormatCoin(
        bnTotalFee.abs().toString(),
        SUI_TYPE_ARG
    );

    const { featureFlags } = useDependencies();

    return (
        <CardRow
            style={{
                padding: '24px 12px',
            }}
        >
            <BodyLarge isSemibold>
                Total
                {bnTotalFee.lt(0) && ' (Gain)'}
            </BodyLarge>

            {featureFlags.showUsd ? (
                <div className="text-right flex flex-col gap-1">
                    <BodyLarge
                        isSemibold
                        className={`text-size-ethos-subheader ${
                            bnTotalFee.lt(0) ? 'text-green-700' : ''
                        }`}
                    >
                        {formatted} {symbol}
                    </BodyLarge>
                    <Body className="text-[#74777C]">{dollars} USD</Body>
                </div>
            ) : (
                <div className="text-right flex flex-col gap-1">
                    <BodyLarge
                        isSemibold
                        className={`text-size-ethos-subheader ${
                            bnTotalFee.lt(0) ? 'text-green-700' : ''
                        }`}
                    >
                        {formatted} {symbol}
                    </BodyLarge>
                </div>
            )}
        </CardRow>
    );
};

export default Total;
