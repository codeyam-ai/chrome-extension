import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import Browser from 'webextension-polyfill';

import testConnection from '../../testConnection';

import type { CoinBalance } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const balancesAdapter = createEntityAdapter<CoinBalance>({
    selectId: (info) => info.coinType,
    sortComparer: (a, b) => a.coinType.localeCompare(b.coinType),
});

export const fetchAllBalances = createAsyncThunk<
    CoinBalance[] | null,
    void,
    AppThunkConfig
>('balances/fetch-all', async (_, { getState, extra: { api } }) => {
    const state = getState();

    if (!state.balances.lastSync) {
        await testConnection(api);
    }

    const {
        account: { address },
    } = state;

    if (!address) {
        return null;
    }

    const allBalances = await api.instance.fullNode.getAllBalances({
        owner: address,
    });

    let validBalances = allBalances;
    let invalidPackages = state.balances.invalidPackages;
    if (invalidPackages.length === 0) {
        invalidPackages = (await Browser.storage.local.get('invalidPackages'))
            .invalidPackages;
    }
    if (!invalidPackages) {
        invalidPackages = [];
    }
    validBalances = validBalances.filter((coinBalance) => {
        const split = coinBalance.coinType.split('::');
        return !invalidPackages.includes(split[0]);
    });

    return validBalances;
});

export const fetchInvalidPackages = createAsyncThunk<
    string[] | null,
    void,
    AppThunkConfig
>('balances/fetch-invalid-packages', async () => {
    try {
        const invalidPackagesResponse = await fetch(
            'https://raw.githubusercontent.com/EthosWallet/valid_packages/main/public/invalid_tokens.json'
        );
        const invalidPackages = await invalidPackagesResponse.json();
        return invalidPackages;
    } catch (e) {
        return null;
    }
});

interface BalancesManualState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
    invalidPackages: string[];
}

const initialState = balancesAdapter.getInitialState<BalancesManualState>({
    loading: true,
    error: false,
    lastSync: null,
    invalidPackages: [],
});

const slice = createSlice({
    name: 'balances',
    initialState: initialState,
    reducers: {
        clearForNetworkOrWalletSwitch: (state) => {
            state.error = false;
            state.lastSync = null;
            state.loading = true;
            balancesAdapter.removeAll(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBalances.fulfilled, (state, action) => {
                if (action.payload) {
                    if (action.payload) {
                        balancesAdapter.setAll(state, action.payload);
                        state.loading = false;
                        state.error = false;
                        state.lastSync = Date.now();
                    }
                }
            })
            .addCase(fetchAllBalances.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchAllBalances.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            )
            .addCase(fetchInvalidPackages.fulfilled, (state, action) => {
                if (action.payload) {
                    Browser.storage.local.set({
                        invalidPackages: action.payload,
                    });
                    state.invalidPackages = action.payload;
                }
            });
    },
});

export default slice.reducer;

export const { clearForNetworkOrWalletSwitch } = slice.actions;

export const suiBalancesAdapterSelectors = balancesAdapter.getSelectors(
    (state: RootState) => state.balances
);
