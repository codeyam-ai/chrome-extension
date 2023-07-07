import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';

import type { SuiAddress } from '@mysten/sui.js';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
    address: SuiAddress;
    nickname: string;
    emoji?: string;
    color: string;
}

export const loadContactsStorage = createAsyncThunk(
    'account/loadContacts',
    async (): Promise<Contact[]> => {
        const contacts = JSON.parse(
            (await getEncrypted({
                key: 'contacts',
                session: false,
                strong: false,
            })) || '[]'
        );

        return contacts;
    }
);

export const saveContacts = createAsyncThunk(
    'account/setContacts',
    async (contacts: Contact[], { getState }): Promise<Contact[]> => {
        await setEncrypted({
            key: 'contacts',
            value: JSON.stringify(contacts),
            session: false,
            strong: false,
        });

        return contacts;
    }
);

type ContactsState = {
    contacts: Contact[];
};

const initialState: ContactsState = {
    contacts: [],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(saveContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })
            .addCase(loadContactsStorage.fulfilled, (state, action) => {
                state.contacts = action.payload;
            }),
});

export const { setContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
