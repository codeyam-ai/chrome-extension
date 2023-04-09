// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Content } from '_app/shared/bottom-menu-layout';
import ReceiptCard from '_components/receipt-card';

import st from './ReceiptPage.module.scss';

function ReceiptPage() {
    const [searchParams] = useSearchParams();
    const txDigest = searchParams.get('txdigest');

    return (
        <div>
            <div className={st.container}>
                <Content>
                    <ReceiptCard txDigest={txDigest} />
                </Content>
            </div>
        </div>
    );
}

export default ReceiptPage;
