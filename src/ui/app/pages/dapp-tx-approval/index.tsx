// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import {
    respondToTransactionRequest,
    txRequestsSelectors,
} from '_redux/slices/transaction-requests';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

import type { SuiJsonValue, TypeTag } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';

import st from './DappTxApprovalPage.module.scss';

const truncateMiddle = (s = '', length = 6) =>
    s.length > length * 2.5
        ? `${s.slice(0, length)}...${s.slice(length * -1)}`
        : s;

function toList(items: SuiJsonValue[] | TypeTag[]) {
    if (!items?.length) {
        return '-';
    }
    return (
        <ul className={st.list}>
            {items.map((anItem) => {
                const val = JSON.stringify(anItem, null, 4);
                return (
                    <li key={val} title={val} className="text-right">
                        {truncateMiddle(val, 12)}
                    </li>
                );
            })}
        </ul>
    );
}

export function DappTxApprovalPage() {
    const { txID } = useParams();
    const [details, setDetails] = useState<boolean>(false);
    const toggleDetails = useCallback(() => setDetails((prev) => !prev), []);
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const txRequestsLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );
    const txRequestSelector = useMemo(
        () => (state: RootState) =>
            (txID && txRequestsSelectors.selectById(state, txID)) || null,
        [txID]
    );
    const txRequest = useAppSelector(txRequestSelector);
    const loading = guardLoading || txRequestsLoading;
    const dispatch = useAppDispatch();
    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (txRequest) {
                await dispatch(
                    respondToTransactionRequest({
                        approved,
                        txRequestID: txRequest.id,
                    })
                );
            }
        },
        [dispatch, txRequest]
    );
    useEffect(() => {
        if (
            !loading &&
            (!txRequest || (txRequest && txRequest.approved !== null))
        ) {
            window.close();
        }
    }, [loading, txRequest]);

    // TODO: add more tx types/make it generic
    const valuesContent = useMemo(
        () =>
            txRequest?.type === 'move-call'
                ? [
                      { label: 'Transaction type', content: 'MoveCall' },
                      { label: 'Module', content: txRequest.tx.module },
                      { label: 'Function', content: txRequest.tx.function },
                      {
                          label: 'Arguments',
                          content: toList(txRequest.tx.arguments),
                      },
                      { label: 'Gas budget', content: txRequest.tx.gasBudget },
                  ]
                : [
                      {
                          label: 'Transaction type',
                          content: 'SerializedMoveCall',
                      },
                      { label: 'Contents', content: txRequest?.txBytes },
                  ],
        [txRequest]
    );
    const detailedValuesContent = useMemo(
        () =>
            txRequest?.type === 'move-call'
                ? [
                      {
                          label: 'Package',
                          content: truncateMiddle(
                              txRequest.tx.packageObjectId,
                              12
                          ),
                          title: txRequest.tx.packageObjectId,
                      },
                      {
                          label: 'Type arguments',
                          content: toList(txRequest.tx.typeArguments),
                      },
                  ]
                : [
                      {
                          label: 'Transaction type',
                          content: 'SerializedMoveCall',
                          title: '',
                      },
                      {
                          label: 'Contents',
                          content: txRequest?.txBytes,
                          title: '',
                      },
                  ],
        [txRequest]
    );

    return (
        <Loading loading={loading}>
            {txRequest ? (
                <UserApproveContainer
                    title="Transaction Request"
                    origin={txRequest.origin}
                    originFavIcon={txRequest.originFavIcon}
                    approveTitle="Approve"
                    rejectTitle="Reject"
                    onSubmit={handleOnSubmit}
                >
                    {valuesContent.map(({ label, content }) => (
                        <Fragment key={label}>
                            <div className="flex justify-between">
                                <label className="text-gray-500 dark:text-gray-400 text-sm">
                                    {label}
                                </label>
                                <div
                                    className={st.value + ' dark:text-gray-400'}
                                >
                                    {content}
                                </div>
                            </div>
                        </Fragment>
                    ))}

                    <div className="">
                        <div
                            className="cursor-pointer py-3 dark:text-gray-400"
                            onClick={toggleDetails}
                        >
                            {details ? '▼' : '▶'} Show Details
                        </div>
                        <div
                            className={
                                details + ' dark:text-gray-400' ? '' : 'hidden'
                            }
                        >
                            {detailedValuesContent.map(
                                ({ label, content, title }) => (
                                    <Fragment key={label}>
                                        <div className="flex justify-between">
                                            <label className="text-gray-500 dark:text-gray-400 text-sm">
                                                {label}
                                            </label>
                                            <div
                                                className={
                                                    st.value +
                                                    ' dark:text-gray-400'
                                                }
                                                title={title}
                                            >
                                                {content}
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            )}
                        </div>
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}
