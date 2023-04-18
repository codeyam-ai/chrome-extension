import {
    ArrowsRightLeftIcon,
    CodeBracketSquareIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    FireIcon,
    SparklesIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import { ActivityRow } from './ActivityRow';
import IconContainer from '../../icons/IconContainer';
import SuiIcon from '../../svg/SuiIcon';
import ActionIcon from '../../transactions/ActionIcon';
import Body from '../../typography/Body';
import { getIcon } from '_src/ui/app/helpers/transactions';
import getSummary from '_src/ui/app/helpers/transactions/getSummary';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import UnknownToken from '_src/ui/app/pages/home/home/UnknownToken';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';
import type { ReactNode } from 'react';
import ValueAndGas from '../../transactions/ValueAndGas';

interface TransactionRowProps {
    txn: FormattedTransaction;
}

interface RowDataTypes extends SharedTypes {
    typeIcon: ReactNode;
    icon: ReactNode;
}

interface SharedTypes {
    header: string | null | undefined;
    hasAmount: boolean;
    amount?: number;
    coinType: string;
    action: string;
    txDirText: string;
    link: string;
    date: string;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const { analyzedTransaction, humanReadable } = txn;
    const { timeDisplay, action, image } = humanReadable;

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn.analyzedTransaction.digest || '',
        symbol: 'SUI', // TODO: what to do with coins / multiple coins / batch txs
        isFunc: action === 'func' ? 'yes' : 'no',
    }).toString()}`;

    return (
        <Link to={drilldownLink} className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
                <div></div>
                <Body isTextColorMedium>{timeDisplay}</Body>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    {image ? (
                        typeof image === 'string' ? (
                            <img
                                src={image}
                                alt={`${action} Transaction`}
                                className="h-10 w-10 rounded-md"
                            />
                        ) : (
                            image
                        )
                    ) : (
                        <ActionIcon>
                            {analyzedTransaction.status === 'failure' ||
                            !action ? (
                                <XMarkIcon />
                            ) : (
                                getIcon(action)
                            )}
                        </ActionIcon>
                    )}
                    {getSummary(analyzedTransaction)}
                </div>
                <div>
                    <ValueAndGas {...analyzedTransaction} />
                </div>
            </div>
        </Link>
    );
};

export default TransactionRow;
