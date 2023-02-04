// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { QueueListIcon } from '@heroicons/react/24/solid';
import { memo, useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
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
    const txPerPage = 10;
    const totalNumTxs = transactions.length;
    const [showBtn, setShowBtn] = useState(true);
    const [page, setPage] = useState(1);
    const [txs, setTxs] = useState(transactions.slice(0, txPerPage));

    console.log('address: ', address);

    const getCurrentItems = () => {
        let nextPage = page;

        if (items.length > 0) {
            nextPage = page + 1;
        }

        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;

        console.log('transactions: ', transactions);

        const newTxs = transactions.slice(start, end);

        setTxs([...txs, ...newTxs]);
        setPage(nextPage as number);

        console.log('newtxs: ', newTxs);

        if (newTxs && newTxs.length > 0) {
            const getCurrentItems = async () => {
                return await getTransactionsByAddress(newTxs);
            };

            const getItems = getCurrentItems();

            getItems.then((items) => {
                console.log('items: ', items);
            });
        }

        if (nextPage && nextPage * txPerPage >= totalNumTxs) {
            setShowBtn(false);
        }
    };

    useEffect(() => {
        const getTxs = async () => {
            if (address) {
                let transactions: string[] =
                    await api.instance.fullNode.getTransactionsForAddress(
                        address,
                        true
                    );

                transactions = transactions.filter(
                    (value, index, self) => self.indexOf(value) === index
                );

                return transactions;
            }
        };

        getTxs().then((txs) => {
            setTransactions(txs as string[]);
            getCurrentItems();
        });
    }, []);

    const loadMore = useCallback(() => {
        getCurrentItems();
    }, [getCurrentItems]);

    if (showBtn && transactions.length < txPerPage) {
        setShowBtn(false);
    }

    console.log('txs: ', txs);

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
