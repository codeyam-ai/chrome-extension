// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo } from 'react';

import AccountAddress from '_components/account-address';
import Icon from '_components/icon';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import { useObjectsState } from '_hooks';

import type { ReactNode } from 'react';

import st from './ObjectsLayout.module.scss';
import Alert from '../../shared/feedback/Alert';

export type ObjectsLayoutProps = {
    children: ReactNode;
    emptyMsg: string;
    totalItems: number;
};

function ObjectsLayout({ children, emptyMsg, totalItems }: ObjectsLayoutProps) {
    const { loading, error, showError, syncedOnce } = useObjectsState();
    const showEmptyNotice = syncedOnce && !totalItems;
    const showItems = syncedOnce && totalItems;
    return (
        <div className={st.container}>
            <div>
                <span className={st.title}>Active Account:</span>
                <AccountAddress />
            </div>
            <div className={st.items}>
                {showError && error ? (
                    <div className="px-6 py-6">
                        <Alert
                            title="Something's wrong"
                            subtitle="You've lost connection with the network. DevNet may be unstable. Please try again later."
                        />
                    </div>
                ) : null}
                {showItems ? children : null}
                {showEmptyNotice ? (
                    <div className={st.empty}>
                        <Icon icon="droplet" className={st['empty-icon']} />
                        <div className={st['empty-text']}>{emptyMsg}</div>
                    </div>
                ) : null}
                {loading ? (
                    <div className={st.loader}>
                        <LoadingIndicator />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default memo(ObjectsLayout);
