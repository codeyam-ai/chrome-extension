// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createSlice } from '@reduxjs/toolkit';

type AppState = {
    sendSui: {
        from: string;
        to: string;
        amount: string;
        walletIdx: number | undefined;
    };
};

const initialState: AppState = {
    sendSui: {
        from: '',
        to: '',
        amount: '',
        walletIdx: undefined,
    },
};

const slice = createSlice({
    name: 'forms',
    reducers: {
        setSuiRecipient: (
            state,
            {
                payload,
            }: {
                payload: {
                    from: string;
                    to: string;
                    walletIdx: number | undefined;
                };
            }
        ) => {
            state.sendSui.to = payload.to;
            state.sendSui.from = payload.from;
            payload.walletIdx
                ? (state.sendSui.walletIdx = payload.walletIdx)
                : (state.sendSui.walletIdx = undefined);
        },
        setSuiAmount: (state, { payload }: { payload: string }) => {
            state.sendSui.amount = payload;
        },
        resetSendSuiForm: (state) => {
            state.sendSui = initialState.sendSui;
        },
    },
    initialState,
});

export const { setSuiRecipient, setSuiAmount, resetSendSuiForm } =
    slice.actions;

export default slice.reducer;
