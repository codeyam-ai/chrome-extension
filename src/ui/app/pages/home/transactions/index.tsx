import { QueueListIcon } from '@heroicons/react/24/solid';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { type FormattedTxResultState } from './FormattedTxResultState';
import { useAppDispatch, useAppSelector } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/button';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

import type { TxResultState } from '_redux/slices/txresults';

const TransactionsPage = () => {
    const address = useAppSelector(({ account }) => account.address);
    const [transactions, setTransactions] = useState<string[]>([]);
    const [items, setItems] = useState<FormattedTxResultState[]>([]);
    const [initLoad, setInitLoad] = useState(true);
    const dispatch = useAppDispatch();
    const txPerPage = 5;
    const totalNumTxs = transactions.length;
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    useEffect(() => {
        setItems([]);

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

            if (allTxs.length === 0) {
                setInitLoad(false);
            }
        };

        if (transactions.length === 0) {
            getTxs();
        }
    }, [address, transactions]);

    const loadItems = useCallback(() => {
        setLoading(true);
        setNextPage(nextPage + 1);

        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;
        const newTxs = transactions.slice(start, end);

        if (newTxs && newTxs.length > 0) {
            dispatch(getTransactionsByAddress(newTxs));
        }
    }, [dispatch, nextPage, transactions]);

    const loadMore = useCallback(() => {
        loadItems();
    }, [loadItems]);

    if (initLoad && transactions.length > 0) {
        loadItems();
        setInitLoad(false);
    }

    if (txByAddress.length > 0 && items.length === 0) {
        setItems(txByAddress);
        setLoading(false);
    } else if (loading && txByAddress.length > 0) {
        setItems([...items, ...txByAddress]);
        setLoading(false);
    } else if (loading && transactions.length === 0) {
        setLoading(false);
    }

    return (
        <React.Fragment>
            <Loading loading={initLoad} big={true}>
                {items && items.length > 0 && (
                    <div className={'flex flex-col h-full'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={items} />
                        {items.length !== totalNumTxs && (
                            <div
                                className={
                                    'w-full flex flex-row items-center justify-center'
                                }
                            >
                                <Button
                                    mode={'secondary'}
                                    className={'mb-6'}
                                    onClick={loadMore}
                                >
                                    {loading ? (
                                        <LoadingIndicator />
                                    ) : (
                                        'Load More'
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {!loading && items.length === 0 && (
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
        </React.Fragment>
    );
};

export default memo(TransactionsPage);
