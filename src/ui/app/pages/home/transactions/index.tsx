import { QueueListIcon } from '@heroicons/react/24/solid';
//import { SuiTransactionBlockResponse } from '@mysten/sui.js';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '_hooks';
import Loading from '_src/ui/app/components/loading';

//import { getTxType } from '_src/ui/app/helpers/transactions';
import { useQueryTransactionsByAddress } from '_src/ui/app/hooks/useQueryTransactionsByAddress';
import Button from '_src/ui/app/shared/button';
//import { api } from '_src/ui/app/redux/store/thunk-extras';
//import Button from '_src/ui/app/shared/button';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import Alert from '_src/ui/app/shared/feedback/Alert';

// import deduplicate from '_src/ui/app/helpers/deduplicate';
// import formatCoin from '_src/ui/app/helpers/formatCoin';
// import { getTxType } from '_src/ui/app/helpers/transactions';
// import { api } from '_src/ui/app/redux/store/thunk-extras';
// import Button from '_src/ui/app/shared/button';
//import Alert from '_src/ui/app/shared/feedback/Alert';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

const TransactionsPage = () => {
    const address = useAppSelector(({ account }) => account.address);
    const [formattedTxns, setFormattedTxns] = useState<FormattedTransaction[]>(
        []
    );

    const [cursors, setCursors] = useState({
        fromCursor: '',
        toCursor: '',
    });

    const {
        isLoading: loadingTxns,
        data: suiTxns,
        error: txErr,
    } = useQueryTransactionsByAddress(
        address || '',
        cursors.toCursor || null,
        cursors.fromCursor || null,
        10
    );

    const loadPage = useCallback(async () => {
        if (!suiTxns) return;

        setFormattedTxns((prev) => [...prev, ...suiTxns.blocks]);
    }, [suiTxns]);

    // load a page of "formatted transactions"
    useEffect(() => {
        if (!address) {
            return;
        }

        loadPage();
    }, [suiTxns, address, loadPage]);

    const incrementPage = useCallback(() => {
        if (suiTxns?.toHasNext || suiTxns?.fromHasNext) {
            setCursors({
                fromCursor: suiTxns.fromPageCursor || '',
                toCursor: suiTxns.toNextPageCursor || '',
            });
        }
    }, []);

    if (txErr) {
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
            <Loading loading={loadingTxns && !formattedTxns} big={true}>
                {suiTxns && suiTxns.blocks.length > 0 && (
                    <div className={'flex flex-col'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={formattedTxns} />
                    </div>
                )}
                <div>
                    {suiTxns?.toHasNext && (
                        <div
                            className={
                                'w-full flex flex-row items-center justify-center'
                            }
                        >
                            <Button
                                mode={'secondary'}
                                className={'mb-6'}
                                onClick={incrementPage}
                            >
                                Load More
                            </Button>
                        </div>
                    )}
                </div>

                {suiTxns && suiTxns.blocks.length === 0 && (
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
