// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    ArrowUpRightIcon,
    CogIcon,
    SparklesIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { type AccountInfo } from '../../KeypairVault';
import { getTheme } from '../../helpers/getTheme';
import ipfs from '../../helpers/ipfs';
import truncateMiddle from '../../helpers/truncate-middle';
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
import CopyBody from '_src/ui/app/shared/typography/CopyBody';

// import type { TxResultState } from '_redux/slices/txresults';

import st from './ReceiptCard.module.scss';

type TxResponseProps = {
    txDigest: any;
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
            {(header || '').length > 15 ? (
                <CopyBody
                    txt={header || ''}
                    large
                    isSemibold
                    className={'text-left'}
                >
                    {truncateMiddle(header)}
                </CopyBody>
            ) : (
                <BodyLarge isSemibold className={'text-left'}>
                    {header}
                </BodyLarge>
            )}

            <CopyBody
                txt={subheader || ''}
                className={'text-ethos-light-text-medium text-left'}
            >
                {truncateMiddle(subheader)}
            </CopyBody>
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
    const { accountInfos } = useAppSelector(({ account }) => account);

    const getAccount = useCallback(
        (address: string) => {
            return accountInfos.find(
                (accountInfo: AccountInfo) => accountInfo.address === address
            );
        },
        [accountInfos]
    );

    const fromWallet = useMemo(
        () => (txDigest.from ? getAccount(txDigest.from) : null),
        [getAccount, txDigest]
    );

    const toWallet = useMemo(
        () => (txDigest.to ? getAccount(txDigest.to) : null),
        [getAccount, txDigest]
    );

    const [searchParams] = useSearchParams();
    const isFunc = searchParams.get('isFunc');

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

    const [gas] = useFormatCoin(txDigest.txGas, SUI_TYPE_ARG);

    const [total, totalSymbol, dollars, , icon] = useFormatCoin(
        txDigest.amount ? txDigest.amount : null,
        txDigest.objType
    );

    const imgUrl = txDigest?.url ? ipfs(txDigest.url) : false;

    const date = txDigest?.timestampMs
        ? formatDate(txDigest.timestampMs, [
              'month',
              'day',
              'year',
              'hour',
              'minute',
          ])
        : false;

    const isNft = typeof txDigest?.url !== 'undefined';
    const coinType = txDigest?.kind === 'PaySui' ? 'SUI' : 'Coin';
    const transferType =
        txDigest?.kind === 'Call'
            ? 'Call'
            : txDigest.isSender
            ? 'Sent'
            : 'Received';

    const header =
        _.startCase(txDigest?.name) ||
        _.startCase(truncatedNftName) ||
        _.startCase(txDigest.objSymbol) ||
        _.startCase(txDigest.callModuleName);
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
                <Icon displayIcon={<CogIcon />} />
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
                    isFunc={isFunc === 'yes'}
                    coinType={coinType}
                    imgUrl={imgUrl || icon || ''}
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
                                emoji: fromWallet?.emoji || '',
                                bgColor: fromWallet?.color || '#6D28D9',
                                header: fromWallet?.name || txDigest.from,
                                subheader: fromWallet ? txDigest.from : '',
                            },
                            to: {
                                emoji: toWallet?.emoji || '',
                                bgColor: toWallet?.color || '#6D28D9',
                                header: toWallet?.name || txDigest.to,
                                subheader: toWallet ? txDigest.to : '',
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
                            value: `${gas} SUI`,
                        },
                        {
                            keyName: 'Signature',
                            value: txDigest.from,
                            shortValue: fromAddrStr,
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
                                    : transferType === 'Received'
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
