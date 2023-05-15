import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import testConnection from '../../testConnection';

import type { CoinBalance } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const balancesAdapter = createEntityAdapter<CoinBalance>({
    selectId: (info) => info.coinType,
    sortComparer: (a, b) => a.coinType.localeCompare(b.coinType),
});

export const fetchAllBalances = createAsyncThunk<
    { validBalances: CoinBalance[] | null; invalidTokens: string[] | null },
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
        return { validBalances: null, invalidTokens: null };
    }

    let invalidTokens: string[] | null = state.balances.invalidTokens ?? null;
    try {
        const invalidTokensResponse = await fetch(
            'https://raw.githubusercontent.com/EthosWallet/valid_packages/main/public/invalid_tokens.json'
        );
        invalidTokens = await invalidTokensResponse.json();
    } catch (e) {
        // Do nothing
    }

    const allBalances = await api.instance.fullNode.getAllBalances({
        owner: address,
    });

    const validBalances = allBalances.filter(
        (coinBalance) =>
            !(invalidTokens ?? []).includes(coinBalance.coinType.split('::')[0])
    );

    return { validBalances, invalidTokens };
});

interface BalancesManualState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
    invalidTokens: string[];
}
const initialState = balancesAdapter.getInitialState<BalancesManualState>({
    loading: true,
    error: false,
    lastSync: null,
    invalidTokens: [],
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
                    const { validBalances, invalidTokens } = action.payload;
                    if (validBalances) {
                        balancesAdapter.setAll(state, validBalances);
                        state.loading = false;
                        state.error = false;
                        state.lastSync = Date.now();
                    }
                    if (invalidTokens) {
                        state.invalidTokens = invalidTokens;
                    }
                }
            })
            .addCase(fetchAllBalances.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(
                fetchAllBalances.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            );
    },
});

export default slice.reducer;

export const { clearForNetworkOrWalletSwitch } = slice.actions;

export const suiBalancesAdapterSelectors = balancesAdapter.getSelectors(
    (state: RootState) => state.balances
);
