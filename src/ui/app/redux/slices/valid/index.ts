import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import Browser from 'webextension-polyfill';

import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const invalidPackagesAdapter = createEntityAdapter<string>({
    selectId: (type: string) => type.split('::')[0],
});

export const fetchInvalidPackages = createAsyncThunk<
    string[] | null,
    void,
    AppThunkConfig
>('valid/fetch-invalid-packages', async () => {
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

interface ValidInitialState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    invalidPackages: string[];
}

const initialState = invalidPackagesAdapter.getInitialState<ValidInitialState>({
    loading: true,
    error: false,
    invalidPackages: [],
});

const slice = createSlice({
    name: 'balances',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvalidPackages.fulfilled, (state, action) => {
                if (action.payload) {
                    Browser.storage.local.set({
                        invalidPackages: action.payload,
                    });
                    invalidPackagesAdapter.setAll(state, action.payload);
                    state.loading = false;
                    state.error = false;
                }
            })
            .addCase(fetchInvalidPackages.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchInvalidPackages.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            );
    },
});

export default slice.reducer;

// export const { clearForNetworkOrWalletSwitch } = slice.actions;

export const suiBalancesAdapterSelectors = invalidPackagesAdapter.getSelectors(
    (state: RootState) => state.valid
);
