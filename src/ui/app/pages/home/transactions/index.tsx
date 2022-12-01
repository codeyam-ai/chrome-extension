// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import PageScrollView from '_src/ui/app/shared/layouts/PageScrollView';
import NavBarWithSettingsAndWalletPicker from '_src/ui/app/shared/navigation/nav-bar/NavBarWithSettingsAndWalletPicker';

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
            <NavBarWithSettingsAndWalletPicker />
            <Loading loading={loading} big={true}>
                {txByAddress && txByAddress.length ? (
                    <div className={st.container}>
                        <TextPageTitle title="Activity" />
                        <PageScrollView heightInPx={348}>
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
        </>
    );
}

export default memo(TransactionsPage);
