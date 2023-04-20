import Body from '../typography/Body';

import type { BasicTransactionInfo } from '../../helpers/transactions/basicTransactionAnalysis';

const translateCommand = (command: string) => {
    switch (command) {
        case 'TransferObjects':
            return 'Asset Transfer';
        case 'MoveCall':
            return 'Contract Call';
        default:
            return command;
    }
};

const translateKind = (kind: string) => {
    switch (kind) {
        case 'ProgrammableTransaction':
            return 'Sui Transaction';
        default:
            return kind;
    }
};

const BasicSummary = ({
    basicTransactionInfo,
    timeDisplay,
    small,
}: {
    basicTransactionInfo: BasicTransactionInfo;
    timeDisplay: string;
    small?: boolean;
}) => {
    return (
        <div className="w-full flex justify-between items-center">
            <Body className={small ? `!text-xs` : ''}>
                {basicTransactionInfo.commands
                    ? `${basicTransactionInfo.commands
                          .map((c) => translateCommand(c))
                          .join(', ')}`
                    : translateKind(basicTransactionInfo.type)}
            </Body>
            <Body isTextColorMedium>{timeDisplay}</Body>
        </div>
    );
};

export default BasicSummary;
