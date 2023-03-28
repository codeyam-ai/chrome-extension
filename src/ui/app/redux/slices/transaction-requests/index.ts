// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64, TransactionBlock } from '@mysten/sui.js';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import type {
    SignedMessage,
    SignedTransaction,
    SuiAddress,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ApprovalRequest } from '_payloads/transactions/ApprovalRequest';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const txRequestsAdapter = createEntityAdapter<ApprovalRequest>({
    sortComparer: (a, b) => {
        const aDate = new Date(a.createdDate);
        const bDate = new Date(b.createdDate);
        return aDate.getTime() - bDate.getTime();
    },
});

export const respondToTransactionRequest = createAsyncThunk<
    {
        txRequestID: string;
        approved: boolean;
        txResponse: SuiTransactionBlockResponse | null;
    },
    {
        txRequestID: string;
        approved: boolean;
        addressForTransaction: SuiAddress;
    },
    AppThunkConfig
>(
    'respond-to-transaction-request',
    async (
        { txRequestID, approved, addressForTransaction },
        { extra: { background, api, keypairVault }, getState }
    ) => {
        const state = getState();
        const txRequest = txRequestsSelectors.selectById(state, txRequestID);
        if (!txRequest) {
            throw new Error(`ApprovalRequest ${txRequestID} not found`);
        }

        let txSigned: SignedTransaction | undefined = undefined;
        let txResult: SuiTransactionBlockResponse | SignedMessage | undefined =
            undefined;
        let txResultError: string | undefined;
        if (approved) {
            const {
                account: { activeAccountIndex, authentication },
            } = getState();

            let signer;

            if (authentication) {
                signer = api.getEthosSignerInstance(
                    addressForTransaction || '',
                    authentication
                );
            } else {
                signer = api.getSignerInstance(
                    keypairVault.getKeyPair(activeAccountIndex)
                );
            }

            try {
                if (txRequest.tx.type === 'sign-message') {
                    txResult = await signer.signMessage({
                        message: fromB64(txRequest.tx.message),
                    });
                } else if (txRequest.tx.type === 'transaction') {
                    const transactionBlock = TransactionBlock.from(
                        txRequest.tx.data
                    );
                    if (txRequest.tx.justSign) {
                        // Just a signing request, do not submit
                        txSigned = await signer.signTransactionBlock({
                            transactionBlock,
                        });
                    } else {
                        txResult = await signer.signAndExecuteTransactionBlock({
                            transactionBlock,
                            options: txRequest.tx.options,
                            requestType: txRequest.tx.requestType,
                        });
                    }
                } else {
                    throw new Error(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        `Unexpected type: ${(txRequest.tx as any).type}`
                    );
                }
            } catch (e) {
                txResultError = (e as Error).message;
            }
        }
        background.sendTransactionRequestResponse(
            txRequestID,
            approved,
            txResult,
            txResultError,
            txSigned
        );
        return { txRequestID, approved: approved, txResponse: null };
    }
);

const slice = createSlice({
    name: 'transaction-requests',
    initialState: txRequestsAdapter.getInitialState({
        initialized: false,
    }),
    reducers: {
        setTransactionRequests: (
            state,
            { payload }: PayloadAction<ApprovalRequest[]>
        ) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            txRequestsAdapter.setAll(state, payload);
            state.initialized = true;
        },
    },
    extraReducers: (build) => {
        build.addCase(
            respondToTransactionRequest.fulfilled,
            (state, { payload }) => {
                const { txRequestID, approved: allowed, txResponse } = payload;
                txRequestsAdapter.updateOne(state, {
                    id: txRequestID,
                    changes: {
                        approved: allowed,
                        txResult: txResponse || undefined,
                    },
                });
            }
        );
    },
});

export default slice.reducer;

export const { setTransactionRequests } = slice.actions;

export const txRequestsSelectors = txRequestsAdapter.getSelectors(
    (state: RootState) => state.transactionRequests
);
