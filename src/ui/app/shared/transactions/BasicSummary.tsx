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
    small,
}: {
    basicTransactionInfo: BasicTransactionInfo;
    small?: boolean;
}) => {
    return (
        <Body className={small ? `!text-xs` : ''}>
            {basicTransactionInfo.commands
                ? `${basicTransactionInfo.commands
                      .map((c) => translateCommand(c))
                      .join(', ')}`
                : translateKind(basicTransactionInfo.type)}
        </Body>
    );
};

export default BasicSummary;
