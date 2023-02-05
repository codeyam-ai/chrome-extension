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
    const [initLoad, setInitLoad] = useState(true);
    const dispatch = useAppDispatch();
    const txPerPage = 5;
    const totalNumTxs = transactions.length;
    const [showBtn, setShowBtn] = useState(true);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    if (txByAddress.length > 0 && items.length == 0) {
        setItems(txByAddress);
        setLoading(false);
    } else if (loading && txByAddress.length > 0) {
        setItems([...items, ...txByAddress]);
        setLoading(false);
    }

    useEffect(() => {
        const getTxs = async () => {
            let allTxs: string[] =
                await api.instance.fullNode.getTransactionsForAddress(
                    address as string,
                    true
                );

            allTxs = allTxs.filter(
                (value, index, self) => self.indexOf(value) === index
            );

            if (address && allTxs.length > 0) {
                setTransactions(allTxs);
            }
        };

        if (transactions.length == 0) {
            getTxs();
        }
    }, [address, transactions]);

    const loadItems = () => {
        setLoading(true);
        setNextPage(nextPage + 1);

        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;
        const newTxs = transactions.slice(start, end);

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
    };

    const loadMore = useCallback(() => {
        loadItems();
    }, [transactions, page, nextPage, items]);

    if (initLoad && transactions.length > 0) {
        loadItems();
        setInitLoad(false);
    }

    console.log('items: ', items);

    return (
        <>
            <Loading loading={!items.length} big={true}>
                {items && items.length ? (
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
