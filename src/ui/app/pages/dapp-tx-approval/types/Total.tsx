import { SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';

import CardRow from './CardRow';
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

    return (
        <CardRow style={{ backgroundColor: '#F0EBFE', padding: '24px 12px' }}>
            <BodyLarge isSemibold>
                Total
                {bnTotalFee.lt(0) && ' (Gain)'}
            </BodyLarge>
            <div className="text-right flex flex-col gap-1">
                <BodyLarge
                    isSemibold
                    className={`text-size-ethos-subheader ${
                        bnTotalFee.lt(0) ? 'text-green-700' : ''
                    }`}
                >
                    {dollars} USD
                </BodyLarge>
                <Body className="text-[#74777C]">
                    {formatted} {symbol}
                </Body>
            </div>
        </CardRow>
    );
};

export default Total;
