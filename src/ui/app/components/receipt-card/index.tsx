// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PrimaryInteraction from './PrimaryInteraction';
import ReceiptDetails from './ReceiptDetails';
import ReceiptExplorerLink from './ReceiptExplorerLink';
import ReceiptHeader from './ReceiptHeader';
import ReceiptSpecifics from './ReceiptSpecifics';
import analyzeTransactions, {
    type AnalyzedTransaction,
} from '../../helpers/transactions/analyzeTransactions';
import Button from '../../shared/buttons/Button';
import Alert from '../../shared/feedback/Alert';
import LoadingIndicator from '../loading/LoadingIndicator';
import { useAppSelector } from '_hooks';
import { api } from '_store/thunk-extras';

import type { FormattedTransaction } from '../../helpers/transactions/types';

type TxResponseProps = {
    txDigest: string | null;
    trans?: 'nft' | 'coin' | 'func' | 'sui';
};

function ReceiptCard({ txDigest }: TxResponseProps) {
    const navigate = useNavigate();
    const address = useAppSelector(({ account }) => account.address) as string;
    const { data } = useQuery(['transactions-by-address', address]);
    const txRef = useRef<FormattedTransaction>();
    const [error, setError] = useState(false);

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
                try {
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

                    const analyzedTransactions = await analyzeTransactions(
                        address,
                        [tx]
                    );
                    setTransaction(analyzedTransactions[0]);
                } catch (e: unknown) {
                    setError(true);
                }
            };

            getTransaction();
        }
    }, [address, result, txDigest, txDigestFromUrl]);

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

    if (error) {
        return (
            <div className="px-6 py-6">
                <Alert
                    title="Unable to load transaction"
                    subtitle="There was an error loading this transcation. Please wait a bit and try again."
                />
            </div>
        );
    }

    if (!analyzedTransaction)
        return (
            <div className={'pt-10'}>
                <LoadingIndicator big={true} />
            </div>
        );

    return (
        <div className="py-6 px-9 flex flex-col gap-6">
            <ReceiptHeader {...analyzedTransaction} />

            <PrimaryInteraction {...analyzedTransaction} />

            <ReceiptSpecifics {...analyzedTransaction} />

            <ReceiptDetails {...analyzedTransaction} />

            <ReceiptExplorerLink {...analyzedTransaction} />

            {!contactTo && !isToWalletIOwn && (
                <Button onClick={handleClickAddContact}>
                    <UserPlusIcon className="h-6 w-6 text-white" />
                    Save Address
                </Button>
            )}
        </div>
    );
}

export default ReceiptCard;
