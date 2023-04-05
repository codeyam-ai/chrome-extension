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

import { ActivityRow } from './ActivityRow';
import SuiIcon from '../../svg/SuiIcon';
import ipfs from '_src/ui/app/helpers/ipfs';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import UnknownToken from '_src/ui/app/pages/home/tokens/UnknownToken';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

interface TransactionRowProps {
    txn: FormattedTransaction;
}

interface RowDataTypes extends SharedTypes {
    typeIcon: JSX.Element;
    icon: JSX.Element;
}

interface SharedTypes {
    header: string | null | undefined;
    hasAmount: boolean;
    amount?: number;
    coinType: string;
    action: string;
    txDirText: string;
    link: string;
    date: string;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const {
        timeDisplay,
        txType,
        txAction,
        txAmount,
        txStatus,
        txUsdAmount,
        txCommands,
        displayImage,
    } = txn.humanReadable;

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn.transaction.digest || '',
        symbol: 'SUI', // TODO: what to do with coins / multiple coins / batch txs
        isFunc: txType === 'func' ? 'yes' : 'no',
    }).toString()}`;

    const shared: SharedTypes = {
        hasAmount: (txAmount && parseFloat(txAmount) > 0) || false,
        amount: parseFloat(txAmount),
        coinType: '', // TODO: what to do with coins / multiple coins / batch txs
        action: txAction || '',
        txDirText: `From ${truncateMiddle(
            txn?.transaction?.transaction?.data.sender
        )}`,
        link: drilldownLink,
        date: timeDisplay,
        header: txCommands || 'Sui Action',
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
            ) : (
                // TODO: Should we handle icons for other coins?
                // Is it worth making the required requests to getCoin
                // Is there a better way, maybe a standard Icon

                /* : txn?.formatted?.coinIcon ? (
                <img
                    src={txn?.formatted?.coinIcon}
                    alt={`Icon for ${txn?.formatted?.coinSymbol}`}
                    className="w-10 h-10"
                />
            )*/

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

    const NftIcon = () => (
        <NftImg
            src={displayImage || ''}
            alt={'NFT image display for transaction'}
        />
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
                icon: <NftIcon />,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <NftIcon />,
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <NftIcon />,
            },
            clone: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <NftIcon />,
            },
            register: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: displayImage ? <NftIcon /> : <></>,
            },
            default: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: displayImage ? (
                    <NftImg
                        src={ipfs(displayImage)}
                        alt={'NFT image display for transaction'}
                    />
                ) : (
                    <></>
                ),
            },
        },
        sui: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },

            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
            default: {
                ...shared,
                typeIcon: <CodeBracketSquareIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
        },
        coin: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },

            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
            default: {
                ...shared,
                typeIcon: <CodeBracketSquareIcon {...iconProps} />,
                icon: <CurrencyIcon />,
            },
        },
        func: {
            modify: {
                ...shared,
                typeIcon: <PencilSquareIcon {...iconProps} />,
                icon: <FunctionIcon />,
            },
            burn: {
                ...shared,
                typeIcon: <FireIcon {...iconProps} />,
                icon: <FunctionIcon />,
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
            },

            pool: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
            },
            default: {
                ...shared,
                typeIcon: <SuiIcon {...iconProps} />,
                icon: <FunctionIcon />,
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
            failed={txStatus === 'failure'}
            typeIcon={rowData.typeIcon}
            txAction={rowData.action}
            type={txType}
            date={rowData.date}
            icon={rowData.icon}
            link={rowData.link}
            header={rowData.header || ''}
            subheader={rowData.txDirText}
            formattedAmount={txAmount}
            symbol={'SUI'} // TODO: handle coin symbols with ProgrammableTransactions
            dollars={txUsdAmount}
        />
    );
};

export default TransactionRow;
