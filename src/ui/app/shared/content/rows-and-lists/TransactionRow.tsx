import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import ActionIcon from '../../transactions/ActionIcon';
import Body from '../../typography/Body';
import getSummary from '_src/ui/app/helpers/transactions/getSummary';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';
import { getIcon } from '_src/ui/app/helpers/transactions';

interface TransactionRowProps {
    txn: FormattedTransaction;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const { analyzedTransaction, humanReadable } = txn;
    const { timeDisplay, action, image } = humanReadable;

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn.analyzedTransaction.digest || '',
        symbol: 'SUI', // TODO: what to do with coins / multiple coins / batch txs
        isFunc: action === 'function' ? 'yes' : 'no',
    }).toString()}`;

    return (
        <Link to={drilldownLink} className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
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
                    ) : analyzedTransaction.status === 'failure' || !action ? (
                        <ExclamationTriangleIcon className="flex items-center h-10 w-10 rounded-full p-3 text-white bg-ethos-light-red dark:bg-ethos-dark-red" />
                    ) : (
                        <ActionIcon>{getIcon(action)}</ActionIcon>
                    )}
                    {getSummary(analyzedTransaction)}
                </div>
            </div>
        </Link>
    );
};

export default TransactionRow;
