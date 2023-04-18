import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { MoveCallTransactionInfo } from '../../helpers/transactions/moveCallTransactionAnalysis';

const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s
        .split('_')
        .map((s1) => s1.charAt(0).toUpperCase() + s1.slice(1))
        .join(' ');
};

const MoveCallsSummary = ({
    moveCallTransactionInfo,
}: {
    moveCallTransactionInfo: MoveCallTransactionInfo;
}) => {
    const { moduleName, functionName } = moveCallTransactionInfo;

    return (
        <div className="flex flex-col items-start justify-between">
            <BodyLarge isSemibold>{capitalize(moduleName)}</BodyLarge>
            <Body isTextColorMedium>{capitalize(functionName)}</Body>
        </div>
    );
};

export default MoveCallsSummary;
