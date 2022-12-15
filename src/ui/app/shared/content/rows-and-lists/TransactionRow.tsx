import {
    ArrowUpIcon,
    ArrowDownIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';

import SuiIcon from '../../svg/SuiIcon';
import { ActivityRow } from './ActivityRow';
import { formatDate } from '_helpers';
import { useMiddleEllipsis } from '_src/ui/app/hooks';
import UnknownToken from '_src/ui/app/pages/home/tokens/UnknownToken';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface TransactionRowProps {
    txn: TxResultState;
}

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

interface SharedTypes {
    txFailed: boolean;
    hasAmount: boolean;
    amount?: number;
    coinType: string;
    type: string;
    txDirText: string;
    link: string;
    date: string;
}

interface RowDataTypes extends SharedTypes {
    header?: string;
    typeIcon: JSX.Element;
    icon: JSX.Element;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const getIsNft = () => {
        if (txn?.objectId) {
            return true;
        } else {
            return false;
        }
    };

    const getIsSui = () => {
        if (!getIsNft() && txn?.kind === 'PaySui') {
            return true;
        } else {
            return false;
        }
    };

    const getTransactionType = () => {
        let type = undefined;

        if (txn.callFunctionName === 'mint' || txn.type === 'Mint') {
            type = 'Mint';
        } else if (txn.isSender) {
            type = 'Send';
        } else {
            type = 'Receive';
        }

        return type;
    };

    const type = getTransactionType();

    const drilldownLink = `/receipt?${new URLSearchParams({
        txdigest: txn?.txId,
    }).toString()}`;

    const toAddrStr = useMiddleEllipsis(
        txn?.to || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );
    const fromAddrStr = useMiddleEllipsis(
        txn?.from || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const shared: SharedTypes = {
        txFailed: txn?.status === 'failure',
        hasAmount: !getIsNft(),
        amount: txn?.amount || undefined,
        coinType: txn?.coinType || '',
        type: type,
        txDirText:
            type === 'send' ? `To ${toAddrStr}` : `From ${fromAddrStr}` || '',
        link: drilldownLink,
        date: txn?.timestampMs
            ? formatDate(txn.timestampMs, ['weekday', 'month', 'day'])
            : '',
    };

    const CurrencyIcon = () => (
        <>
            {getIsSui() ? (
                <div
                    className={
                        'flex w-[40px] h-[40px] justify-center items-center bg-[#3D5FF2] rounded-full'
                    }
                >
                    <SuiIcon width={15} height={15} />
                </div>
            ) : (
                <UnknownToken width={40} height={40} />
            )}
        </>
    );

    const NftImg = ({ src, alt }: { src: string; alt: string }) => (
        <img className={'w-[40px] h-[40px] rounded-lg'} src={src} alt={alt} />
    );

    const iconProps = { color: '#74777C', width: 18, height: 18 };

    const dataMap: {
        nft: {
            [key: string]: RowDataTypes;
        };
        sui: {
            [key: string]: RowDataTypes;
        };
        coin: {
            [key: string]: RowDataTypes;
        };
    } = {
        nft: {
            Send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: (
                    <NftImg src={txn.url || ''} alt={txn.description || ''} />
                ),
                header: txn.name,
            },
            Receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: (
                    <NftImg src={txn.url || ''} alt={txn.description || ''} />
                ),
                header: txn.name,
            },
            Mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: (
                    <NftImg src={txn.url || ''} alt={txn.description || ''} />
                ),
                header: txn.name,
            },
        },
        sui: {
            Send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: 'SUI',
            },
            Receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: 'SUI',
            },
            Mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: 'Coin',
            },
        },
        coin: {
            Send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: 'Coin',
            },
            Receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: 'Coin',
            },
            Mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: 'Coin',
            },
        },
    };

    let rowData;

    if (getIsNft()) {
        rowData = dataMap.nft[type];
    } else if (getIsSui()) {
        rowData = dataMap.sui[type];
    } else {
        rowData = dataMap.coin[type];
    }

    if (!rowData) return <></>;

    return (
        <ActivityRow
            failed={rowData.txFailed}
            typeIcon={rowData.typeIcon}
            type={rowData.type}
            date={rowData.date}
            icon={rowData.icon}
            link={rowData.link}
            header={rowData.header}
            subheader={rowData.txDirText}
            txAmount={rowData.amount}
            coinType={rowData.coinType}
        />
    );
};

export default TransactionRow;
