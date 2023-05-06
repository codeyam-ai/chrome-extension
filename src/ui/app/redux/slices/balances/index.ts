import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import type { CoinBalance } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const balancesAdapter = createEntityAdapter<CoinBalance>({
    selectId: (info) => info.coinType,
    sortComparer: (a, b) => a.coinType.localeCompare(b.coinType),
});

export const fetchAllBalances = createAsyncThunk<
    CoinBalance[],
    void,
    AppThunkConfig
>('balances/fetch-all', async (_, { getState, extra: { api } }) => {
    const state = getState();

    if (!state.balances.lastSync) {
        try {
            const response = await fetch(
                api.instance.fullNode.connection.fullnode,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'rpc.discover',
                    }),
                }
            );

            if (response.status !== 200) {
                throw new Error('RPC not responding');
            }
        } catch (e) {
            throw new Error('RPC not responding');
        }
    }

    const {
        account: { address },
    } = state;

    let allBalances: CoinBalance[] = [];

    if (address) {
        allBalances = await api.instance.fullNode.getAllBalances({
            owner: '0x9c21fc706b1453c1bc4255bea8c1b87f041afaaee7c622c98bb4178843f04ee2',
        });
    }

    return allBalances;
});

interface BalancesManualState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
}
const initialState = balancesAdapter.getInitialState<BalancesManualState>({
    loading: true,
    error: false,
    lastSync: null,
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
                    balancesAdapter.setAll(state, action.payload);
                    state.loading = false;
                    state.error = false;
                    state.lastSync = Date.now();
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
