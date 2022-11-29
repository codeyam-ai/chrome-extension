import {
    ArrowDownTrayIcon,
    ExclamationTriangleIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import { formatDate } from '_helpers';
import { useFormatCoin, useMiddleEllipsis } from '_src/ui/app/hooks';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface TransactionRowProps {
    txn: TxResultState;
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
        TxIcon = <ExclamationTriangleIcon className={iconClasses} />;
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

    const [formattedAmount] = useFormatCoin(
        txn.amount,
        txn.coinType || '0x2::sui::SUI'
    );

    return (
        <Link
            to={drilldownLink}
            className="flex flex-row items-center gap-2 py-2"
        >
            {TxIcon}
            <span className="flex flex-col text-left">
                <BodyLarge>
                    {txn.kind} {date || ''}
                </BodyLarge>
                <Body isTextColorMedium>
                    {displayAction} {displayAddress}
                </Body>
            </span>
            <span className="flex-1">
                {txn.amount && (
                    <BodyLarge className="float-right text-right">
                        {formattedAmount} SUI
                    </BodyLarge>
                )}
            </span>
        </Link>
    );
};

export default TransactionRow;
