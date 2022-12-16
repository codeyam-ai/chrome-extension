// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    ArrowUpRightIcon,
    CodeIcon,
    SparklesIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';

import { type AccountInfo } from '../../KeypairVault';
import { getTheme } from '../../helpers/getTheme';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import { Icon } from '../../shared/icons/Icon';
import { AssetCard } from '../../shared/nfts/AssetCard';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import Header from '../../shared/typography/Header';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { formatDate } from '_helpers';
import { useAppSelector, useFormatCoin, useMiddleEllipsis } from '_hooks';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';

import type { TxResultState } from '_redux/slices/txresults';

import st from './ReceiptCard.module.scss';

type TxResponseProps = {
    txDigest: TxResultState;
    transferType?: 'nft' | 'coin' | null;
};

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

// Truncate text after one line (~ 35 characters)
const TRUNCATE_MAX_CHAR = 40;

const AvatarItem = ({
    bgColor,
    header,
    subheader,
    emoji,
}: {
    bgColor?: string;
    header?: string;
    subheader?: string;
    emoji?: string;
}) => (
    <div
        className={
            'p-[10px] flex flex-row space-around items-center align-center gap-4'
        }
    >
        <WalletColorAndEmojiCircle
            emojiSizeInPx={20}
            circleSizeClasses={'w-[40px] h-[40px] auto'}
            color={bgColor || '#7E23CA'}
            emoji={emoji}
        />
        <div className={'flex flex-col items-left'}>
            <BodyLarge isSemibold className={'text-left'}>
                {header}
            </BodyLarge>
            <Body className={'text-ethos-light-text-medium text-left'}>
                {subheader}
            </Body>
        </div>
    </div>
);

const TxTransfer = ({
    ToFrom,
}: {
    ToFrom: {
        from: {
            emoji: string | undefined;
            bgColor: string | undefined;
            header: string | undefined;
            subheader?: string;
        };
        to: {
            emoji: string | undefined;
            bgColor: string | undefined;
            header: string | undefined;
            subheader?: string;
        };
    };
}) => (
    <div className={'flex flex-col'}>
        <AvatarItem
            bgColor={ToFrom.from.bgColor}
            header={ToFrom.from.header}
            subheader={ToFrom.from.subheader}
            emoji={ToFrom.from.emoji}
        />
        {ToFrom.to.header && (
            <>
                <div
                    className={
                        'py-1 pl-[18px] text-left text-ethos-light-text-medium'
                    }
                >
                    <ChevronDoubleDownIcon width={25} height={23} />
                </div>
                <AvatarItem
                    bgColor={ToFrom.to.bgColor}
                    header={ToFrom.to.header}
                    subheader={ToFrom.to.subheader}
                    emoji={ToFrom.to.emoji}
                />
            </>
        )}
    </div>
);

function ReceiptCard({ txDigest }: TxResponseProps) {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const theme = getTheme();

    const toAddrStr = useMiddleEllipsis(
        txDigest.to || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const fromAddrStr = useMiddleEllipsis(
        txDigest.from || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const truncatedNftName = useMiddleEllipsis(
        txDigest?.name || '',
        TRUNCATE_MAX_CHAR,
        TRUNCATE_MAX_CHAR - 1
    );

    const walletAddrStr = useMiddleEllipsis(
        accountInfo?.address || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const [gas, gasSymbol] = useFormatCoin(txDigest.txGas, GAS_TYPE_ARG);

    const [total, totalSymbol, dollars] = useFormatCoin(
        txDigest.amount ? txDigest.amount : null,
        GAS_TYPE_ARG
    );

    const imgUrl = txDigest?.url
        ? txDigest?.url.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/')
        : false;

    const date = txDigest?.timestampMs
        ? formatDate(txDigest.timestampMs, [
              'month',
              'day',
              'year',
              'hour',
              'minute',
          ])
        : false;

    const fromWallet = accountInfo?.address === txDigest.from;
    const isNft = typeof txDigest?.url !== 'undefined';
    const coinType = txDigest?.kind === 'PaySui' ? 'SUI' : 'Coin';
    const transferType =
        txDigest?.kind === 'Call'
            ? 'Call'
            : txDigest.isSender
            ? 'Sent'
            : 'Received';

    const header = isNft ? truncatedNftName : coinType;
    const isMinted = txDigest?.callFunctionName === 'mint';

    const transferMeta = {
        Call: {
            txName: isMinted
                ? 'Minted'
                : `Call ${
                      txDigest?.callFunctionName &&
                      '(' + txDigest?.callFunctionName + ')'
                  }`,
            txIcon: isMinted ? (
                <Icon
                    isRound={header === 'Coin'}
                    displayIcon={<SparklesIcon />}
                />
            ) : (
                <Icon displayIcon={<CodeIcon />} />
            ),
            transfer: txDigest?.isSender ? 'To' : 'From',
            address: false,
            addressTruncate: false,
            failedMsg: txDigest?.error || 'Failed',
        },
        Sent: {
            txName: 'Sent',
            transfer: 'To',
            txIcon: (
                <Icon
                    displayIcon={<ArrowUpCircleIcon />}
                    isRound={isNft ? false : true}
                />
            ),
            addressTruncate: toAddrStr,
            address: txDigest.to,
            failedMsg: txDigest?.error || 'Failed',
        },
        Received: {
            txName: 'Received',
            transfer: 'From',
            txIcon: (
                <Icon
                    displayIcon={<ArrowDownCircleIcon />}
                    isRound={isNft ? false : true}
                />
            ),
            addressTruncate: fromAddrStr,
            address: txDigest.from,
            failedMsg: '',
        },
    };

    return (
        <>
            <div className={'pt-6 px-6 pb-8'}>
                <AssetCard
                    theme={theme}
                    isNft={isNft}
                    coinType={coinType}
                    imgUrl={imgUrl ? imgUrl : ''}
                    name={txDigest?.name || 'NFT'}
                    icon={
                        txDigest.status === 'success' ? (
                            transferMeta[transferType].txIcon
                        ) : (
                            <Icon
                                displayIcon={<XMarkIcon />}
                                isRound={isNft ? false : true}
                            />
                        )
                    }
                />
                <Body className={'text-ethos-light-text-medium'}>
                    {txDigest.status === 'success'
                        ? transferMeta[transferType].txName
                        : transferMeta[transferType].failedMsg}
                </Body>
                <Header className={'font-weight-ethos-subheader mb-3'}>
                    {header}
                </Header>
                <Body className={'text-ethos-light-text-medium'}>
                    {date && date.replace(' AM', 'am').replace(' PM', 'pm')}
                </Body>
            </div>
            {!isMinted && (
                <div className={'px-6 pb-6'}>
                    <TxTransfer
                        ToFrom={{
                            from: {
                                emoji: fromWallet ? accountInfo?.emoji : '',
                                bgColor: fromWallet
                                    ? accountInfo?.color
                                    : '#6D28D9',
                                header: fromWallet
                                    ? accountInfo?.name
                                    : fromAddrStr,
                                subheader: fromWallet ? walletAddrStr : '',
                            },
                            to: {
                                emoji: fromWallet ? '' : accountInfo?.emoji,
                                bgColor: fromWallet
                                    ? '#6D28D9'
                                    : accountInfo?.color,
                                header: fromWallet
                                    ? toAddrStr
                                    : accountInfo?.name,
                                subheader: fromWallet ? '' : walletAddrStr,
                            },
                        }}
                    />
                </div>
            )}
            {isNft ? (
                <KeyValueList
                    header={'Details'}
                    keyNamesAndValues={[
                        {
                            keyName: 'Transaction Fee',
                            value: `${gas} ${gasSymbol}`,
                        },
                        {
                            keyName: 'Signature',
                            value: fromAddrStr,
                        },
                    ]}
                />
            ) : (
                <KeyValueList
                    header={'Details'}
                    keyNamesAndValues={[
                        {
                            keyName:
                                transferType === 'Sent'
                                    ? 'You Sent'
                                    : header !== 'Coin'
                                    ? 'You Received'
                                    : '',
                            value: `${total} ${
                                coinType === 'SUI' ? totalSymbol : ''
                            }`,
                        },
                        {
                            keyName: 'Transaction Fee',
                            value: `${gas} ${
                                coinType === 'SUI' ? totalSymbol : ''
                            }`,
                        },
                        {
                            keyName: dollars ? 'Total' : '',
                            value: dollars,
                        },
                    ]}
                />
            )}
            {txDigest.txId && (
                <div className={'px-6 pb-6'}>
                    <div className={'flex flex-row justify-between'}>
                        <BodyLarge>
                            {isNft ? (
                                <ExplorerLink
                                    type={ExplorerLinkType.object}
                                    objectID={txDigest.objectId || ''}
                                    title="View on Sui Explorer"
                                    className={st['explorer-link']}
                                    showIcon={true}
                                >
                                    View NFT on Sui Explorer
                                </ExplorerLink>
                            ) : (
                                <ExplorerLink
                                    type={ExplorerLinkType.transaction}
                                    transactionID={txDigest.txId}
                                    title="View on Sui Explorer"
                                    className={st['explorer-link']}
                                    showIcon={true}
                                >
                                    View on Sui Explorer
                                </ExplorerLink>
                            )}
                        </BodyLarge>
                        <div className={'text-ethos-light-text-medium'}>
                            <ArrowUpRightIcon width={16} height={16} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ReceiptCard;
