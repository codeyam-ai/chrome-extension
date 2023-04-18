import Body from 'src/components/typography/body/Body';
import { MoveCallTransactionInfo } from 'src/lib/transactions/moveCallTransactionAnalysis';

const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s
        .split('_')
        .map((s1) => s1.charAt(0).toUpperCase() + s1.slice(1))
        .join(' ');
};

const MoveCallsSummary = ({
    moveCallTransactionInfo,
    small,
}: {
    moveCallTransactionInfo: MoveCallTransactionInfo;
    small?: boolean;
}) => {
    const { moduleName, functionName } = moveCallTransactionInfo;

    return (
        <Body className={small ? `!text-xs` : ''}>
            {capitalize(moduleName)}: {capitalize(functionName)}
        </Body>
    );
};

export default MoveCallsSummary;
