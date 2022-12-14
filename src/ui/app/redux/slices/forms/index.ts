// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createSlice } from '@reduxjs/toolkit';

type AppState = {
    sendSui: {
        from: string;
        to: string;
        amount: string;
        gasFee: string | undefined;
    };
};

const initialState: AppState = {
    sendSui: {
        from: '',
        to: '',
        amount: '',
        gasFee: undefined,
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
                };
            }
        ) => {
            state.sendSui.to = payload.to;
            state.sendSui.from = payload.from;
        },
        setSuiAmount: (
            state,
            {
                payload,
            }: {
                payload: {
                    amount: string;
                    gasFee: string;
                };
            }
        ) => {
            state.sendSui.amount = payload.amount;
            state.sendSui.gasFee = payload.gasFee;
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
