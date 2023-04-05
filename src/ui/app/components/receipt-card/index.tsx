// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    ArrowUpRightIcon,
    ChevronDoubleDownIcon,
    CogIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getTheme } from '../../helpers/getTheme';
import { getHumanReadable } from '../../helpers/transactions';
import truncateMiddle from '../../helpers/truncate-middle';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import { Icon } from '../../shared/icons/Icon';
import { AssetCard } from '../../shared/nfts/AssetCard';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import CopyBody from '../../shared/typography/CopyBody';
import Header from '../../shared/typography/Header';
import LoadingIndicator from '../loading/LoadingIndicator';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { useAppSelector } from '_hooks';
import { api } from '_store/thunk-extras';

import type { AccountInfo } from '../../KeypairVault';
import type { FormattedTransaction } from '../../helpers/transactions/types';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

import st from './ReceiptCard.module.scss';

type TxResponseProps = {
    txDigest: string | null;
    trans?: 'nft' | 'coin' | 'func' | 'sui';
};

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
    const address = useAppSelector(({ account }) => account.address) as string;
    const { data } = useQuery(['transactions-by-address', address]);
    const theme = getTheme();
    const txRef = useRef<FormattedTransaction>();

    const [transaction, setTransaction] =
        useState<SuiTransactionBlockResponse>();

    // get the txdigest from the url
    const [searchParams] = useSearchParams();
    const txDigestFromUrl = searchParams.get('txdigest');

    const result = data as FormattedTransaction[];

    useEffect(() => {
        if (result) {
            // find transaction details based on txDigest
            txRef.current = result.find(
                (tx) => tx.transaction.digest === txDigest
            ) as FormattedTransaction;

            setTransaction(txRef.current.transaction);
        } else {
            const getTransaction = async () => {
                const digest = txDigestFromUrl as string;
                const tx = await api.instance.fullNode.getTransactionBlock({
                    digest: digest,
                    options: {
                        showInput: true,
                        showEvents: true,
                        showEffects: true,
                        showObjectChanges: true,
                        showBalanceChanges: true,
                    },
                });

                setTransaction(tx);
            };

            getTransaction();
        }
    }, [result, txDigest, txDigestFromUrl]);

    const getAccount = useCallback(
        (address: string) => {
            return accountInfos.find(
                (accountInfo: AccountInfo) => accountInfo.address === address
            );
        },
        [accountInfos]
    );

    if (!transaction)
        return (
            <div className={'pt-10'}>
                <LoadingIndicator big={true} />
            </div>
        );

    const {
        txAction,
        timeDisplay,
        txType,
        txAmount,
        txStatus,
        txUsdAmount,
        gasFeeInSui,
        txCommands,
        displayImage,
        otherAddressStr,
        addresses,
    } = getHumanReadable(address, transaction);

    /*

    // TODO: Include support for coins other than SUI

    const [total, totalSymbol, dollars, , icon] = useFormatCoin(
        txDigest.amount ? txDigest.amount : null,
        txDigest.objType
    );

    const coinType = txDigest?.kind === 'PaySui' ? 'SUI' : 'Coin';
    
    */

    let transferObj;
    const transferAction = txAction;

    switch (transferAction) {
        case 'send':
            transferObj = {
                txName: 'Sent',
                transfer: 'To',
                txIcon: (
                    <Icon
                        displayIcon={<ArrowUpCircleIcon />}
                        isRound={txType === 'nft' ? false : true}
                    />
                ),
                addressTruncate: 'get-to-str',
                address: 'get-to-str',
                failedMsg: txStatus === 'success' || 'Failed',
            };
            break;
        case 'receive':
            transferObj = {
                txName: 'Received',
                transfer: 'From',
                txIcon: (
                    <Icon
                        displayIcon={<ArrowDownCircleIcon />}
                        isRound={txType === 'nft' ? false : true}
                    />
                ),
                addressTruncate: truncateMiddle(otherAddressStr, 5),
                address: otherAddressStr,
                failedMsg: '',
            };
            break;
        default:
            transferObj = {
                txName: txAction === 'mint' ? 'Minted' : `${txAction}`,
                txIcon:
                    txAction === 'mint' ? (
                        <Icon
                            isRound={txType === 'coin' || txType === 'sui'}
                            displayIcon={<SparklesIcon />}
                        />
                    ) : (
                        <Icon displayIcon={<CogIcon />} />
                    ),
                transfer: txAction === 'send' ? 'To' : 'From',
                address: false,
                addressTruncate: false,
                failedMsg: txStatus === 'success' || 'Failed',
            };
            break;
    }

    const fromWallet = addresses?.from ? getAccount(addresses.from) : null;
    const toWallet = addresses?.to ? getAccount(addresses.to) : null;

    return (
        <>
            <div className={'pt-6 px-6 pb-8'}>
                <AssetCard
                    theme={theme}
                    txType={txType}
                    coinType={'SUI'} // TODO: handle coin types
                    imgUrl={displayImage || ''}
                    name={txCommands || 'NFT'}
                    icon={transferObj.txIcon} // TODO: handle success / failure icon
                />
                <Body className={'text-ethos-light-text-medium'}>
                    {txStatus === 'success'
                        ? `${_.capitalize(txAction)} ${_.toUpper(txType)}`
                        : 'Transaction Failed'}
                </Body>
                <Header className={'font-weight-ethos-subheader mb-3'}>
                    {txCommands}
                </Header>
                <Body className={'text-ethos-light-text-medium'}>
                    {timeDisplay}
                </Body>
            </div>
            {txAction !== 'mint' && (
                <div className={'px-6 pb-6'}>
                    <TxTransfer
                        ToFrom={{
                            from: {
                                emoji: fromWallet?.emoji || '',
                                bgColor: fromWallet?.color || '#6D28D9',
                                header: fromWallet?.name || 'From',
                                subheader: addresses?.from || '',
                            },
                            to: {
                                emoji: toWallet?.emoji || '',
                                bgColor: toWallet?.color || '#6D28D9',
                                header: toWallet?.name || 'To',
                                subheader: addresses?.to || '',
                            },
                        }}
                    />
                </div>
            )}

            {txType === 'nft' ? (
                <KeyValueList
                    header={'Details'}
                    keyNamesAndValues={[
                        {
                            keyName: 'Transaction Fee',
                            value: `${gasFeeInSui} SUI`,
                        },
                        {
                            keyName: 'Digest',
                            value: truncateMiddle(transaction.digest, 5),
                        },
                    ]}
                />
            ) : (
                <KeyValueList
                    header={'Details'}
                    keyNamesAndValues={[
                        {
                            keyName: (txAmount && 'Amount') || '',
                            value: (txAmount && txAmount + ' SUI') || '',
                        },
                        {
                            keyName: 'Transaction Fee',
                            value: `${gasFeeInSui} SUI`,
                        },
                        {
                            keyName: 'Total (USD)',
                            value: txUsdAmount as string,
                        },
                    ]}
                />
            )}

            <div className={'px-6 pb-6'}>
                <div className={'flex flex-row justify-between'}>
                    <BodyLarge>
                        <ExplorerLink
                            type={ExplorerLinkType.transaction}
                            transactionID={
                                transaction?.effects?.transactionDigest || ''
                            }
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
        </>
    );
}

export default ReceiptCard;
