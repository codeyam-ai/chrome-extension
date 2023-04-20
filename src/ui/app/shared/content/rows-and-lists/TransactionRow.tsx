import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import ActionIcon from '../../transactions/ActionIcon';
import { getIcon } from '_src/ui/app/helpers/transactions';
import getSummary from '_src/ui/app/helpers/transactions/getSummary';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

interface TransactionRowProps {
    txn: FormattedTransaction;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const { data: validators } = useValidatorsWithApy();
    const { analyzedTransaction, humanReadable } = txn;
    const { timeDisplay, action, image } = humanReadable;
    const validator =
        validators?.[
            analyzedTransaction.important.staking?.[0].validatorAddress ?? ''
        ];
    const isStaking = analyzedTransaction.important.staking;

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn.analyzedTransaction.digest || '',
        symbol: 'SUI', // TODO: what to do with coins / multiple coins / batch txs
        isFunc: action === 'function' ? 'yes' : 'no',
    }).toString()}`;
    return (
        <Link
            to={drilldownLink}
            className="flex flex-col gap-2 px-6 py-4 hover:bg-ethos-light-background-light-grey hover:dark:bg-ethos-dark-background-secondary"
        >
            <div className="flex justify-between items-center">
                <div className="w-full flex gap-3 items-center">
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
                    ) : isStaking ? (
                        <div>
                            {validator && validator.imageUrl ? (
                                <div className="h-10 w-10 rounded-full">
                                    <img
                                        src={validator.imageUrl}
                                        alt={validator.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                            )}
                        </div>
                    ) : (
                        <ActionIcon>{getIcon(action)}</ActionIcon>
                    )}
                    {getSummary(analyzedTransaction, timeDisplay ?? '')}
                </div>
            </div>
        </Link>
    );
};

export default TransactionRow;
