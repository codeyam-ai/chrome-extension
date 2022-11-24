// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { Content } from '_app/shared/bottom-menu-layout';
import ReceiptCard from '_components/receipt-card';
import { useAppSelector } from '_hooks';
import NavBarWithBackAndTitle from '_src/ui/app/shared/navigation/nav-bar/NavBarWithBackAndTitle';

import type { TxResultState } from '_redux/slices/txresults';

import st from './ReceiptPage.module.scss';

// Response pages for all transactions
// use txDigest for the transaction result
function ReceiptPage() {
    const [searchParams] = useSearchParams();

    // get tx results from url params
    const txDigest = searchParams.get('txdigest');

    const tranferType = searchParams.get('transfer');

    const txResults: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    const txnItem = useMemo(() => {
        return txResults.filter((txn) => txn.txId === txDigest)[0];
    }, [txResults, txDigest]);

    const linkTo = tranferType ? '/nfts' : '/transactions';

    if (!txDigest || (txResults && !txnItem)) {
        return <Navigate to={linkTo} replace={true} />;
    }

    return (
        <div className={st.container}>
            <Content>{txnItem && <ReceiptCard txDigest={txnItem} />}</Content>
        </div>
    );
}

export default ReceiptPage;
