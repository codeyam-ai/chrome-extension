import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import Browser from 'webextension-polyfill';

import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const invalidPackagesAdapter = createEntityAdapter<string>({
    selectId: (info) => info,
});

const combineValidSources = async () => {
    const { invalidPackages } = await Browser.storage.local.get({
        invalidPackages: [],
    });

    const { additions } = await Browser.storage.local.get({
        invalidPackageAdditions: [],
    });

    const { subtractions } = await Browser.storage.local.get({
        invalidPackageSubtractions: [],
    });

    if (invalidPackages.length === 0) {
        throw new Error('No valid sources found');
    }

    return invalidPackages
        .concat(additions ?? [])
        .filter((item: string) => !(subtractions ?? []).includes(item));
};

export const initializeInvalidPackages = createAsyncThunk<
    string[] | null,
    void,
    AppThunkConfig
>('valid/initialize-invalid-packages', async () => {
    try {
        const combined = await combineValidSources();
        return combined;
    } catch (e) {
        return null;
    }
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

        await Browser.storage.local.set({ invalidPackages });

        const combined = await combineValidSources();
        return combined;
    } catch (e) {
        return null;
    }
});

export const addInvalidPackage = createAsyncThunk<
    string[] | null,
    string,
    AppThunkConfig
>('valid/add-invalid-package', async (invalidPackage) => {
    try {
        const { invalidPackageAdditions } = await Browser.storage.local.get({
            invalidPackageAdditions: [],
        });

        if (!invalidPackageAdditions.includes(invalidPackage)) {
            invalidPackageAdditions.push(invalidPackage);
        }

        await Browser.storage.local.set({ invalidPackageAdditions });

        const combined = await combineValidSources();
        return combined;
    } catch (e) {
        return null;
    }
});

export const removeInvalidPackage = createAsyncThunk<
    string[] | null,
    string,
    AppThunkConfig
>('valid/remove-invalid-package', async (invalidPackage) => {
    try {
        const { invalidPackageSubtractions } = await Browser.storage.local.get({
            invalidPackageSubtractions: [],
        });

        if (!invalidPackageSubtractions.includes(invalidPackage)) {
            invalidPackageSubtractions.push(invalidPackage);
        }

        await Browser.storage.local.set({ invalidPackageSubtractions });

        const combined = await combineValidSources();
        return combined;
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
            .addCase(initializeInvalidPackages.fulfilled, (state, action) => {
                if (action.payload) {
                    invalidPackagesAdapter.setAll(state, action.payload);
                    state.invalidPackages = action.payload;
                    state.loading = false;
                    state.error = false;
                }
            })
            .addCase(initializeInvalidPackages.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                initializeInvalidPackages.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            )
            .addCase(fetchInvalidPackages.fulfilled, (state, action) => {
                if (action.payload) {
                    invalidPackagesAdapter.setAll(state, action.payload);
                    state.invalidPackages = action.payload;
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
            )
            .addCase(addInvalidPackage.fulfilled, (state, action) => {
                if (action.payload) {
                    invalidPackagesAdapter.setAll(state, action.payload);
                    state.invalidPackages = action.payload;
                }
            })
            .addCase(removeInvalidPackage.fulfilled, (state, action) => {
                if (action.payload) {
                    invalidPackagesAdapter.setAll(state, action.payload);
                    state.invalidPackages = action.payload;
                }
            });
    },
});

export default slice.reducer;

// export const { clearForNetworkOrWalletSwitch } = slice.actions;

export const suiBalancesAdapterSelectors = invalidPackagesAdapter.getSelectors(
    (state: RootState) => state.valid
);
