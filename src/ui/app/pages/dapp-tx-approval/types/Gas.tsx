import { SUI_TYPE_ARG } from '@mysten/sui.js';

import CardRow from './CardRow';
import { useFormatCoin } from '_src/ui/app/hooks';

import type { GasCostSummary } from '../lib/analyzeChanges';
import Body from '_src/ui/app/shared/typography/Body';

const Gas = ({ gasSummary }: { gasSummary: GasCostSummary }) => {
    const [formatted, symbol, dollars] = useFormatCoin(
        gasSummary.total,
        SUI_TYPE_ARG
    );

    return (
        <CardRow>
            <Body>Gas Fee</Body>
            <div className="text-right">
                <div className="flex items-center gap-1 text-base">
                    <div className="font-light">USD</div>
                    <div>{dollars}</div>
                </div>
                <div className="text-xs text-[#74777C]">
                    {formatted} {symbol}
                </div>
            </div>
        </CardRow>
    );
};

export default Gas;
