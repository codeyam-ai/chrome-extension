// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Browser from 'webextension-polyfill';

import { AppType } from './AppType';
import { fetchAllBalances } from '../balances';
import { API_ENV, DEFAULT_API_ENV } from '_app/ApiProvider';
import { fetchAllOwnedAndRequiredObjects } from '_redux/slices/sui-objects';
// import { getTransactionsByAddress } from '_redux/slices/txresults';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { QueryClient } from '@tanstack/react-query';
import type { AppThunkConfig } from '_store/thunk-extras';

type AppState = {
    appType: AppType;
    apiEnv: API_ENV;
    navVisible: boolean;
    customRPC?: string | null;
    activeOrigin: string | null;
    activeOriginFavIcon: string | null;
};

const initialState: AppState = {
    appType: AppType.unknown,
    apiEnv: DEFAULT_API_ENV,
    customRPC: null,
    navVisible: true,
    activeOrigin: null,
    activeOriginFavIcon: null,
};

export const getRPCNetwork = createAsyncThunk<API_ENV, void, AppThunkConfig>(
    'changeRPCNetwork',
    (_, { getState }) => {
        const {
            app: { apiEnv },
        } = getState();
        return apiEnv;
    }
);

// On network change, set setNewJsonRpcProvider, fetch all owned objects, and fetch all transactions
// TODO: add clear Object state because edge cases where use state stays in cache
export const changeRPCNetwork = createAsyncThunk<
    void,
    { apiEnv: API_ENV; queryClient: QueryClient },
    AppThunkConfig
>(
    'changeRPCNetwork',
    ({ apiEnv, queryClient }, { extra: { api }, dispatch, getState }) => {
        const { app } = getState();
        const isCustomRPC = apiEnv === API_ENV.customRPC;
        const customRPCURL =
            app?.customRPC && isCustomRPC ? app?.customRPC : null;

        // don't switch if customRPC and empty input //handle default
        if (isCustomRPC && !customRPCURL) return;

        // Set persistent network state
        Browser.storage.local.set({ sui_Env: apiEnv });

        dispatch(setApiEnv(apiEnv));

        api.setNewJsonRpcProvider(apiEnv, undefined, customRPCURL, queryClient);

        // dispatch(getTransactionsByAddress());
        dispatch(fetchAllBalances());
        dispatch(fetchAllOwnedAndRequiredObjects());
    }
);

export const setCustomRPC = createAsyncThunk<
    void,
    { customRPC: string; queryClient: QueryClient },
    AppThunkConfig
>('setCustomRPC', ({ customRPC, queryClient }, { dispatch }) => {
    // Set persistent network state
    Browser.storage.local.set({ sui_Env_RPC: customRPC });
    dispatch(setCustomRPCURL(customRPC));
    dispatch(changeRPCNetwork({ apiEnv: API_ENV.customRPC, queryClient }));
});

export const initNetworkFromStorage = createAsyncThunk<
    void,
    QueryClient,
    AppThunkConfig
>(
    'initNetworkFromStorage',
    async (queryClient, { dispatch, extra: { api } }) => {
        const result = await Browser.storage.local.get([
            'sui_Env',
            'sui_Env_RPC',
        ]);

        const isValidCustomRPC = result?.sui_Env_RPC?.length > 0;

        const network =
            result.sui_Env === API_ENV.customRPC && !isValidCustomRPC
                ? DEFAULT_API_ENV
                : result.sui_Env;

        const customRPCURL =
            network === API_ENV.customRPC && isValidCustomRPC
                ? result.sui_Env_RPC
                : null;

        if (result.sui_Env_RPC && customRPCURL) {
            dispatch(
                setCustomRPC({ customRPC: result.sui_Env_RPC, queryClient })
            );
        } else if (result.sui_Env) {
            dispatch(changeRPCNetwork({ apiEnv: result.sui_Env, queryClient }));
        }
    }
);

const slice = createSlice({
    name: 'app',
    reducers: {
        initAppType: (state, { payload }: PayloadAction<AppType>) => {
            state.appType = payload;
        },
        setApiEnv: (state, { payload }: PayloadAction<API_ENV>) => {
            state.apiEnv = payload;
        },
        setCustomRPCURL: (state, { payload }: PayloadAction<string>) => {
            state.customRPC = payload;
        },
        setActiveOrigin: (
            state,
            {
                payload,
            }: PayloadAction<{ origin: string | null; favIcon: string | null }>
        ) => {
            state.activeOrigin = payload.origin;
            state.activeOriginFavIcon = payload.favIcon;
        },
    },
    initialState,
});

export const { initAppType, setApiEnv, setActiveOrigin, setCustomRPCURL } =
    slice.actions;

export default slice.reducer;
