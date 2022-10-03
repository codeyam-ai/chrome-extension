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

function TransactionsPage() {
    const dispatch = useAppDispatch();
    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );
    const loading = useAppSelector(({ txresults }) => txresults.loading);

    useEffect(() => {
        dispatch(getTransactionsByAddress()).unwrap();
    }, [dispatch]);

    return txByAddress && txByAddress.length ? (
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
        <div className={st.container}>
            <div className="text-center my-auto text-gray-900 dark:text-white">
                <Loading loading={loading} className="">
                    <div className="w-full">
                        {/* Tailwind hero icon: */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 mx-auto mb-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg leading-6 font-medium">
                        No transactions yet
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Get set up with DevNet Sui tokens to send some
                            coins.
                        </p>
                        <p className="mt-2">
                            <a
                                href="https://docs.sui.io/build/devnet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-700 hover:text-purple-800 dark:text-violet-400 dark:hover:text-violet-300"
                            >
                                Learn how →
                            </a>
                        </p>
                    </div>
                </Loading>
            </div>
        </div>
    );
}

export default memo(TransactionsPage);
