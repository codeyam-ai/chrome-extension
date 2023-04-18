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
} from '@heroicons/react/24/solid';

import { ActivityRow } from './ActivityRow';
import IconContainer from '../../icons/IconContainer';
import SuiIcon from '../../svg/SuiIcon';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import UnknownToken from '_src/ui/app/pages/home/home/UnknownToken';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';
import type { ReactNode } from 'react';

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
        <div>
            <div> {timeDisplay} </div>
        </div>
    );
};

export default TransactionRow;
