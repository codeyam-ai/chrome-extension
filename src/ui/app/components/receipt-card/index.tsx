// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { formatDate } from '_helpers';
import { useMiddleEllipsis, useFormatCoin, useAppSelector } from '_hooks';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import PageScrollView from '../../shared/layouts/PageScrollView';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import ExplorerLink from '_components/explorer-link';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { AssetCard } from '../../shared/nfts/AssetCard';

import TxSent from '_src/ui/app/shared/svg/TxSent';
import TxReceived from '_src/ui/app/shared/svg/TxReceived';
import TxMinted from '_src/ui/app/shared/svg/TxMint';
import TxCall from '_src/ui/app/shared/svg/TxCall';
import TxRoundSend from '../../shared/svg/TxRoundSend';
import TxRoundReceived from '../../shared/svg/TxRoundReceived';
import TxFailed from '_src/ui/app/shared/svg/TxFailed';

import type { TxResultState } from '_redux/slices/txresults';

import st from './ReceiptCard.module.scss';
import Body from '../../shared/typography/Body';
import Header from '../../shared/typography/Header';
import BodyLarge from '../../shared/typography/BodyLarge';
import { AccountInfo } from '../../KeypairVault';

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
}: {
    bgColor?: string | undefined;
    header?: string | undefined;
    subheader?: string | undefined;
}) => (
    <div
        className={
            'p-[10px] flex flex-row space-around items-center align-center gap-4'
        }
    >
        <div
            className={'rounded-full w-[40px] h-[40px] auto'}
            style={{ backgroundColor: bgColor || '#7E23CA' }}
        ></div>
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
            bgColor: string | undefined;
            header: string | undefined;
            subheader?: string;
        };
        to: {
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
        />
        <div
            className={'py-1 pl-[18px] text-left text-ethos-light-text-medium'}
        >
            <ChevronDoubleDownIcon width={25} height={23} />
        </div>
        <AvatarItem
            bgColor={ToFrom.to.bgColor}
            header={ToFrom.to.header}
            subheader={ToFrom.to.subheader}
        />
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

    const [formatted, symbol] = useFormatCoin(
        txDigest.amount || txDigest.balance || 0,
        txDigest.coinType
    );

    const [gas, gasSymbol] = useFormatCoin(txDigest.txGas, GAS_TYPE_ARG);

    const [total, totalSymbol] = useFormatCoin(
        txDigest.amount && txDigest.isSender
            ? txDigest.amount + txDigest.txGas
            : null,
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

    const transferType =
        txDigest?.kind === 'Call'
            ? 'Call'
            : txDigest.isSender
            ? 'Sent'
            : 'Received';

    const header = isNft ? truncatedNftName : totalSymbol;
    const isMinted = txDigest?.callFunctionName === 'mint';

    const transferMeta = {
        Call: {
            txName: isMinted
                ? 'Minted'
                : `Call ${
                      txDigest?.callFunctionName &&
                      '(' + txDigest?.callFunctionName + ')'
                  }`,
            txIcon: isMinted ? <TxMinted /> : <TxCall />,
            transfer: txDigest?.isSender ? 'To' : 'From',
            address: false,
            addressTruncate: false,
            failedMsg: txDigest?.error || 'Failed',
        },
        Sent: {
            txName: 'Sent',
            transfer: 'To',
            txIcon: isNft ? <TxSent /> : <TxRoundSend />,
            addressTruncate: toAddrStr,
            address: txDigest.to,
            failedMsg: txDigest?.error || 'Failed',
        },
        Received: {
            txName: 'Received',
            transfer: 'From',
            txIcon: isNft ? <TxReceived /> : <TxRoundReceived />,
            addressTruncate: fromAddrStr,
            address: txDigest.from,
            failedMsg: '',
        },
    };

    return (
        <>
            <PageScrollView heightInPx={410}>
                <div className={'pt-6 px-6 pb-8'}>
                    <AssetCard
                        isNft={isNft}
                        imgUrl={imgUrl ? imgUrl : ''}
                        name={txDigest?.name || 'NFT'}
                        icon={
                            txDigest.status === 'success' ? (
                                transferMeta[transferType].txIcon
                            ) : (
                                <TxFailed />
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
                                    bgColor: fromWallet
                                        ? accountInfo?.color
                                        : '#6D28D9',
                                    header: fromWallet
                                        ? accountInfo?.name
                                        : fromAddrStr,
                                    subheader: fromWallet ? walletAddrStr : '',
                                },
                                to: {
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
                <div className={'px-6 pb-6 text-left'}>
                    <BodyLarge isSemibold className={'mb-3'}>
                        Details
                    </BodyLarge>
                    {isNft ? (
                        <KeyValueList
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
                            keyNamesAndValues={[
                                {
                                    keyName:
                                        transferType === 'Sent'
                                            ? 'You Sent'
                                            : 'You Received',
                                    value: `${total} ${totalSymbol}`,
                                },
                                {
                                    keyName: 'Transaction Fee',
                                    value: `${gas} ${gasSymbol}`,
                                },
                                {
                                    keyName: 'Total',
                                    value: `$1.30`,
                                },
                            ]}
                        />
                    )}
                </div>
                {txDigest.txId && (
                    <div className={'px-6'}>
                        <div className={'flex flex-row justify-between'}>
                            <BodyLarge>
                                <ExplorerLink
                                    type={ExplorerLinkType.transaction}
                                    transactionID={txDigest.txId}
                                    title="View on Sui Explorer"
                                    className={st['explorer-link']}
                                    showIcon={true}
                                >
                                    View on Sui Explorer
                                </ExplorerLink>
                            </BodyLarge>
                            <div className={'text-ethos-light-text-medium'}>
                                <ArrowUpRightIcon width={16} height={16} />
                            </div>
                        </div>
                    </div>
                )}
            </PageScrollView>
        </>
    );
}

export default ReceiptCard;
