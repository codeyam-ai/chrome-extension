// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';

import { api, type AppThunkConfig } from '../../store/thunk-extras';
import { NFT } from '../sui-objects/NFT';
import { Ticket } from '../sui-objects/Ticket';
import { isLocked, setLocked, setUnlocked } from '_app/helpers/lock-wallet';
import {
    clearForNetworkOrWalletSwitch,
    suiObjectsAdapterSelectors,
} from '_redux/slices/sui-objects';
import { Coin } from '_redux/slices/sui-objects/Coin';
import { generateMnemonic } from '_shared/cryptography/mnemonics';
import Authentication from '_src/background/Authentication';
import { PERMISSIONS_STORAGE_KEY } from '_src/background/Permissions';
import { AccountType, PASSPHRASE_TEST } from '_src/shared/constants';
import {
    deleteEncrypted,
    getEncrypted,
    setEncrypted,
} from '_src/shared/storagex/store';
import KeypairVault from '_src/ui/app/KeypairVault';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { AUTHENTICATION_REQUESTED } from '_src/ui/app/pages/initialize/hosted';

import type { SuiAddress, SuiMoveObject } from '@mysten/sui.js';
import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '_redux/RootReducer';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

type InitialAccountInfo = {
    authentication: string | null;
    mnemonic: string | null;
    passphrase: string | null;
    accountInfos: AccountInfo[];
    activeAccountIndex: number;
    locked: boolean;
    accountType: AccountType;
};

export const loadAccountInformationFromStorage = createAsyncThunk(
    'account/loadAccountInformation',
    async (_args, { getState }): Promise<InitialAccountInfo> => {
        let activeAccountIndex = 0;

        const accountTypeString = ((await getEncrypted({
            key: 'account-type',
            session: false,
            strong: false,
        })) || AccountType.UNINITIALIZED) as keyof typeof AccountType;
        const accountType = AccountType[accountTypeString];

        let authentication = await getEncrypted({
            key: 'authentication',
            session: true,
            strong: false,
        });

        if (authentication) {
            let accountInfos: AccountInfo[] = [];
            if (authentication !== AUTHENTICATION_REQUESTED) {
                Authentication.set(authentication);
                accountInfos = await Authentication.getAccountInfos();
                activeAccountIndex = parseInt(
                    (await getEncrypted({
                        key: 'activeAccountIndex',
                        session: false,
                        strong: false,
                    })) || '0'
                );

                if (!accountInfos || !accountInfos.length) {
                    authentication = null;
                }

                if (activeAccountIndex >= (accountInfos?.length || 0)) {
                    activeAccountIndex = (accountInfos?.length || 1) - 1;
                }
            }

            return {
                authentication: authentication || null,
                passphrase: null,
                mnemonic: null,
                accountInfos,
                activeAccountIndex,
                locked: false,
                accountType,
            };
        }

        const passphrase = await getEncrypted({
            key: 'passphrase',
            session: true,
            strong: false,
        });
        if (!passphrase || passphrase.length === 0) {
            return {
                authentication: null,
                passphrase: null,
                mnemonic: null,
                accountInfos: [],
                activeAccountIndex: 0,
                locked: false,
                accountType,
            };
        }

        const mnemonic = await getEncrypted({
            key: 'mnemonic',
            session: false,
            passphrase,
            strong: true,
        });
        let accountInfos = JSON.parse(
            (await getEncrypted({
                key: 'accountInfos',
                session: false,
                strong: false,
            })) || '[]'
        );

        if (mnemonic) {
            const keypairVault = new KeypairVault();
            keypairVault.mnemonic = mnemonic;

            let seeds = [];
            if (accountInfos.length === 0) {
                accountInfos = [
                    {
                        index: 0,
                        name: 'Wallet',
                        color: getNextWalletColor(0),
                        emoji: getNextEmoji(0),
                        address: keypairVault.getAddress(0),
                    },
                ];
                seeds = [
                    {
                        address: keypairVault.getAddress(0),
                        seed: (keypairVault.getSeed(0) || '').toString(),
                    },
                ];
            } else {
                for (let i = 0; i < accountInfos.length; i++) {
                    accountInfos[i].address = keypairVault.getAddress(i);
                    seeds.push({
                        address: keypairVault.getAddress(i),
                        seed: (keypairVault.getSeed(i) || '').toString(),
                    });
                }
            }

            await setEncrypted({
                key: 'accountInfos',
                value: JSON.stringify(accountInfos),
                session: false,
                strong: false,
            });
            await setEncrypted({
                key: 'seeds',
                value: JSON.stringify(seeds),
                session: true,
                strong: false,
            });
        }

        activeAccountIndex = parseInt(
            (await getEncrypted({
                key: 'activeAccountIndex',
                session: false,
                strong: false,
            })) || '0'
        );

        if (activeAccountIndex >= (accountInfos?.length || 0)) {
            activeAccountIndex = (accountInfos?.length || 1) - 1;
        }

        const {
            account: { locked: alreadyLocked },
        } = getState() as RootState;

        // TODO: This seems unnecessary; if the redux state is locked, we shouldn't have to then delete the data.
        //  Deleting the data happens first, and later the redux state is updated
        if (alreadyLocked) {
            await setLocked(passphrase);
        }

        if (await isLocked(passphrase)) {
            return {
                authentication: null,
                passphrase: passphrase || null,
                mnemonic: mnemonic || null,
                accountInfos,
                activeAccountIndex,
                locked: true,
                accountType,
            };
        }

        return {
            authentication: authentication || null,
            passphrase: passphrase || null,
            mnemonic: mnemonic || null,
            accountInfos,
            activeAccountIndex,
            locked: false,
            accountType,
        };
    }
);

export const getEmail = createAsyncThunk(
    'account/getEmail',
    async (): Promise<string | null> => {
        return await getEncrypted({
            key: 'email',
            session: false,
            strong: false,
        });
    }
);

export const createMnemonic = createAsyncThunk(
    'account/createMnemonic',
    async (
        existingMnemonic: string | undefined,
        { getState }
    ): Promise<string | null> => {
        const mnemonic = existingMnemonic || generateMnemonic();

        const {
            account: { passphrase },
        } = getState() as RootState;
        if (passphrase) {
            await setEncrypted({
                key: 'mnemonic',
                value: mnemonic,
                session: false,
                strong: true,
                passphrase,
            });
        }

        return mnemonic;
    }
);

export const saveAuthentication = createAsyncThunk(
    'account/setAuthentication',
    async (authentication: string | null, { getState }) => {
        if (!authentication) {
            await deleteEncrypted({
                key: 'authentication',
                session: true,
                strong: false,
            });
        } else {
            await setEncrypted({
                key: 'authentication',
                value: authentication,
                strong: false,
                session: true,
            });

            await setEncrypted({
                key: 'account-type',
                value: AccountType.EMAIL,
                strong: false,
                session: false,
            });
        }
        return authentication;
    }
);

export const saveAccountInfos = createAsyncThunk(
    'account/setAccountInfos',
    async (accountInfos: AccountInfo[]): Promise<AccountInfo[]> => {
        await setEncrypted({
            key: 'accountInfos',
            value: JSON.stringify(accountInfos),
            session: false,
            strong: false,
        });

        return accountInfos;
    }
);

export const saveActiveAccountIndex = createAsyncThunk(
    'account/setActiveAccountIndex',
    async (activeAccountIndex: number, { getState }): Promise<number> => {
        await setEncrypted({
            key: 'activeAccountIndex',
            value: activeAccountIndex.toString(),
            session: false,
            strong: false,
        });
        await clearForNetworkOrWalletSwitch();
        api.resetSignerInstance();
        return activeAccountIndex;
    }
);

export const saveEmail = createAsyncThunk(
    'account/setEmail',
    async (email: string | null) => {
        if (!email) {
            await deleteEncrypted({
                key: 'email',
                session: false,
                strong: false,
            });
        } else {
            await setEncrypted({
                key: 'email',
                value: email,
                strong: false,
                session: false,
            });
        }
        return email;
    }
);

export const changePassword: AsyncThunk<
    boolean,
    { currentPassword: string; newPassword: string },
    AppThunkConfig
> = createAsyncThunk<
    boolean,
    { currentPassword: string; newPassword: string },
    AppThunkConfig
>(
    'account/changePassword',
    async (
        { currentPassword, newPassword },
        { extra: { keypairVault }, getState }
    ) => {
        if (!isPasswordCorrect(currentPassword)) {
            return false;
        }

        const {
            account: { mnemonic },
        } = getState() as RootState;

        if (mnemonic) {
            await deleteEncrypted({
                key: 'mnemonic',
                session: false,
                strong: true,
                passphrase: currentPassword,
            });
            await setEncrypted({
                key: 'mnemonic',
                value: mnemonic,
                session: false,
                strong: true,
                passphrase: newPassword,
            });
        }

        await deleteEncrypted({
            key: 'passphrase',
            session: true,
            strong: false,
            passphrase: currentPassword,
        });
        await setEncrypted({
            key: 'passphrase',
            value: newPassword,
            strong: false,
            session: true,
        });

        await setLocked(currentPassword);
        await setUnlocked(newPassword);

        return true;
    }
);

export const savePassphrase: AsyncThunk<
    string | null,
    string | null,
    AppThunkConfig
> = createAsyncThunk<string | null, string | null, AppThunkConfig>(
    'account/setPassphrase',
    async (passphrase, { extra: { keypairVault }, getState }) => {
        if (!passphrase) {
            deleteEncrypted({
                key: 'passphrase',
                session: true,
                strong: false,
            });
            return null;
        }

        await setEncrypted({
            key: 'passphrase',
            value: passphrase,
            strong: false,
            session: true,
        });

        await setEncrypted({
            key: 'passphrase-test',
            value: PASSPHRASE_TEST,
            session: false,
            strong: false,
            passphrase,
        });

        await setEncrypted({
            key: 'account-type',
            value: AccountType.PASSWORD,
            strong: false,
            session: false,
        });

        await setUnlocked(passphrase);

        const {
            account: { mnemonic },
        } = getState() as RootState;

        if (passphrase && mnemonic) {
            await setEncrypted({
                key: 'mnemonic',
                value: mnemonic,
                session: false,
                strong: true,
                passphrase,
            });
            await setEncrypted({
                key: 'accountInfos',
                value: JSON.stringify([
                    {
                        index: 0,
                        name: 'Wallet',
                        color: getNextWalletColor(0),
                        emoji: getNextEmoji(0),
                        address: keypairVault.getAddress() || '',
                    },
                ]),
                session: false,
                strong: false,
            });
            await setEncrypted({
                key: 'seeds',
                value: JSON.stringify([
                    {
                        address: keypairVault.getAddress() || '',
                        seed: (keypairVault.getSeed() || '').toString(),
                    },
                ]),
                session: true,
                strong: false,
            });
        }
        return passphrase;
    }
);

export const reset = createAsyncThunk(
    'account/reset',
    async (_args, { getState }): Promise<void> => {
        const {
            account: { passphrase },
        } = getState() as RootState;
        if (passphrase) {
            await deleteEncrypted({
                key: 'passphrase',
                session: true,
                strong: false,
            });
            await deleteEncrypted({
                key: 'mnemonic',
                passphrase,
                session: false,
                strong: true,
            });
            await deleteEncrypted({
                key: 'accountInfos',
                session: false,
                strong: false,
            });
        }
        await deleteEncrypted({
            key: 'authentication',
            session: true,
            strong: false,
        });
        await deleteEncrypted({ key: 'email', session: false, strong: false });
        await deleteEncrypted({
            key: 'activeAccountIndex',
            session: false,
            strong: false,
        });
        await deleteEncrypted({
            key: PERMISSIONS_STORAGE_KEY,
            session: false,
            strong: false,
        });

        window.location.reload();
    }
);

const isPasswordCorrect = async (password: string) => {
    const passphraseTest = await getEncrypted({
        key: 'passphrase-test',
        session: false,
        passphrase: password,
        strong: false,
    });

    if (passphraseTest !== PASSPHRASE_TEST) return false;

    return true;
};

export const assertPasswordIsCorrect: AsyncThunk<
    boolean,
    string | null,
    AppThunkConfig
> = createAsyncThunk<boolean, string | null, AppThunkConfig>(
    'account/assertPasswordIsCorrect',
    async (passphrase): Promise<boolean> => {
        return await isPasswordCorrect(passphrase || '');
    }
);

export const unlock: AsyncThunk<string | null, string | null, AppThunkConfig> =
    createAsyncThunk<string | null, string | null, AppThunkConfig>(
        'account/unlock',
        async (passphrase): Promise<string | null> => {
            if (passphrase) {
                const isCorrect = await isPasswordCorrect(passphrase);
                if (isCorrect) {
                    await setEncrypted({
                        key: 'passphrase',
                        value: passphrase,
                        strong: false,
                        session: true,
                    });

                    setUnlocked(passphrase);
                    return passphrase;
                }
            }
            return null;
        }
    );

type AccountState = {
    loading: boolean;
    authentication: string | null;
    email: string | null;
    mnemonic: string | null;
    passphrase: string | null;
    creating: boolean;
    createdMnemonic: string | null;
    address: SuiAddress | null;
    accountInfos: AccountInfo[];
    activeAccountIndex: number;
    accountType: AccountType;
    locked: boolean;
};

const initialState: AccountState = {
    loading: true,
    authentication: null,
    email: null,
    mnemonic: null,
    passphrase: null,
    creating: false,
    createdMnemonic: null,
    address: null,
    accountInfos: [],
    activeAccountIndex: 0,
    accountType: AccountType.UNINITIALIZED,
    locked: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setMnemonic: (state, action: PayloadAction<string | null>) => {
            state.mnemonic = action.payload;
        },
        changePassword: (state, action: PayloadAction<string | null>) => {
            state.passphrase = action.payload;
        },
        setPassphrase: (state, action: PayloadAction<string | null>) => {
            state.passphrase = action.payload;
        },
        setAddress: (state, action: PayloadAction<string | null>) => {
            state.address = action.payload;
        },
        setAuthentication: (state, action: PayloadAction<string | null>) => {
            state.authentication = action.payload;
        },
        setAccountInfos: (state, action: PayloadAction<AccountInfo[]>) => {
            state.accountInfos = action.payload;
        },
        setActiveAccountIndex: (state, action: PayloadAction<number>) => {
            state.activeAccountIndex = action.payload;
        },
        setEmail: (state, action: PayloadAction<string | null>) => {
            state.email = action.payload;
        },
        lockWalletUI: (state, action: PayloadAction) => {
            state.locked = true;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(
                loadAccountInformationFromStorage.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.authentication = action.payload.authentication;
                    state.passphrase = action.payload.passphrase;
                    state.mnemonic = action.payload.mnemonic;
                    state.accountInfos = action.payload.accountInfos;
                    state.activeAccountIndex =
                        action.payload.activeAccountIndex || 0;

                    state.address =
                        state.accountInfos.find(
                            (accountInfo) =>
                                (accountInfo.index || 0) ===
                                state.activeAccountIndex
                        )?.address || null;
                    state.accountType = action.payload.accountType;
                    state.locked = action.payload.locked;
                }
            )
            .addCase(createMnemonic.pending, (state) => {
                state.creating = true;
            })
            .addCase(createMnemonic.fulfilled, (state, action) => {
                state.creating = false;
                state.createdMnemonic = action.payload;
            })
            .addCase(createMnemonic.rejected, (state) => {
                state.creating = false;
                state.createdMnemonic = null;
            })
            .addCase(savePassphrase.fulfilled, (state, action) => {
                state.passphrase = action.payload;
            })
            .addCase(saveAccountInfos.fulfilled, (state, action) => {
                state.accountInfos = action.payload;
            })
            .addCase(saveActiveAccountIndex.fulfilled, (state, action) => {
                state.activeAccountIndex = action.payload;
                state.address =
                    state.accountInfos.find(
                        (accountInfo: AccountInfo) =>
                            (accountInfo.index || 0) ===
                            state.activeAccountIndex
                    )?.address || null;
            })
            .addCase(saveAuthentication.fulfilled, (state, action) => {
                state.authentication = action.payload;
            })
            .addCase(saveEmail.fulfilled, (state, action) => {
                state.email = action.payload;
            })
            .addCase(unlock.fulfilled, (state, action) => {
                state.locked = !action.payload;
                if (!state.locked) {
                    state.loading = true;
                }
                state.passphrase = action.payload;
            }),
});

export const { setMnemonic, setAddress, setAccountInfos, lockWalletUI } =
    accountSlice.actions;

export default accountSlice.reducer;

export const activeAccountSelector = ({ account }: RootState) =>
    account.address;

export const ownedObjects = createSelector(
    suiObjectsAdapterSelectors.selectAll,
    activeAccountSelector,
    (objects, address) => {
        if (address) {
            return objects.filter(
                ({ owner }) =>
                    typeof owner === 'object' &&
                    'AddressOwner' in owner &&
                    owner.AddressOwner === address
            );
        }
        return [];
    }
);

export const accountCoinsSelector = createSelector(
    ownedObjects,
    (allSuiObjects) => {
        return allSuiObjects
            .filter(Coin.isCoin)
            .map((aCoin) => aCoin.content as SuiMoveObject);
    }
);

// return an aggregate balance for each coin type
export const accountAggregateBalancesSelector = createSelector(
    accountCoinsSelector,
    (coins) => {
        return coins.reduce((acc, aCoin) => {
            const coinType = Coin.getCoinTypeArg(aCoin);
            if (coinType) {
                if (typeof acc[coinType] === 'undefined') {
                    acc[coinType] = BigInt(0);
                }
                acc[coinType] += Coin.getBalance(aCoin);
            }
            return acc;
        }, {} as Record<string, bigint>);
    }
);

// return a list of balances for each coin object for each coin type
export const accountItemizedBalancesSelector = createSelector(
    accountCoinsSelector,
    (coins) => {
        return coins.reduce((acc, aCoin) => {
            const coinType = Coin.getCoinTypeArg(aCoin);
            if (coinType) {
                if (typeof acc[coinType] === 'undefined') {
                    acc[coinType] = [];
                }
                acc[coinType].push(Coin.getBalance(aCoin));
            }
            return acc;
        }, {} as Record<string, bigint[]>);
    }
);

export const accountNftsSelector = createSelector(
    ownedObjects,
    (allSuiObjects) => {
        return allSuiObjects.filter(
            (anObj) => !Coin.isCoin(anObj) && NFT.isNFT(anObj)
        );
    }
);

export const accountTicketsSelector = createSelector(
    ownedObjects,
    (allSuiObjects) => {
        return allSuiObjects.filter(
            (anObj) => !Coin.isCoin(anObj) && Ticket.isTicket(anObj) && anObj
        );
    }
);
