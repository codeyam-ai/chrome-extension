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

import { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

interface TransactionRowProps {
    txn: FormattedTransaction;
    address: string;
}

interface RowDataTypes extends SharedTypes {
    header: string | null | undefined;
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

const TransactionRow = ({ txn, address }: TransactionRowProps) => {
    const {
        timeDisplay,
        txType,
        txAction,
        txAmount,
        txStatus,
        txUsdAmount,
        gasFeeInSui,
        gasFeeInUsd,
        txCommands,
        displayImage,
    } = getHumanReadable(address, txn);

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn.digest,
        symbol: 'SUI', // TODO: what to do with coins / multiple coins / batch txs
        isFunc: txType === 'func' ? 'yes' : 'no',
    }).toString()}`;

    const shared: SharedTypes = {
        hasAmount: (txAmount && txAmount > 0) || false,
        amount: txAmount || undefined,
        coinType: '', // TODO: what to do with coins / multiple coins / batch txs
        type: txAction || '',
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
                        src={displayImage || ''}
                        alt={'NFT image display for transaction'}
                    />
                ),
                header: txCommands || '',
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={displayImage || ''}
                        alt={'NFT image display for transaction'}
                    />
                ),
                header: txCommands || '',
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={displayImage || ''}
                        alt={'NFT image display for transaction'}
                    />
                ),
                header: txCommands || '',
            },
            clone: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: (
                    <NftImg
                        src={displayImage || ''}
                        alt={'NFT image display for transaction'}
                    />
                ),
                header: txCommands || '',
            },
            register: {
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
                header: txCommands || 'Register NFT',
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
                header: _.startCase(txType) || `NFT ${txAction}` || '',
            },
        },
        sui: {
            send: {
                ...shared,
                typeIcon: <ArrowUpIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txCommands,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txCommands,
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txCommands,
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
                header: txCommands,
            },
            receive: {
                ...shared,
                typeIcon: <ArrowDownIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txCommands,
            },
            mint: {
                ...shared,
                typeIcon: <SparklesIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txCommands,
            },
            default: {
                ...shared,
                typeIcon: <CodeBracketSquareIcon {...iconProps} />,
                icon: <CurrencyIcon />,
                header: txCommands,
            },
        },
        func: {
            modify: {
                ...shared,
                typeIcon: <PencilSquareIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: txCommands || 'Sui Action',
            },
            burn: {
                ...shared,
                typeIcon: <FireIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: txCommands || 'Sui Action',
            },
            transfer: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: txCommands || 'Sui Action',
            },
            pool: {
                ...shared,
                typeIcon: <ArrowsRightLeftIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: txCommands || 'Sui Action',
            },
            default: {
                ...shared,
                typeIcon: <SuiIcon {...iconProps} />,
                icon: <FunctionIcon />,
                header: txCommands || 'Sui Action',
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
            type={rowData.type}
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
