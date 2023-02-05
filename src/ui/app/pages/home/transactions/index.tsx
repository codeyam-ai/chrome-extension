// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { QueueListIcon } from '@heroicons/react/24/solid';
import { memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '_hooks';
import {
    getTransactionsByAddress,
    TxResultState,
} from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import Button from '_src/ui/app/shared/button';
import { type FormattedTxResultState } from './FormattedTxResultState';

const TransactionsPage = () => {
    const address = useAppSelector(({ account }) => account.address);
    const [transactions, setTransactions] = useState<string[]>([]);
    const [items, setItems] = useState<FormattedTxResultState[]>([]);
    const dispatch = useAppDispatch();
    const txPerPage = 5;
    const totalNumTxs = transactions.length;
    const [showBtn, setShowBtn] = useState(true);
    const [page, setPage] = useState(1);
    const [txs, setTxs] = useState<string[]>([]);
    const [nextPage, setNextPage] = useState(1);

    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    console.log('txByAddress', txByAddress);

    if (items.length !== txByAddress.length) {
        if (items.length > 0) {
            setItems([...items, ...txByAddress]);
        } else {
            setItems(txByAddress);
        }
    }

    const loadItems = useCallback(async () => {
        if (items.length > 0) {
            setNextPage(page + 1);
        }

        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;
        const newTxs = transactions.slice(start, end);

        console.log('transactions: ', transactions, start, end);

        setTxs([...txs, ...newTxs]);
        setPage(nextPage);

        if (newTxs && newTxs.length > 0) {
            dispatch(getTransactionsByAddress(newTxs));
        }

        if (
            (nextPage && nextPage * txPerPage >= totalNumTxs) ||
            (showBtn && transactions.length < txPerPage)
        ) {
            setShowBtn(false);
        }
    }, [address, items.length, page, txPerPage, totalNumTxs, txs]);

    useEffect(() => {
        const getTxs = async () => {
            console.log('fired.');
            let transactions: string[] =
                await api.instance.fullNode.getTransactionsForAddress(
                    address as string,
                    true
                );

            transactions = transactions.filter(
                (value, index, self) => self.indexOf(value) === index
            );

            setTransactions(transactions);

            if (address) {
                loadItems();
            }
        };

        getTxs();
    }, []);

    const loadMore = useCallback(() => {
        loadItems();
    }, [page, txs, transactions, items, totalNumTxs]);

    return (
        <>
            <button onClick={loadMore}>load</button>
            <Loading loading={false} big={true}>
                {txs && txs.length ? (
                    <div className={'flex flex-col h-full'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={items} />
                        {showBtn && (
                            <div
                                className={
                                    'w-full flex flex-row items-center justify-center'
                                }
                            >
                                <Button
                                    mode={'secondary'}
                                    className={'mt-4'}
                                    onClick={loadMore}
                                >
                                    Load More
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <EmptyPageState
                        iconWithNoClasses={
                            <Icon displayIcon={<QueueListIcon />} />
                        }
                        title="No transactions yet"
                        subtitle="Set up DevNet SUI tokens to send coins."
                        linkText="Get SUI"
                        linkUrl="/tokens"
                        internal={true}
                    />
                )}
            </Loading>
        </>
    );
};

export default memo(TransactionsPage);
