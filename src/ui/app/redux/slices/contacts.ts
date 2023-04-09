import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Authentication from '_src/background/Authentication';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';
import { AUTHENTICATION_REQUESTED } from '_src/ui/app/pages/initialize/hosted';

import type { SuiAddress } from '@mysten/sui.js';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '_redux/RootReducer';

export interface Contact {
    address: SuiAddress;
    name: string;
    emoji?: string;
    color: string;
}

export const loadContactsStorage = createAsyncThunk(
    'account/loadContacts',
    async (_args, { getState }): Promise<Contact[]> => {
        const authentication = await getEncrypted({
            key: 'authentication',
            session: true,
            strong: false,
        });

        if (authentication) {
            let contacts: Contact[] = [];
            if (authentication !== AUTHENTICATION_REQUESTED) {
                Authentication.set(authentication);

                contacts = JSON.parse(
                    (await getEncrypted({
                        key: 'contacts',
                        session: false,
                        passphrase: authentication,
                        strong: false,
                    })) || '[]'
                );
            }

            return contacts;
        }

        const passphrase = await getEncrypted({
            key: 'passphrase',
            session: true,
            strong: false,
        });
        if (!passphrase || passphrase.length === 0) {
            return [];
        }
        const contacts = JSON.parse(
            (await getEncrypted({
                key: 'contacts',
                session: false,
                passphrase,
                strong: false,
            })) || '[]'
        );

        return contacts;
    }
);

export const saveContacts = createAsyncThunk(
    'account/setContacts',
    async (contacts: Contact[], { getState }): Promise<Contact[]> => {
        const {
            account: { passphrase },
        } = getState() as RootState;

        if (passphrase) {
            await setEncrypted({
                key: 'contacts',
                value: JSON.stringify(contacts),
                session: false,
                strong: false,
                passphrase,
            });
        }

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
