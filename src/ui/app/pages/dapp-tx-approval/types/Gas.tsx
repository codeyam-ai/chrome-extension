import { SUI_TYPE_ARG } from '@mysten/sui.js';

import CardRow from './CardRow';
import { useFormatCoin } from '_src/ui/app/hooks';

import type { GasCostSummary } from '../lib/analyzeChanges';

const Gas = ({ gasSummary }: { gasSummary: GasCostSummary }) => {
    const [, , dollars] = useFormatCoin(gasSummary.total, SUI_TYPE_ARG);

    return <CardRow title="Gas Fee" value={dollars} />;
};

export default Gas;
