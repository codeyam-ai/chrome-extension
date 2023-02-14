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
import { useMemo, useState } from 'react';

import { ActivityRow } from './ActivityRow';
import { Coin } from '../../../redux/slices/sui-objects/Coin';
import SuiIcon from '../../svg/SuiIcon';
import { formatDate } from '_helpers';
import ipfs from '_src/ui/app/helpers/ipfs';
import { useFormatCoin, useMiddleEllipsis } from '_src/ui/app/hooks';
import UnknownToken from '_src/ui/app/pages/home/tokens/UnknownToken';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';
import { getHumanReadable } from '_src/ui/app/helpers/transactions';
import type { FormattedCoin } from '_src/ui/app/pages/home/transactions/FormattedCoin';
import type { txnType } from '_src/ui/app/pages/home/transactions';
import { toNamespacedPath } from 'path';

interface TransactionRowProps {
    txn: txnType;
}

interface RowDataTypes extends SharedTypes {
    header?: string;
    typeIcon: JSX.Element;
    icon: JSX.Element;
}

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

interface SharedTypes {
    hasAmount: boolean;
    amount?: number;
    coinType: string;
    type: string;
    txDirText: string;
    link: string;
    date: string;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const {
        txType,
        txAction,
        nftImageUri,
        otherAddress,
        otherAddressStr,
        preposition,
        subject,
        timeDisplay,
        verb,
    } = getHumanReadable(txn);

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn?.txId,
        symbol: 'SUI',
        isFunc: txType === 'func' ? 'yes' : 'no',
    }).toString()}`;

    const shared: SharedTypes = {
        hasAmount: (txn.amount && txn.amount > 0) || false,
        amount: txn?.amount || undefined,
        coinType: txn?.coinType || '',
        type: txAction || '',
        txDirText:
            txAction === 'send'
                ? `To ${otherAddressStr}`
                : `From ${otherAddressStr}` || '',
        link: drilldownLink,
        date: timeDisplay,
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
            {txn?.formatted?.coinSymbol.toLowerCase() === 'sui' ? (
                <IconContainer>
                    <SuiIcon width={14} height={20} color={'white'} />
                </IconContainer>
            ) : txn?.formatted?.coinIcon ? (
                <img
                    src={txn?.formatted?.coinIcon}
                    alt={`Icon for ${txn?.formatted?.coinSymbol}`}
                    className="w-10 h-10"
                />
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
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={nftImageUri || ''}
                        alt={txn.description || ''}
                    />
                ),
                header: txn?.name,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={nftImageUri || ''}
                        alt={txn.description || ''}
                    />
                ),
                header: txn?.name,
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={nftImageUri || ''}
                        alt={txn.description || ''}
                    />
                ),
                header: txn?.name,
            },
            register: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: nftImageUri ? (
                    <NftImg
                        src={ipfs(nftImageUri)}
                        alt={txn.description || ''}
                    />
                ) : (
                    <></>
                ),
                header: txn?.formatted?.coinSymbol || 'Sui Action',
            },
        },
        sui: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txn?.formatted?.coinSymbol,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txn?.formatted?.coinSymbol,
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txn?.formatted?.coinSymbol,
            },
        },
        coin: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txn?.formatted?.coinSymbol,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txn?.formatted?.coinSymbol,
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txn?.formatted?.coinSymbol,
            },
        },
        function: {
            modify: {
                ...shared,
                typeIcon: <PencilSquareIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: 'Sui Action',
            },
            burn: {
                ...shared,
                typeIcon: <FireIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: 'Sui Action',
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: 'Sui Action',
            },
            default: {
                ...shared,
                typeIcon: <SuiIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: 'Sui Action',
            },
        },
    };

    let rowData;

    if (!txType || !txAction) return <></>;

    if (txType === 'nft') {
        rowData = dataMap.nft[txAction];
    } else if (txn?.formatted?.coinSymbol.toLowerCase() === 'sui') {
        rowData = dataMap.sui[txAction];
    } else if (txn.type === 'call') {
        rowData = dataMap.function[txAction || 'default'];
    } else {
        rowData = dataMap.coin[txAction];
    }

    if (!rowData || !txn.formatted) return <></>;

    return (
        <ActivityRow
            failed={txn.status === 'failure'}
            typeIcon={rowData.typeIcon}
            type={rowData.type}
            date={rowData.date}
            icon={rowData.icon}
            link={rowData.link}
            header={rowData.header}
            subheader={rowData.txDirText}
            formattedAmount={txn.formatted.formattedBalance}
            symbol={txn?.formatted?.coinSymbol}
            dollars={txn.formatted.dollars}
        />
    );
};

export default TransactionRow;
