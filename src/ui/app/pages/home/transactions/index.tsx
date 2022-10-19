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
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

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
                    <PageTitle title="Activity" className={st.pageTitle} />
                    <Content>
                        <section className={st.txContent}>
                            {txByAddress.map((txn) => (
                                <TransactionCard txn={txn} key={txn.txId} />
                            ))}
                        </section>
                    </Content>
                </div>
            ) : (
                <div className="pt-24 text-center flex flex-col gap-2">
                    <MagnifyingGlassIcon className="h-6 w-6 mx-auto" />
                    <Subheader as="h3">No transactions yet</Subheader>
                    <Body>
                        <EthosLink to={''} type={LinkType.External}>
                            Get DevNet Sui tokens →
                        </EthosLink>
                    </Body>
                </div>
            )}
        </Loading>
    );
}

export default memo(TransactionsPage);
