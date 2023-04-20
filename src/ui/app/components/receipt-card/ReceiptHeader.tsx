import {
    ArrowDownOnSquareStackIcon,
    ArrowUpRightIcon,
    CheckCircleIcon,
    Square3Stack3DIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';

import { getHumanReadable } from '../../helpers/transactions';
import ActionIcon from '../../shared/transactions/ActionIcon';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const commandIcon = (command: string) => {
    switch (command) {
        case 'TransferObjects':
            return <ArrowUpRightIcon />;
        case 'Faucet':
            return <ArrowDownOnSquareStackIcon />;
        case 'Staking':
            return <Square3Stack3DIcon />;
        default:
            return <CheckCircleIcon />;
    }
};

const ReceiptHeader = (analyzedTransaction: AnalyzedTransaction) => {
    const humanReadable = getHumanReadable(analyzedTransaction);
    const { important, status } = analyzedTransaction;
    const { timeDisplay } = humanReadable;

    let commands = important.basic?.commands;

    let title = 'Transaction';
    if (important.faucet) {
        commands = ['Faucet', ...(commands || [])];
        title = 'Faucet Request';
    } else if (important?.staking && status === 'failure') {
        commands = ['Staking', ...(commands || [])];
        title = 'Failed Staking';
    } else if (important?.staking) {
        commands = ['Staking', ...(commands || [])];
        title = 'Staking SUI';
    } else if (important.sending) {
        title = important.sending[0].isSender
            ? 'Sending Transaction'
            : 'Receiving Transaction';
    } else if (important.moveCalls) {
        title = 'Function Call';
    }

    return (
        <div className="flex flex-col gap-3 items-center">
            {status === 'failure' ? (
                <ExclamationTriangleIcon className="flex items-center h-10 w-10 rounded-full p-3 text-white bg-ethos-light-red dark:bg-ethos-dark-red" />
            ) : (
                commands && (
                    <>
                        <div className="flex items-center">
                            {commands.map((command, index) => (
                                <ActionIcon
                                    key={`command-icon-${index}`}
                                    className="border-2 border-white !h-12 !w-12"
                                    style={{ marginLeft: `${index * -6}px` }}
                                >
                                    {commandIcon(command)}
                                </ActionIcon>
                            ))}
                        </div>
                        <Body isTextColorMedium>{commands.join(', ')}</Body>
                    </>
                )
            )}
            <BodyLarge isSemibold>{title}</BodyLarge>
            <Body isTextColorMedium>{timeDisplay}</Body>
        </div>
    );
};

export default ReceiptHeader;
