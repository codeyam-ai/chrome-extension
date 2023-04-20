import { QueueListIcon } from '@heroicons/react/24/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '_hooks';
import Loading from '_src/ui/app/components/loading';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { queryTransactionsByAddress } from '_src/ui/app/hooks/useQueryTransactionsByAddress';
import Button from '_src/ui/app/shared/buttons/Button';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import Alert from '_src/ui/app/shared/feedback/Alert';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

const TransactionsPage = () => {
    const [activePage, setActivePage] = useState(0);
    const address = useAppSelector(({ account }) => account.address);
    const [formattedTxns, setFormattedTxns] = useState<FormattedTransaction[]>(
        []
    );

    const fetchTransactions = async ({ pageParam = '' }) => {
        const response = await queryTransactionsByAddress(
            address || '', // address
            pageParam[0] || undefined, // cursor for the 'from' txs
            pageParam[1] || undefined, // cursor for the 'to' txs
            10 // page size limit
        );

        return response;
    };

    const {
        data: suiTxns,
        error,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(['query-transactions'], fetchTransactions, {
        enabled: !!address,
        refetchInterval: 5000,
    });

    const loadPage = useCallback(async () => {
        if (!suiTxns?.pages[activePage]) return;

        setFormattedTxns((prev) => {
            const newTransactionDigests = suiTxns?.pages[0].blocks.map(
                (x) => x.analyzedTransaction.digest
            );
            let newTransactionsLength = 0;
            for (const newTranasctionDigest of newTransactionDigests) {
                if (
                    prev.find(
                        (x) =>
                            x.analyzedTransaction.digest ===
                            newTranasctionDigest
                    )
                ) {
                    break;
                }
                newTransactionsLength++;
            }
            const newTransactions = suiTxns?.pages[0].blocks.slice(
                0,
                newTransactionsLength
            );

            const newX = suiTxns?.pages[activePage].blocks ?? [];
            const lastX = prev.slice(newX.length * -1) ?? [];

            const newXDigests = newX.map((x) => x.analyzedTransaction.digest);
            const lastXDigests = lastX.map((x) => x.analyzedTransaction.digest);

            if (_.isEqual(newXDigests, lastXDigests)) {
                if (newTransactions.length === 0) {
                    return prev;
                }

                return [...newTransactions, ...prev];
            }

            return _.uniqBy(
                [...newTransactions, ...prev, ...newX],
                (x) => x.analyzedTransaction.digest
            );
        });
    }, [suiTxns, activePage]);

    // load a page of "formatted transactions"
    useEffect(() => {
        if (!address) {
            return;
        }

        loadPage();
    }, [suiTxns, address, loadPage]);

    const incrementPage = useCallback(() => {
        if (
            (suiTxns && suiTxns.pages[activePage]?.toHasNext) ||
            (suiTxns && suiTxns.pages[activePage]?.fromHasNext)
        ) {
            fetchNextPage({
                pageParam: [
                    suiTxns.pages[activePage].toNextPageCursor,
                    suiTxns.pages[activePage].fromPageCursor,
                ],
            });

            setActivePage((prev) => prev + 1);
        }
    }, [suiTxns, activePage, fetchNextPage]);

    if (error && formattedTxns.length === 0) {
        return (
            <div className="p-6">
                <Alert
                    title={'We could not retrieve your transactions'}
                    subtitle={'Please try again later.'}
                    borderRadius={16}
                />
            </div>
        );
    }

    return (
        <React.Fragment>
            <Loading loading={!suiTxns} big={true}>
                {formattedTxns.length > 0 && (
                    <div className={'flex flex-col'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={formattedTxns} />
                    </div>
                )}
                <div>
                    {isFetchingNextPage && (
                        <div className={'pb-8'}>
                            <LoadingIndicator />
                        </div>
                    )}
                    {suiTxns?.pages[activePage]?.toHasNext && (
                        <div
                            className={
                                'w-full flex flex-row items-center justify-center'
                            }
                        >
                            <Button
                                buttonStyle={'secondary'}
                                onClick={incrementPage}
                            >
                                Load more
                            </Button>
                        </div>
                    )}
                </div>

                {suiTxns && suiTxns.pages[0].blocks.length === 0 && (
                    <EmptyPageState
                        iconWithNoClasses={
                            <Icon displayIcon={<QueueListIcon />} />
                        }
                        title="No transactions yet"
                        subtitle="Set up SUI tokens to send coins."
                        linkText="Get SUI"
                        linkUrl="/home"
                        internal={true}
                    />
                )}
            </Loading>
        </React.Fragment>
    );
};

export default memo(TransactionsPage);
