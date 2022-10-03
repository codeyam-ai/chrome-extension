// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type {
    PreapprovalRequest,
    PreapprovalResponse,
} from '_payloads/transactions';
import type { RootState } from '_redux/RootReducer';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { AppThunkConfig } from '_store/thunk-extras';

const preapprovalRequestsAdapter = createEntityAdapter<PreapprovalRequest>({
    sortComparer: (a, b) => {
        const aDate = new Date(a.preapproval?.createdDate || Date.now());
        const bDate = new Date(b.preapproval?.createdDate || Date.now());
        return aDate.getTime() - bDate.getTime();
    },
});

export const respondToPreapprovalRequest = createAsyncThunk<
    {
        preapprovalRequestID: string;
        approved: boolean;
        preapproval: Preapproval;
    },
    {
        preapprovalRequestID: string;
        approved: boolean;
        changes: Record<string, string>;
    },
    AppThunkConfig
>(
    'respond-to-preapproval-request',
    async (
        { preapprovalRequestID, approved, changes },
        { extra: { background }, getState }
    ) => {
        const state = getState();

        const preapprovalRequest = preapprovalRequestsSelectors.selectById(
            state,
            preapprovalRequestID
        );

        if (!preapprovalRequest) {
            throw new Error(
                `TransactionRequest ${preapprovalRequestID} not found`
            );
        }

        const updatedPreapproval = {
            ...preapprovalRequest.preapproval,
            ...changes,
        } as Preapproval;

        background.sendPreapprovalResponse(
            preapprovalRequestID,
            approved,
            updatedPreapproval
        );
        return {
            preapprovalRequestID,
            approved,
            preapproval: updatedPreapproval,
        };
    }
);

export const sendPreapprovalResponse = createAsyncThunk<
    {
        response: PreapprovalResponse;
    },
    { response: PreapprovalResponse },
    AppThunkConfig
>(
    'send-preapproval-response',
    async ({ response }, { extra: { background } }) => {
        background.sendPreapprovalResponse(
            response.id,
            response.approved,
            response.preapproval
        );
        return { response };
    }
);

const slice = createSlice({
    name: 'preapproval-requests',
    initialState: preapprovalRequestsAdapter.getInitialState({
        initialized: false,
    }),
    reducers: {
        setPreapprovalRequests: (
            state,
            { payload }: PayloadAction<PreapprovalRequest[]>
        ) => {
            preapprovalRequestsAdapter.setAll(state, payload);
            state.initialized = true;
        },
    },
    extraReducers: (build) => {
        build.addCase(
            respondToPreapprovalRequest.fulfilled,
            (state, { payload }) => {
                const { preapprovalRequestID, approved, preapproval } = payload;
                preapprovalRequestsAdapter.updateOne(state, {
                    id: preapprovalRequestID,
                    changes: {
                        approved,
                        preapproval,
                    },
                });
            }
        );
    },
});

export default slice.reducer;

export const { setPreapprovalRequests } = slice.actions;

export const preapprovalRequestsSelectors =
    preapprovalRequestsAdapter.getSelectors(
        (state: RootState) => state.preapprovalRequests
    );
