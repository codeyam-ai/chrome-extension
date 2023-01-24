import {
    CodeBracketSquareIcon,
    PencilSquareIcon,
    ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import {
    FireIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';

import { Coin } from '../../../redux/slices/sui-objects/Coin';
import SuiIcon from '../../svg/SuiIcon';
import { ActivityRow } from './ActivityRow';
import { formatDate } from '_helpers';
import { useMiddleEllipsis } from '_src/ui/app/hooks';
import UnknownToken from '_src/ui/app/pages/home/tokens/UnknownToken';
import { api } from '_src/ui/app/redux/store/thunk-extras';

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
    const [header, setHeader] = useState('');

    useMemo(async () => {
        if (txn?.txId) {
            const provider = api.instance.fullNode;

            const txTest = await provider.getTransactionWithEffects(txn.txId);

            const objId = txTest?.effects?.created?.[0]?.reference.objectId;
            if (!objId) return;

            const obj = await provider.getObject(objId);
            if (
                !obj ||
                typeof obj.details === 'string' ||
                !('data' in obj.details) ||
                !('type' in obj.details.data)
            )
                return;

            const SymbolObjName = await Coin.getCoinSymbol(
                obj.details.data.type
            ).replace(/[<>]/g, '');

            if (SymbolObjName) {
                setHeader(SymbolObjName);
            }
        }
    }, [txn.txId]);

    const getIsNft = () => {
        return txn?.callFunctionName === 'transfer' || txn?.objectId?.length
            ? true
            : false;
    };

    const getIsSui = () => {
        return !getIsNft() && txn?.kind === 'PaySui' ? true : false;
    };

    const getIsFunc = () => {
        return txn?.callFunctionName && txn?.callFunctionName !== 'mint'
            ? true
            : false;
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

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn?.txId,
        symbol: header,
        isFunc: getIsFunc() ? 'yes' : 'no',
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

    const FunctionIcon = () => (
        <IconContainer>
            <CodeBracketSquareIcon width={20} height={20} color={'white'} />
        </IconContainer>
    );

    const CurrencyIcon = () => (
        <>
            {getIsSui() ? (
                <IconContainer>
                    <SuiIcon width={14} height={20} color={'white'} />
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
        function: {
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
                header: txn?.name,
            },
            Receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: (
                    <NftImg src={txn.url || ''} alt={txn.description || ''} />
                ),
                header: txn?.name,
            },
            Mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: (
                    <NftImg src={txn.url || ''} alt={txn.description || ''} />
                ),
                header: txn?.name,
            },
            register: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={
                            txn?.url?.replace(
                                /^ipfs:\/\//,
                                'https://ipfs.io/ipfs/'
                            ) || ''
                        }
                        alt={txn.description || ''}
                    />
                ),
                header: header || 'Sui Action',
            },
        },
        sui: {
            Send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: header,
            },
            Receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: header,
            },
            Mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: header,
            },
        },
        coin: {
            Send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: header,
            },
            Receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: header,
            },
            Mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: header,
            },
        },
        function: {
            modify: {
                ...shared,
                typeIcon: <PencilSquareIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: header || 'Sui Action',
            },
            burn: {
                ...shared,
                typeIcon: <FireIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: header || 'Sui Action',
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: header || 'Sui Action',
            },
            default: {
                ...shared,
                typeIcon: <SuiIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: header || 'Sui Action',
            },
        },
    };

    let rowData;

    if (!type) return <></>;

    if (getIsNft()) {
        rowData = dataMap.nft[type];
    } else if (getIsSui()) {
        rowData = dataMap.sui[type];
    } else if (getIsFunc()) {
        rowData = dataMap.function[type || 'default'];
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
