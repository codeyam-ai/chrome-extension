import capitalize from '../../helpers/capitalize';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { MoveCallTransactionInfo } from '../../helpers/transactions/moveCallTransactionAnalysis';

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
