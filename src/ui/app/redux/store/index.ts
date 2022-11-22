// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { configureStore } from '@reduxjs/toolkit';

import { KeypairVaultMiddleware } from './middlewares/KeypairVaultMiddleware';
import { NetworkSwitchMiddleware } from './middlewares/NetworkSwitchMiddleware';
import { thunkExtras } from './thunk-extras';
import rootReducer from '_redux/RootReducer';

import type { NoInfer } from '@reduxjs/toolkit/src/tsHelpers';
import type { CombinedState, PreloadedState } from 'redux';

export function createStore(
    preloadedState: PreloadedState<CombinedState<NoInfer<unknown>>>
) {
    return configureStore({
        preloadedState: preloadedState,
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: thunkExtras,
                },
            }).concat(KeypairVaultMiddleware, NetworkSwitchMiddleware),
    });
}

const store = createStore({});

export default store;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = typeof store.dispatch;
