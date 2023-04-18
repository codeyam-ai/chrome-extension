// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { UserPlusIcon } from '@heroicons/react/24/outline';
import {
    ArrowDownCircleIcon,
    ArrowUpCircleIcon,
    CogIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PrimaryInteraction from './PrimaryInteraction';
import ReceiptExplorerLink from './ReceiptExplorerLink';
import getObjData from '../../helpers/getObjData';
import { getTheme } from '../../helpers/getTheme';
import { getHumanReadable } from '../../helpers/transactions';
import analyzeTransactions, {
    type AnalyzedTransaction,
} from '../../helpers/transactions/analyzeTransactions';
import truncateMiddle from '../../helpers/truncate-middle';
import Button from '../../shared/buttons/Button';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import { Icon } from '../../shared/icons/Icon';
import LoadingIndicator from '../loading/LoadingIndicator';
import { useAppSelector } from '_hooks';
import { useDependencies } from '_shared/utils/dependenciesContext';
import { api } from '_store/thunk-extras';

import type { AccountInfo } from '../../KeypairVault';
import type {
    FormattedTransaction,
    HumanReadableTransactionValues,
} from '../../helpers/transactions/types';
import ReceiptDetails from './ReceiptDetails';

type TxResponseProps = {
    txDigest: string | null;
    trans?: 'nft' | 'coin' | 'func' | 'sui';
};

function ReceiptCard({ txDigest }: TxResponseProps) {
    const { featureFlags } = useDependencies();
    const navigate = useNavigate();
    const { accountInfos } = useAppSelector(({ account }) => account);
    const address = useAppSelector(({ account }) => account.address) as string;
    const { data } = useQuery(['transactions-by-address', address]);
    const [img, setImg] = useState<string | undefined>();
    const theme = getTheme();
    const txRef = useRef<FormattedTransaction>();

    const [analyzedTransaction, setTransaction] =
        useState<AnalyzedTransaction>();

    // get the txdigest from the url
    const [searchParams] = useSearchParams();
    const txDigestFromUrl = searchParams.get('txdigest');

    const result = data as FormattedTransaction[];

    useEffect(() => {
        if (result) {
            // find transaction details based on txDigest
            txRef.current = result.find(
                (tx) => tx.analyzedTransaction.digest === txDigest
            ) as FormattedTransaction;

            setTransaction(txRef.current.analyzedTransaction);
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

                const objectChanges = tx?.objectChanges;

                const obj = objectChanges?.find((obj) => {
                    if ('objectType' in obj) {
                        return obj.objectType.split('::')[1] !== 'coin';
                    } else {
                        return false;
                    }
                });

                if (obj && 'objectId' in obj) {
                    const objData = await getObjData(obj?.objectId);
                    const display = objData?.data?.display;
                    const url =
                        display && 'image_url' in display
                            ? display.image_url
                            : '';

                    if (url) {
                        setImg(url);
                    }
                }

                const analyzedTransactions = await analyzeTransactions(
                    address,
                    [tx]
                );
                setTransaction(analyzedTransactions[0]);
            };

            getTransaction();
        }
    }, [address, result, txDigest, txDigestFromUrl]);

    const getAccount = useCallback(
        (address: string) => {
            return accountInfos.find(
                (accountInfo: AccountInfo) => accountInfo.address === address
            );
        },
        [accountInfos]
    );

    const humanReadableTxInfo: HumanReadableTransactionValues | null =
        useMemo(() => {
            return analyzedTransaction
                ? getHumanReadable(analyzedTransaction)
                : null;
        }, [analyzedTransaction]);

    const recipient = useMemo(
        () => analyzedTransaction?.important.sending?.[0].recipient,
        [analyzedTransaction]
    );

    const contactTo = useAppSelector(({ contacts: { contacts } }) =>
        contacts.find((contact) => contact.address === recipient)
    );

    const isToWalletIOwn = useAppSelector(({ account: { accountInfos } }) =>
        accountInfos.find((accountInfo) => accountInfo.address === recipient)
    );

    const handleClickAddContact = useCallback(() => {
        if (recipient) {
            navigate(
                `/home/address-book/add?${new URLSearchParams({
                    newContactAddress: recipient,
                }).toString()}`
            );
        }
    }, [navigate, recipient]);

    if (!analyzedTransaction || humanReadableTxInfo === null)
        return (
            <div className={'pt-10'}>
                <LoadingIndicator big={true} />
            </div>
        );

    const { timeDisplay, action, image } = humanReadableTxInfo;

    /*
    // TODO: Include support for coins other than SUI

    const [total, totalSymbol, dollars, , icon] = useFormatCoin(
        txDigest.amount ? txDigest.amount : null,
        txDigest.objType
    );

    const coinType = txDigest?.kind === 'PaySui' ? 'SUI' : 'Coin';
    */

    let transferObj;
    const transferAction = action;

    switch (transferAction) {
        case 'send':
            transferObj = {
                txName: 'Sent',
                transfer: 'To',
                txIcon: image ? (
                    image
                ) : (
                    <Icon displayIcon={<ArrowUpCircleIcon />} isRound={true} />
                ),
                addressTruncate: 'get-to-str',
                address: 'get-to-str',
                failedMsg: analyzedTransaction.status === 'success' || 'Failed',
            };
            break;
        case 'receive':
            transferObj = {
                txName: 'Received',
                transfer: 'From',
                txIcon: (
                    <Icon
                        displayIcon={<ArrowDownCircleIcon />}
                        isRound={true}
                    />
                ),
                addressTruncate: truncateMiddle(recipient, 5),
                address: recipient,
                failedMsg: '',
            };
            break;
        default:
            transferObj = {
                txName: action === 'mint' ? 'Minted' : `${action}`,
                txIcon:
                    action === 'mint' ? (
                        <Icon isRound={false} displayIcon={<SparklesIcon />} />
                    ) : (
                        <Icon displayIcon={<CogIcon />} />
                    ),
                transfer: action === 'send' ? 'To' : 'From',
                address: false,
                addressTruncate: false,
                failedMsg: analyzedTransaction.status === 'success' || 'Failed',
            };
            break;
    }

    const fromWallet = analyzedTransaction.from
        ? getAccount(analyzedTransaction.from)
        : null;
    const toWallet = recipient ? getAccount(recipient) : null;

    // function getDetailsFieldsForSuiTransactions() {
    //     const fields = [
    //         // {
    //         //     keyName: (txAmount && 'Amount') || '',
    //         //     value: (txAmount && txAmount + ' SUI') || '',
    //         // },
    //         {
    //             keyName: 'Transaction Fee',
    //             value: `${analyzedTransaction?.totalGasUsed} SUI`,
    //         },
    //     ];

    //     // if (featureFlags.showUsd) {
    //     //     fields.push({
    //     //         keyName: 'Total (USD)',
    //     //         value: txUsdAmount as string,
    //     //     });
    //     // }

    //     return fields;
    // }

    return (
        <>
            {/* <div className={'pt-6 px-6 pb-8'}>
                <AssetCard
                    theme={theme}
                    txType={txType}
                    imgUrl={image || img || ''}
                    name={txCommands || 'NFT'}
                    icon={transferObj.txIcon} // TODO: handle success / failure icon
                />
                <Body className={'text-ethos-light-text-medium'}>
                    {txStatus === 'success'
                        ? `${_.capitalize(txAction)} ${_.capitalize(txType)}`
                        : 'Transaction Failed'}
                </Body>
                <Header className={'font-weight-ethos-subheader mb-3'}>
                    {txCommands}
                </Header>
                <Body className={'text-ethos-light-text-medium'}>
                    {timeDisplay}
                </Body>
            </div> */}

            <div className={'px-6 pb-6'}>
                <PrimaryInteraction {...analyzedTransaction} />
            </div>

            <ReceiptDetails {...analyzedTransaction} />

            <ReceiptExplorerLink {...analyzedTransaction} />

            {!contactTo && !isToWalletIOwn && (
                <Button onClick={handleClickAddContact}>
                    <UserPlusIcon className="h-6 w-6 text-white" />
                    Save Address
                </Button>
            )}
        </>
    );
}

export default ReceiptCard;
