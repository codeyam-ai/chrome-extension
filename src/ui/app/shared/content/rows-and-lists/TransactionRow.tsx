import {
    ArrowUpIcon,
    ArrowDownIcon,
    SparklesIcon,
    CodeSquareIcon,
    ArrowsUpDownIcon,
} from '@heroicons/react/24/solid';

import SuiIcon from '../../svg/SuiIcon';
import { ActivityRow } from './ActivityRow';
import { formatDate } from '_helpers';
import truncateString from '_src/ui/app/helpers/truncate-string';
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
        return txn?.objectId;
    };

    const getIsSui = () => {
        return !getIsNft() && txn?.kind === 'PaySui';
    };

    const getIsFunc = () => {
        return txn?.callFunctionName && txn?.callFunctionName !== 'mint';
    };

    const getIsObj = () => {
        return '';
    };

    const getTransactionType = () => {
        let type = undefined;

        if (txn?.callFunctionName === 'mint' || txn?.type === 'Mint') {
            type = 'Mint';
        } else if (txn?.isSender && !txn?.callFunctionName) {
            type = 'Send';
        } else if (!txn?.isSender && !txn?.callFunctionName) {
            type = 'Receive';
        } else if (txn?.kind === 'TransferObject') {
            type = 'Transfer';
        } else if (txn?.callFunctionName) {
            type = txn?.callFunctionName;
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
        hasAmount: (txn.amount && txn.amount > 0) || false,
        amount: txn?.amount || undefined,
        coinType: txn?.coinType || '',
        type: type || '',
        txDirText:
            type === 'send' ? `To ${toAddrStr}` : `From ${fromAddrStr}` || '',
        link: drilldownLink,
        date: txn?.timestampMs
            ? formatDate(txn.timestampMs, ['weekday', 'month', 'day'])
            : '',
    };

    const IconContainer = ({ children }: { children: JSX.Element }) => (
        <div
            className={
                'flex w-[40px] h-[40px] justify-center items-center bg-[#3D5FF2] rounded-full'
            }
        >
            {children}
        </div>
    );

    const FunctionIcon = ({ ...props }) => (
        <IconContainer>
            <CodeSquareIcon width={15} height={15} fill={'white'} {...props} />
        </IconContainer>
    );

    const CurrencyIcon = () => (
        <>
            {getIsSui() ? (
                <IconContainer>
                    <SuiIcon width={15} height={15} color={'white'} />
                </IconContainer>
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
        object: {
            [key: string]: RowDataTypes;
        };
        function: RowDataTypes;
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
        object: {
            transfer: {
                ...shared,
                typeIcon: <ArrowsUpDownIcon {...iconProps} />,
                icon: <FunctionIcon {...iconProps} />,
                header:
                    txn?.name ||
                    (txn.description && truncateString(txn.description, 10)) ||
                    'Transfer Object',
            },
        },
        function: {
            ...shared,
            typeIcon: <SuiIcon width={18} height={18} color={'#9Ca3af'} />,
            icon: <FunctionIcon {...iconProps} />,
            header: txn?.name || 'Sui Action',
        },
    };

    let rowData;

    if (!type) return <></>;

    if (getIsNft()) {
        rowData = dataMap.nft[type];
    } else if (getIsSui()) {
        rowData = dataMap.sui[type];
    } else if (getIsFunc()) {
        rowData = dataMap.function;
    } else {
        rowData = dataMap.coin[type];
    }

    if (!rowData) return <></>;

    console.log('TYPE: ', type);
    console.log('Transaction Data: ', txn);

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
