import {
    ArrowsRightLeftIcon,
    CodeBracketSquareIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    FireIcon,
    PhotoIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';
import _ from 'lodash';

import { ActivityRow } from './ActivityRow';
import SuiIcon from '../../svg/SuiIcon';
import ipfs from '_src/ui/app/helpers/ipfs';
import { getHumanReadable } from '_src/ui/app/helpers/transactions';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import UnknownToken from '_src/ui/app/pages/home/tokens/UnknownToken';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

interface TransactionRowProps {
    txn: TxResultState;
}

interface RowDataTypes extends SharedTypes {
    header?: string;
    typeIcon: JSX.Element;
    icon: JSX.Element;
}

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
    const { txType, txAction, nftImageUri, timeDisplay } =
        getHumanReadable(txn);

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn.txId,
        symbol: txn?.formatted?.coinSymbol || '',
        isFunc: txType === 'func' ? 'yes' : 'no',
    }).toString()}`;

    const shared: SharedTypes = {
        hasAmount: (txn.amount && txn.amount > 0) || false,
        amount: txn?.amount || undefined,
        coinType: txn?.coinType || '',
        type: txAction || txn?.callFunctionName || '',
        txDirText:
            txAction === 'send' && txn.to
                ? `To ${truncateMiddle(txn.to)}`
                : `From ${truncateMiddle(txn.from)}` || '',
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
            {txType === 'sui' ? (
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

    const NftImg = ({ src, alt }: { src: string; alt: string }) =>
        src ? (
            <img
                className={'w-[40px] h-[40px] rounded-lg'}
                src={src}
                alt={alt}
            />
        ) : (
            <IconContainer>
                <PhotoIcon width={20} height={20} color={'white'} />
            </IconContainer>
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
        func: {
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
                header: _.startCase(txn?.name),
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
                header: _.startCase(txn?.name),
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
                header: _.startCase(txn?.name),
            },
            clone: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={nftImageUri || ''}
                        alt={txn.description || ''}
                    />
                ),
                header: _.startCase(txn?.name),
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
                header: _.startCase(txn?.name) || 'Register NFT',
            },
            default: {
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
                header: _.startCase(txType) || `NFT ${txAction}` || '',
            },
        },
        sui: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header:
                    _.startCase(txn?.formatted?.coinSymbol) ||
                    _.startCase(txn?.kind),
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: _.startCase(txn?.formatted?.coinSymbol),
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: _.startCase(txn?.formatted?.coinSymbol),
            },
            default: {
                ...shared,
                typeIcon: <CodeBracketSquareIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: _.startCase(txAction) || 'SUI',
            },
        },
        coin: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header:
                    _.startCase(txn?.formatted?.coinSymbol) ||
                    _.startCase(txn.callModuleName),
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header:
                    _.startCase(txn?.formatted?.coinSymbol) ||
                    _.startCase(txn.callModuleName),
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header:
                    _.startCase(txn?.formatted?.coinSymbol) ||
                    _.startCase(txn.callModuleName),
            },
            default: {
                ...shared,
                typeIcon: <CodeBracketSquareIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header:
                    _.startCase(txn?.formatted?.coinSymbol) ||
                    _.startCase(txn.callModuleName),
            },
        },
        func: {
            modify: {
                ...shared,
                typeIcon: <PencilSquareIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: _.startCase(txn.callModuleName) || 'Sui Action',
            },
            burn: {
                ...shared,
                typeIcon: <FireIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: _.startCase(txn.callModuleName) || 'Sui Action',
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: _.startCase(txn.callModuleName) || 'Sui Action',
            },
            pool: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: _.startCase(txn.callFunctionName) || 'Sui Action',
            },
            default: {
                ...shared,
                typeIcon: <SuiIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: _.startCase(txn.callModuleName) || 'Sui Action',
            },
        },
    };

    let rowData;

    if (!txType) return <></>;

    if (txType === 'nft') {
        rowData = dataMap.nft[txAction || 'default'];
    } else if (txType === 'sui') {
        rowData = dataMap.sui[txAction || 'default'];
    } else if (txType === 'func') {
        rowData = dataMap.func[txAction || 'default'];
    } else {
        rowData = dataMap.coin[txAction || 'default'];
    }

    if (!rowData) return <></>;

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
            formattedAmount={txn?.formatted?.formattedBalance}
            symbol={txn?.formatted?.coinSymbol}
            dollars={txn?.formatted?.dollars}
        />
    );
};

export default TransactionRow;
