// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { QueueListIcon } from '@heroicons/react/24/solid';
import { memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import { Icon } from '_src/ui/app/shared/icons/Icon';

import type { TxResultState } from '_redux/slices/txresults';

import st from './Transactions.module.scss';

function TransactionsPage() {
    const dispatch = useAppDispatch();
    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );
    const loading = useAppSelector(({ txresults }) => txresults.loading);

    useEffect(() => {
        dispatch(getTransactionsByAddress()).unwrap();
    }, [dispatch]);

    return (
        <>
            <Loading loading={loading} big={true}>
                {txByAddress && txByAddress.length ? (
                    <div className={st.container}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={txByAddress} />
                    </div>
                ) : (
                    <EmptyPageState
                        iconWithNoClasses={
                            <Icon displayIcon={<QueueListIcon />} />
                        }
                        title="No transactions yet"
                        subtitle="Set up DevNet SUI tokens to send coins."
                        linkText="Learn more"
                        linkUrl="https://docs.sui.io/build/devnet"
                    />
                )}
            </Loading>
        </>
    );
}

export default memo(TransactionsPage);
