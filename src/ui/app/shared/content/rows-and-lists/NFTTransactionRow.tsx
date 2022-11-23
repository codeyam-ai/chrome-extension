import { formatDate } from '_helpers';
import { useMiddleEllipsis } from '_src/ui/app/hooks';
import { ActivityRow } from './ActivityRow';

import SentIcon from '../../svg/SentIcon';
import ListedIcon from '../../svg/ListedIcon';
import SoldIcon from '../../svg/SoldIcon';

interface NFTTransactionRowProps {
    txn: any;
}

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

const Header = ({ bolded, regular }: { bolded: string; regular: string }) => (
    <div>
        <span className={'font-semibold'}>{bolded}</span> {regular}
    </div>
);

const NFTTransactionRow = ({ txn }: NFTTransactionRowProps) => {
    const drilldownLink = `/receipt?${new URLSearchParams({
        txdigest: txn.txId,
    }).toString()}`;

    const toAddrStr = useMiddleEllipsis(
        txn.toAddr || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const fromAddrStr = useMiddleEllipsis(
        txn.fromAddr || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    let TxIcon: JSX.Element;
    let head: JSX.Element;
    let subheader = '';

    const date = txn?.timestampMs
        ? formatDate(txn.timestampMs, [
              'weekday',
              'month',
              'day',
              // 'hour',
              // 'minute',
          ])
        : false;

    switch (txn.txType) {
        case 'Sold':
            TxIcon = <SoldIcon />;
            head = <Header bolded={'listed by '} regular={toAddrStr} />;
            subheader = 'On ' + txn.vendor + '-' + date;
            break;
        case 'Listed':
            TxIcon = <ListedIcon />;
            head = <Header bolded={'listed by '} regular={toAddrStr} />;
            subheader = 'On ' + txn.vendor + '-' + date;
            break;
        case 'Sent':
            TxIcon = <SentIcon />;
            head = <Header bolded={'listed by '} regular={toAddrStr} />;
            subheader = 'On ' + txn.vendor + '-' + date;
            break;
        default:
            return <div></div>;
    }

    if (!txn) return <div></div>;

    return (
        <div>
            <ActivityRow
                icon={TxIcon}
                link={drilldownLink}
                header={head}
                subheader={subheader}
                txAmount={txn.txAmount}
                coinType={txn.coinType}
                amountSubtext={'SUI'}
            />
        </div>
    );
};

export default NFTTransactionRow;
