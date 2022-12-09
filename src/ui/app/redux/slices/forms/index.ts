// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type AppState = {
    sendSui: {
        to: void;
        amount: void;
        isValid: boolean;
        dirty: boolean;
    };
};

const initialState: AppState = {
    sendSui: {
        to: undefined,
        amount: undefined,
        isValid: false,
        dirty: false,
    },
};

const slice = createSlice({
    name: 'forms',
    reducers: {
        setSuiRecipient: (state, { payload }: PayloadAction) => {
            state.sendSui.to = payload;
        },
    },
    initialState,
});

export const { setSuiRecipient } = slice.actions;

export default slice.reducer;
