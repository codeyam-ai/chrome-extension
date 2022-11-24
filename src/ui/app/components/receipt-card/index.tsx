// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { formatDate } from '_helpers';
import { useMiddleEllipsis, useFormatCoin } from '_hooks';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import PageScrollView from '../../shared/layouts/PageScrollView';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import ExplorerLink from '_components/explorer-link';

import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

import LargeSent from '_src/ui/app/shared/svg/LargeSent';
import LargeListed from '_src/ui/app/shared/svg/LargeListed';
import LargeReceived from '_src/ui/app/shared/svg/LargeReceived';

import type { TxResultState } from '_redux/slices/txresults';

import st from './ReceiptCard.module.scss';
import Body from '../../shared/typography/Body';
import Header from '../../shared/typography/Header';
import BodyLarge from '../../shared/typography/BodyLarge';

type TxResponseProps = {
    txDigest: TxResultState;
    transferType?: 'nft' | 'coin' | null;
};

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

// Truncate text after one line (~ 35 characters)
const TRUNCATE_MAX_CHAR = 40;

function ReceiptCard({ txDigest }: TxResponseProps) {
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

    const truncatedNftDescription = useMiddleEllipsis(
        txDigest?.description || '',
        TRUNCATE_MAX_CHAR,
        TRUNCATE_MAX_CHAR - 1
    );

    const transferType =
        txDigest?.kind === 'Call'
            ? 'Call'
            : txDigest.isSender
            ? 'Sent'
            : 'Received';

    const transferMeta = {
        Call: {
            txName:
                txDigest?.name && txDigest?.url
                    ? 'Minted'
                    : `Call ${
                          txDigest?.callFunctionName &&
                          '(' + txDigest?.callFunctionName + ')'
                      }`,

            transfer: txDigest?.isSender ? 'To' : 'From',
            address: false,
            addressTruncate: false,
            failedMsg: txDigest?.error || 'Failed',
        },
        Sent: {
            txName: 'Sent',
            transfer: 'To',
            addressTruncate: toAddrStr,
            address: txDigest.to,
            failedMsg: txDigest?.error || 'Failed',
        },
        Received: {
            txName: 'Received',
            transfer: 'From',
            addressTruncate: fromAddrStr,
            address: txDigest.from,
            failedMsg: '',
        },
    };

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

    const AssetCard = ({ imgUrl }: { imgUrl: string }) => (
        <div className={'w-full'}>
            <div className={'flex flex-row justify-center mb-4'}>
                <img
                    className={'rounded-2xl w-[58px] h-[58px] auto'}
                    src={imgUrl}
                    alt={txDigest?.name || 'NFT'}
                />
                <LargeListed />
            </div>
        </div>
    );

    const AvatarItem = ({
        imgUrl,
        header,
        subheader,
    }: {
        imgUrl?: string;
        header: string;
        subheader?: string;
    }) => (
        <div
            className={
                'p-[10px] flex flex-row space-around items-center align-center gap-4'
            }
        >
            <img
                className={'rounded-full w-[40px] h-[40px] auto'}
                src={imgUrl}
                alt={txDigest?.name || 'NFT'}
            />
            <div className={'flex flex-col items-left'}>
                <BodyLarge className={'font-semibold text-left'}>
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
            to: {
                imgSrc: string;
                header: string;
                subheader?: string;
            };
            from: {
                imgSrc: string;
                header: string;
                subheader?: string;
            };
        };
    }) => (
        <div className={'flex flex-col'}>
            <AvatarItem
                imgUrl={ToFrom.from.imgSrc}
                header={ToFrom.from.header}
                subheader={ToFrom.from.subheader}
            />
            <div
                className={
                    'py-1 pl-[18px] text-left text-ethos-light-text-medium'
                }
            >
                <ChevronDoubleDownIcon width={25} height={23} />
            </div>
            <AvatarItem
                imgUrl={ToFrom.to.imgSrc}
                header={ToFrom.to.header}
                subheader={ToFrom.to.subheader}
            />
        </div>
    );

    const statusClassName =
        txDigest.status === 'success' ? st.success : st.failed;

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

    return (
        <>
            <PageScrollView>
                <div className={'pt-6 px-6 pb-8'}>
                    <AssetCard imgUrl={imgUrl ? imgUrl : ''} />
                    <Body className={'text-ethos-light-text-medium'}>
                        {txDigest.status === 'success'
                            ? transferMeta[transferType].txName
                            : transferMeta[transferType].failedMsg}
                    </Body>
                    <Header className={'font-semibold mb-3'}>
                        SuiGod #1750
                    </Header>
                    <Body className={'text-ethos-light-text-medium'}>
                        {date && date.replace(' AM', 'am').replace(' PM', 'pm')}
                    </Body>
                </div>
                <div className={'px-6 pb-6'}>
                    <TxTransfer
                        ToFrom={{
                            to: {
                                imgSrc: imgUrl ? imgUrl : '',
                                header: 'Wallet 1', // TODO: get data for name of wallet
                                subheader: toAddrStr,
                            },
                            from: {
                                imgSrc: imgUrl ? imgUrl : '',
                                header: fromAddrStr,
                            },
                        }}
                    />
                </div>
                <div className={'px-6 pb-6 text-left'}>
                    <BodyLarge className={'font-semibold mb-3'}>
                        Details
                    </BodyLarge>
                    <KeyValueList
                        keyNamesAndValues={[
                            {
                                keyName: 'Transaction Fee',
                                value: gas,
                            },
                            {
                                keyName: 'Signature',
                                value: fromAddrStr,
                            },
                        ]}
                    />
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
