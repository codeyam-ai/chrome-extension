import {
    ArrowDownTrayIcon,
    ExclaimationTriangleIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

import { formatDate } from '_helpers';
import { useMiddleEllipsis } from '_src/ui/app/hooks';
import type { TxResultState } from '_src/ui/app/redux/slices/txresults';
import { ActivityRow } from './ActivityRow';

interface TransactionRowProps {
    txn: any; // TODO: Update when NFT events are complete
}

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const drilldownLink = `/receipt?${new URLSearchParams({
        txdigest: txn.txId,
    }).toString()}`;

    const toAddrStr = useMiddleEllipsis(
        txn.to || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );
    const fromAddrStr = useMiddleEllipsis(
        txn.from || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const displayAction = txn.kind !== 'Call' && txn.isSender ? 'To' : 'From';

    const displayAddress =
        txn.kind !== 'Call' && txn.isSender ? toAddrStr : fromAddrStr;

    const iconClasses =
        'h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium';

    //TODO update the logic to account for other transfer type
    let TxIcon: JSX.Element;

    if (txn.status === 'failure') {
        TxIcon = <ExclaimationTriangleIcon className={iconClasses} />;
    } else if (txn.isSender) {
        TxIcon = <PaperAirplaneIcon className={iconClasses} />;
    } else {
        TxIcon = <ArrowDownTrayIcon className={iconClasses} />;
    }

    const date = txn?.timestampMs
        ? formatDate(txn.timestampMs, [
              'weekday',
              'month',
              'day',
              // 'hour',
              // 'minute',
          ])
        : false;

    return (
        <ActivityRow
            icon={TxIcon}
            link={drilldownLink}
            header={txn.kind + ' ' + date || ''}
            subheader={displayAction + ' ' + displayAddress}
            txAmount={txn.amount}
            coinType={txn.coinType}
            amountSubtext={'SUI'}
        />
    );
};

export default TransactionRow;
