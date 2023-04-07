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
    const [firstDigest, setFirstDigest] = useState<string>();
    const [formattedTxns, setFormattedTxns] = useState<FormattedTransaction[]>(
        []
    );

    const fetchProjects = async ({ pageParam = '' }) => {
        const response = await queryTransactionsByAddress(
            address || '', // address
            pageParam[0] || null, // cursor for the 'from' txs
            pageParam[1] || null, // cursor for the 'to' txs
            10 // page size limit
        );

        return response;
    };

    const {
        data: suiTxns,
        error,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(['query-transactions'], fetchProjects, {
        enabled: !!address,
        staleTime: 0,
        cacheTime: 0,
        refetchInterval: 3000,
    });

    const loadPage = useCallback(async () => {
        if (!suiTxns?.pages[activePage]) return;

        if (activePage === 0) {
            // Save the length of the first page to compare with
            // the length of the first page after refetching.
            setFirstDigest(
                suiTxns.pages[activePage].blocks[0].transaction.digest
            );
        }

        if (
            !firstDigest ||
            suiTxns.pages[0].blocks[0].transaction.digest === firstDigest
        ) {
            // Initial fetch or when selecting the load more button.
            // Deduplicate the transactions and set the state.
            setFormattedTxns((prev) =>
                _.uniqWith(
                    [...prev, ...suiTxns.pages[activePage].blocks],
                    _.isEqual
                )
            );
        } else {
            // Compare the length of the first page with the length
            // of the initial page. If they are different, prepend the new item.
            setFormattedTxns((prev) => [suiTxns.pages[0].blocks[0], ...prev]);
        }
    }, [suiTxns, activePage, firstDigest]);

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

    if (error) {
        return (
            <div className="pb-4">
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
                {suiTxns && suiTxns.pages[0].blocks.length > 0 && (
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
                                className={'mb-6'}
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
                        linkUrl="/tokens"
                        internal={true}
                    />
                )}
            </Loading>
        </React.Fragment>
    );
};

export default memo(TransactionsPage);
