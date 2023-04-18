import { ArrowUpRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import { getHumanReadable } from '../../helpers/transactions';
import ActionIcon from '../../shared/transactions/ActionIcon';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';

const commandIcon = (command: string) => {
    switch (command) {
        case 'TransferObjects':
            return <ArrowUpRightIcon />;
        default:
            return <CheckCircleIcon />;
    }
};

const ReceiptHeader = (analyzedTransaction: AnalyzedTransaction) => {
    const humanReadable = getHumanReadable(analyzedTransaction);
    const { important } = analyzedTransaction;

    const { timeDisplay } = humanReadable;
    const commands = important.basic?.commands;

    let title = 'Transaction';
    if (important.sending) {
        title = important.sending[0].isSender
            ? 'Sending Transaction'
            : 'Receiving Transaction';
    } else if (important.faucet) {
        title = 'Faucet Request';
    } else if (important?.staking) {
        title = 'Staking SUI';
    } else if (important.moveCalls) {
        title = 'Function Call';
    }

    return (
        <div className="flex flex-col gap-3 items-center">
            {commands && (
                <>
                    {commands.map((command, index) => (
                        <ActionIcon key={`command-icon-${index}`}>
                            {commandIcon(command)}
                        </ActionIcon>
                    ))}
                    <Body isTextColorMedium>{commands.join(', ')}</Body>
                </>
            )}
            <BodyLarge isSemibold>{title}</BodyLarge>
            <Body isTextColorMedium>{timeDisplay}</Body>
        </div>
    );
};

export default ReceiptHeader;
