import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import ActionIcon from '../../transactions/ActionIcon';
import ValueAndGas from '../../transactions/ValueAndGas';
import Body from '../../typography/Body';
import capitalize from '_src/ui/app/helpers/capitalize';
import { getIcon } from '_src/ui/app/helpers/transactions';
import getSummary from '_src/ui/app/helpers/transactions/getSummary';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

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
                <div className="flex gap-1 items-center">
                    <Body isTextColorMedium>
                        {!!action && getIcon(action, 18)}
                    </Body>
                    <Body isTextColorMedium>{capitalize(action)}</Body>
                </div>
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
