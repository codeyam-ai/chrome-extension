// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { memo, useEffect } from 'react';

import { Content } from '_app/shared/bottom-menu-layout';
import PageTitle from '_app/shared/page-title';
import TransactionCard from '_components/transactions-card';
import { useAppSelector, useAppDispatch } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';

import type { TxResultState } from '_redux/slices/txresults';

import st from './Transactions.module.scss';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { LinkType } from '_src/enums/LinkType';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import PageScrollView from '_src/ui/app/shared/layouts/PageScrollView';

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
        <Loading loading={loading}>
            {txByAddress && txByAddress.length ? (
                <div className={st.container}>
                    <TextPageTitle title="Activity" />
                    <PageScrollView>
                        <TransactionRows transactions={txByAddress} />
                    </PageScrollView>
                </div>
            ) : (
                <EmptyPageState
                    iconWithNoClasses={<MagnifyingGlassIcon />}
                    title="No transactions yet"
                    subtitle="Set up DevNet SUI tokens to send coins."
                    linkText="Learn more"
                    linkUrl="https://docs.sui.io/build/devnet"
                />
            )}
        </Loading>
    );
}

export default memo(TransactionsPage);
