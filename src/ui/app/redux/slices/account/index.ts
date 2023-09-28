// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromHEX } from '@mysten/bcs';
import { type SuiMoveObject } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';

import { api, type AppThunkConfig } from '../../store/thunk-extras';
import { suiBalancesAdapterSelectors } from '../balances';
import { NFT } from '../sui-objects/NFT';
import { Ticket } from '../sui-objects/Ticket';
import { isLocked, setLocked, setUnlocked } from '_app/helpers/lock-wallet';
import { clearForNetworkOrWalletSwitch as clearBalancesForNetworkOrWalletSwitch } from '_redux/slices/balances';
import {
    clearForNetworkOrWalletSwitch as clearTokensForNetworkOrWalletSwitch,
    suiObjectsAdapterSelectors,
} from '_redux/slices/sui-objects';
import { Coin } from '_redux/slices/sui-objects/Coin';
import { generateMnemonic } from '_shared/cryptography/mnemonics';
import Authentication from '_src/background/Authentication';
import { PERMISSIONS_STORAGE_KEY } from '_src/background/Permissions';
import { CUSTOMIZE_ID } from '_src/data/dappsMap';
import {
    AccountType,
    MNEMONIC_TEST,
    PASSPHRASE_TEST,
} from '_src/shared/constants';
import {
    deleteEncrypted,
    getEncrypted,
    setEncrypted,
} from '_src/shared/storagex/store';
import KeypairVault from '_src/ui/app/KeypairVault';
import { type ZkData } from '_src/ui/app/components/zklogin/ZKLogin';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { AUTHENTICATION_REQUESTED } from '_src/ui/app/pages/initialize/hosted';

import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '_redux/RootReducer';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

export type InitialAccountInfo = {
    address: string | null;
    authentication: string | null;
    zkData: ZkData | null;
    mnemonic: string | null;
    passphrase: string | null;
    accountInfos: AccountInfo[];
    activeAccountIndex: number;
    locked: boolean;
    accountType: AccountType;
    importNames: { mnemonics: string[]; privateKeys: string[] };
    onboarding: boolean;
};

export const loadAccountInformationFromStorage = createAsyncThunk(
    'account/loadAccountInformation',
    async (_args, { getState }): Promise<InitialAccountInfo> => {
        let activeAccountIndex = 0;
        let address = null;

        const retrievedOnboarding = await getEncrypted({
            key: 'onboarding',
            session: false,
            strong: false,
        });
        const onboarding =
            retrievedOnboarding === null
                ? true
                : JSON.parse(retrievedOnboarding);

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
                address,
                authentication: authentication || null,
                zkData: null,
                passphrase: null,
                mnemonic: null,
                accountInfos,
                activeAccountIndex,
                locked: false,
                accountType,
                importNames: {
                    mnemonics: [],
                    privateKeys: [],
                },
                onboarding,
            };
        }

        const passphrase =
            (await getEncrypted({
                key: 'passphrase',
                session: true,
                strong: false,
            })) ?? undefined;

        const zkDataSerialized = await getEncrypted({
            key: 'zk',
            session: true,
            strong: false,
        });

        const zkData = zkDataSerialized
            ? JSON.parse(JSON.parse(zkDataSerialized))
            : null;

        if (zkData) {
            address = zkData.address as string;
        }

        if (!zkData && (!passphrase || passphrase.length === 0)) {
            // if (!passphrase || passphrase.length === 0) {
            return {
                address,
                authentication: null,
                zkData: null,
                passphrase: null,
                mnemonic: null,
                accountInfos: [],
                activeAccountIndex: 0,
                locked: false,
                accountType,
                importNames: {
                    mnemonics: [],
                    privateKeys: [],
                },
                onboarding,
            };
        }

        const mnemonic = await getEncrypted({
            key: 'mnemonic',
            session: false,
            passphrase,
            strong: true,
        });

        let accountInfos: AccountInfo[] = JSON.parse(
            (await getEncrypted({
                key: 'accountInfos',
                session: false,
                strong: false,
            })) || '[]'
        );

        // Temporary migration fix - remove after 6/15/2023 (search for this date for related code)
        for (let i = 0; i < accountInfos.length; ++i) {
            if (
                accountInfos[i].importedLedgerIndex !== undefined &&
                accountInfos[i].ledgerAccountIndex === undefined
            ) {
                accountInfos[i].index = accountInfos[i].index + 1;
                accountInfos[i].ledgerAccountIndex =
                    (accountInfos[i].importedLedgerIndex ?? 0) + 1;
                accountInfos[i].importedLedgerIndex = undefined;
            }
            if (!accountInfos[i].publicKey && mnemonic) {
                const keypairVault = new KeypairVault();
                keypairVault.mnemonic = mnemonic;
                accountInfos[i].publicKey =
                    keypairVault
                        .getKeyPair(accountInfos[i].index)
                        ?.getPublicKey()
                        .toBase64() ?? '';
            }
        }

        const importNames = JSON.parse(
            (await getEncrypted({
                key: 'importNames',
                session: false,
                strong: false,
                passphrase,
            })) || '{ "mnemonics": [], "privateKeys": [] }'
        );

        activeAccountIndex = parseInt(
            (await getEncrypted({
                key: 'activeAccountIndex',
                session: false,
                strong: false,
            })) || '0'
        );

        if (!accountInfos.find((a) => a.index === activeAccountIndex)) {
            activeAccountIndex = accountInfos[0]?.index ?? 0;
        }

        if (mnemonic) {
            const keypairVault = new KeypairVault();
            keypairVault.mnemonic = mnemonic;

            let activeSeed: { address: string; seed: string } | undefined =
                undefined;
            if (accountInfos.length === 0) {
                accountInfos = [
                    {
                        index: 0,
                        nickname: 'Wallet',
                        color: getNextWalletColor(0),
                        emoji: getNextEmoji(0),
                        address: keypairVault.getAddress(0) ?? '',
                        publicKey: keypairVault
                            .getKeyPair(0)
                            ?.getPublicKey()
                            .toBase64(),
                    },
                ];
                activeSeed = {
                    address: keypairVault.getAddress(0) ?? '',
                    seed: (keypairVault.getSeed(0) ?? '').toString(),
                };
            } else {
                for (let i = 0; i < accountInfos.length; i++) {
                    if (
                        accountInfos[i].importedMnemonicName ||
                        accountInfos[i].importedPrivateKeyName ||
                        accountInfos[i].ledgerAccountIndex !== undefined
                    ) {
                        continue;
                    }
                    accountInfos[i].address =
                        keypairVault.getAddress(accountInfos[i].index) ?? '';
                }

                const activeAccount = accountInfos.find(
                    (a) => a.index === activeAccountIndex
                );

                if (activeAccount?.importedMnemonicName) {
                    const importedKeyPairVault = new KeypairVault();

                    const importedMnemonic = await getEncrypted({
                        key: `importedMnemonic${activeAccount.importedMnemonicName}`,
                        session: false,
                        strong: true,
                        passphrase,
                    });

                    if (importedMnemonic) {
                        importedKeyPairVault.mnemonic = importedMnemonic;

                        const index = activeAccount.importedMnemonicIndex;
                        activeSeed = {
                            address:
                                importedKeyPairVault.getAddress(index) ?? '',
                            seed: (
                                importedKeyPairVault.getSeed(index) || ''
                            ).toString(),
                        };
                    }
                } else if (activeAccount?.importedPrivateKeyName) {
                    const importedPrivateKey = await getEncrypted({
                        key: `importedPrivateKey${activeAccount.importedPrivateKeyName}`,
                        session: false,
                        strong: true,
                        passphrase,
                    });

                    if (importedPrivateKey) {
                        const secretKey = fromHEX(importedPrivateKey);
                        const importedKeyPair =
                            Ed25519Keypair.fromSecretKey(secretKey);

                        activeSeed = {
                            address: importedKeyPair
                                .getPublicKey()
                                .toSuiAddress(),
                            seed: secretKey.toString(),
                        };
                    }
                } else if (activeAccount?.ledgerAccountIndex !== undefined) {
                    activeSeed = undefined;
                } else {
                    activeSeed = {
                        address:
                            keypairVault.getAddress(activeAccountIndex) ?? '',
                        seed: (
                            keypairVault.getSeed(activeAccountIndex) || ''
                        ).toString(),
                    };
                }
            }

            await setEncrypted({
                key: 'accountInfos',
                value: JSON.stringify(accountInfos),
                session: false,
                strong: false,
            });
            await setEncrypted({
                key: 'activeSeed',
                value: JSON.stringify(activeSeed ?? '{}'),
                session: true,
                strong: false,
            });
        }

        const {
            account: { locked: alreadyLocked },
        } = getState() as RootState;

        // TODO: This seems unnecessary; if the redux state is locked, we shouldn't have to then delete the data.
        //  Deleting the data happens first, and later the redux state is updated
        if (alreadyLocked && passphrase) {
            await setLocked(passphrase);
        }

        if (passphrase && (await isLocked(passphrase))) {
            return {
                address,
                authentication: null,
                passphrase: passphrase || null,
                mnemonic: mnemonic || null,
                zkData,
                accountInfos,
                activeAccountIndex,
                locked: true,
                accountType,
                importNames,
                onboarding,
            };
        }

        return {
            address,
            authentication: authentication || null,
            passphrase: passphrase || null,
            mnemonic: mnemonic || null,
            zkData,
            accountInfos,
            activeAccountIndex,
            locked: false,
            accountType,
            importNames,
            onboarding,
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
        {
            existingMnemonic,
            name,
        }: { existingMnemonic?: string; name?: string },
        { getState }
    ): Promise<string | null> => {
        const mnemonic = existingMnemonic || generateMnemonic();

        const {
            account: { passphrase },
        } = getState() as RootState;

        await setEncrypted({
            key: 'mnemonic-test',
            value: MNEMONIC_TEST,
            session: false,
            strong: false,
            passphrase: mnemonic,
        });
        if (passphrase) {
            await setEncrypted({
                key: `mnemonic`,
                value: mnemonic,
                session: false,
                strong: true,
                passphrase,
            });

            await setEncrypted({
                key: 'passphraseEncryptedWithMnemonic',
                value: passphrase,
                strong: false,
                session: false,
                passphrase: mnemonic,
            });
        }

        return mnemonic;
    }
);

export const saveImportedMnemonic = createAsyncThunk(
    'account/saveImportedMnemonic',
    async (
        { mnemonic, name }: { mnemonic: string; name: string },
        { getState }
    ): Promise<string | null> => {
        const {
            account: { passphrase, importNames },
        } = getState() as RootState;
        const mutableImportNames = JSON.parse(JSON.stringify(importNames));

        if (passphrase) {
            if (name) {
                mutableImportNames.mnemonics.push(name);
                await setEncrypted({
                    key: 'importNames',
                    value: JSON.stringify(mutableImportNames),
                    session: false,
                    strong: false,
                    passphrase,
                });
            }

            await setEncrypted({
                key: `importedMnemonic${name ?? ''}`,
                value: mnemonic,
                session: false,
                strong: true,
                passphrase,
            });
        }

        return name;
    }
);

export const saveImportedPrivateKey = createAsyncThunk(
    'account/saveImportedPrivateKey',
    async (
        { privateKey, name }: { privateKey: string; name: string },
        { getState }
    ): Promise<string | null> => {
        const {
            account: { passphrase, importNames },
        } = getState() as RootState;
        const mutableImportNames = JSON.parse(JSON.stringify(importNames));

        if (passphrase) {
            if (name) {
                mutableImportNames.privateKeys.push(name);
                await setEncrypted({
                    key: `importNames`,
                    value: JSON.stringify(mutableImportNames),
                    session: false,
                    strong: false,
                    passphrase,
                });
            }

            await setEncrypted({
                key: `importedPrivateKey${name ?? ''}`,
                value: privateKey,
                session: false,
                strong: true,
                passphrase,
            });
        }

        return name;
    }
);

export const getImportedMnemonic = createAsyncThunk(
    'account/getImportedMnemonic',
    async (
        { name }: { name: string },
        { getState }
    ): Promise<string | null> => {
        const {
            account: { passphrase },
        } = getState() as RootState;

        if (passphrase) {
            const mnemonic = await getEncrypted({
                key: `importedMnemonic${name ?? ''}`,
                session: false,
                strong: true,
                passphrase,
            });

            return mnemonic;
        }

        return null;
    }
);

export const getImportedPrivateKey = createAsyncThunk(
    'account/getImportedPrivateKey',
    async (
        { name }: { name: string },
        { getState }
    ): Promise<string | null> => {
        const {
            account: { passphrase },
        } = getState() as RootState;

        if (passphrase) {
            const privateKey = await getEncrypted({
                key: `importedPrivateKey${name ?? ''}`,
                session: false,
                strong: true,
                passphrase,
            });

            return privateKey;
        }

        return null;
    }
);

export const deleteImportedMnemonic = createAsyncThunk(
    'account/deleteImportedMnemonic',
    async ({ name }: { name: string }, { getState }) => {
        const {
            account: { passphrase, importNames, accountInfos },
        } = getState() as RootState;

        if (passphrase) {
            const mutableImportNames = JSON.parse(JSON.stringify(importNames));
            let mutableAccountInfos = JSON.parse(JSON.stringify(accountInfos));

            mutableImportNames.mnemonics = mutableImportNames.mnemonics.filter(
                (mnemonicName: string) => mnemonicName !== name
            );

            mutableAccountInfos = mutableAccountInfos.filter(
                (accountInfo: AccountInfo) =>
                    accountInfo.importedMnemonicName !== name
            );

            await setEncrypted({
                key: 'importNames',
                value: JSON.stringify(mutableImportNames),
                session: false,
                strong: false,
                passphrase,
            });

            await deleteEncrypted({
                key: `importedMnemonic${name ?? ''}`,
                session: false,
                strong: true,
                passphrase,
            });

            await setEncrypted({
                key: 'accountInfos',
                value: JSON.stringify(mutableAccountInfos),
                session: false,
                strong: false,
            });

            return {
                importNames: mutableImportNames,
                accountInfos: mutableAccountInfos,
            };
        }

        return null;
    }
);

export const deleteImportedPrivateKey = createAsyncThunk(
    'account/deleteImportedPrivateKey',
    async ({ name }: { name: string }, { getState }) => {
        const {
            account: { passphrase, importNames, accountInfos },
        } = getState() as RootState;

        if (passphrase) {
            const mutableImportNames = JSON.parse(JSON.stringify(importNames));
            let mutableAccountInfos = JSON.parse(JSON.stringify(accountInfos));

            mutableImportNames.privateKeys =
                mutableImportNames.privateKeys.filter(
                    (privateKey: string) => privateKey !== name
                );

            mutableAccountInfos = mutableAccountInfos.filter(
                (accountInfo: AccountInfo) =>
                    accountInfo.importedPrivateKeyName !== name
            );

            await setEncrypted({
                key: 'importNames',
                value: JSON.stringify(mutableImportNames),
                session: false,
                strong: false,
                passphrase,
            });

            await deleteEncrypted({
                key: `importedPrivateKey${name ?? ''}`,
                session: false,
                strong: true,
                passphrase,
            });

            await setEncrypted({
                key: 'accountInfos',
                value: JSON.stringify(mutableAccountInfos),
                session: false,
                strong: false,
            });

            return {
                importNames: mutableImportNames,
                accountInfos: mutableAccountInfos,
            };
        }

        return null;
    }
);

export const saveAuthentication = createAsyncThunk(
    'account/setAuthentication',
    async (
        authentication: string | null,
        { getState }
    ): Promise<string | null> => {
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

export const deleteZk = createAsyncThunk('account/deleteZk', async () => {
    await deleteEncrypted({
        key: 'zk',
        session: true,
        strong: false,
    });

    await deleteEncrypted({
        key: 'account-type',
        session: true,
        strong: false,
    });
});

export const setZk = createAsyncThunk(
    'account/setZk',
    async (zkData: ZkData): Promise<ZkData> => {
        const serializedZkData = JSON.stringify({
            ...zkData,
            epkBigInt: zkData.epkBigInt.toString(),
            randomness: zkData.randomness.toString(),
            salt: zkData.salt.toString(),
        });
        await setEncrypted({
            key: 'zk',
            value: JSON.stringify(serializedZkData),
            strong: false,
            session: true,
        });

        await setEncrypted({
            key: 'account-type',
            value: AccountType.ZK,
            strong: false,
            session: false,
        });
        return zkData;
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
        await clearTokensForNetworkOrWalletSwitch();
        await clearBalancesForNetworkOrWalletSwitch();
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
            account: { mnemonic, importNames },
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

        for (const name of importNames.mnemonics) {
            const importedMnemonic = await getEncrypted({
                key: `importedMnemonic${name}`,
                session: false,
                strong: true,
                passphrase: currentPassword,
            });
            if (importedMnemonic) {
                await deleteEncrypted({
                    key: `importedMnemonic${name}`,
                    session: false,
                    strong: true,
                    passphrase: currentPassword,
                });
                await setEncrypted({
                    key: `importedMnemonic${name}`,
                    value: importedMnemonic,
                    session: false,
                    strong: true,
                    passphrase: newPassword,
                });
            }
        }

        for (const name of importNames.privateKeys) {
            const importedPrivateKey = await getEncrypted({
                key: `importedPrivateKey${name}`,
                session: false,
                strong: true,
                passphrase: currentPassword,
            });
            if (importedPrivateKey) {
                await deleteEncrypted({
                    key: `importedPrivateKey${name}`,
                    session: false,
                    strong: true,
                    passphrase: currentPassword,
                });
                await setEncrypted({
                    key: `importedPrivateKey${name}`,
                    value: importedPrivateKey,
                    session: false,
                    strong: true,
                    passphrase: newPassword,
                });
            }
        }

        await deleteEncrypted({
            key: 'importNames',
            session: false,
            strong: false,
            passphrase: currentPassword,
        });
        await setEncrypted({
            key: 'importNames',
            value: JSON.stringify(importNames),
            session: false,
            strong: false,
            passphrase: newPassword,
        });

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

        await deleteEncrypted({
            key: 'passphrase-test',
            session: false,
            strong: false,
            passphrase: currentPassword,
        });
        await setEncrypted({
            key: 'passphrase-test',
            value: PASSPHRASE_TEST,
            session: false,
            strong: false,
            passphrase: newPassword,
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
                        nickname: 'Wallet',
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

            await setEncrypted({
                key: 'passphraseEncryptedWithMnemonic',
                value: passphrase,
                strong: false,
                session: false,
                passphrase: mnemonic,
            });
        }
        return passphrase;
    }
);

export const reset = createAsyncThunk(
    'account/reset',
    async (_args, { getState }): Promise<void> => {
        const {
            account: { passphrase, importNames },
        } = getState() as RootState;
        await setEncrypted({
            key: 'onboarding',
            session: false,
            strong: false,
            value: 'true',
        });

        if (passphrase) {
            for (const name of importNames.mnemonics || []) {
                await deleteEncrypted({
                    key: `importedMnemonic${name}`,
                    passphrase,
                    session: false,
                    strong: true,
                });
            }
            for (const name of importNames.privateKeys || []) {
                await deleteEncrypted({
                    key: `importedPrivateKey${name}`,
                    passphrase,
                    session: false,
                    strong: true,
                });
            }
            await deleteEncrypted({
                key: 'importNames',
                session: false,
                strong: false,
                passphrase,
            });
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
            await deleteEncrypted({
                key: 'activeSeed',
                session: true,
                strong: false,
            });
        }
        await deleteEncrypted({
            key: 'authentication',
            session: true,
            strong: false,
        });
        await deleteEncrypted({
            key: 'zk',
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
        await deleteEncrypted({
            key: 'account-type',
            session: false,
            strong: false,
        });

        setTimeout(() => window.location.reload(), 500);
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

const isMnemonicCorrect = async (mnemonic: string) => {
    const mnemonicTest = await getEncrypted({
        key: 'mnemonic-test',
        session: false,
        passphrase: mnemonic,
        strong: false,
    });

    return mnemonicTest === MNEMONIC_TEST;
};

const getPasswordEncryptedWithMnemonic = async (mnemonic: string) => {
    const passphrase = await getEncrypted({
        key: 'passphraseEncryptedWithMnemonic',
        session: false,
        strong: false,
        passphrase: mnemonic,
    });

    return passphrase;
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

export const unlockWithMnemonic: AsyncThunk<
    string | null,
    string,
    AppThunkConfig
> = createAsyncThunk<string | null, string, AppThunkConfig>(
    'account/unlockWithMnemonic',
    async (mnemonic): Promise<string | null> => {
        const unlockResult = await isMnemonicCorrect(mnemonic);
        if (!unlockResult) {
            return null;
        }
        const passphrase = await getPasswordEncryptedWithMnemonic(mnemonic);

        if (passphrase) {
            await setEncrypted({
                key: 'passphrase',
                value: passphrase,
                strong: false,
                session: true,
            });

            setUnlocked(passphrase);
            return passphrase;
        }
        return null;
    }
);

export const completeOnboarding: AsyncThunk<void, void, AppThunkConfig> =
    createAsyncThunk<void, void, AppThunkConfig>(
        'account/completeOnboarding',
        async () => {
            await setEncrypted({
                key: 'onboarding',
                session: false,
                strong: false,
                value: 'false',
            });
        }
    );

export const loadFavoriteDappsKeysFromStorage = createAsyncThunk(
    'account/getFavoriteDappsKeys',
    async (): Promise<string[]> => {
        const favoriteDappsKeys = JSON.parse(
            (await getEncrypted({
                key: 'favoriteDappsKeys',
                session: false,
                strong: false,
            })) || '[]'
        );

        return favoriteDappsKeys;
    }
);

export const saveFavoriteDappsKeys = createAsyncThunk(
    'account/setFavoriteDappsKeys',
    async (favoriteDappsKeys: string[]): Promise<string[]> => {
        if (!favoriteDappsKeys.includes(CUSTOMIZE_ID)) {
            favoriteDappsKeys.push(CUSTOMIZE_ID);
        }

        await setEncrypted({
            key: 'favoriteDappsKeys',
            value: JSON.stringify(favoriteDappsKeys),
            session: false,
            strong: false,
        });

        return favoriteDappsKeys;
    }
);

export const loadExcludedDappsKeysFromStorage = createAsyncThunk(
    'account/getExcludedDappsKeys',
    async (): Promise<string[]> => {
        const excludedFavoriteDappsKeys = JSON.parse(
            (await getEncrypted({
                key: 'excludedDappsKeys',
                session: false,
                strong: false,
            })) || '[]'
        );

        return excludedFavoriteDappsKeys;
    }
);

export const saveExcludedDappsKeys = createAsyncThunk(
    'account/saveExcludedDappsKeys',
    async (excludedDappsKeys: string[]): Promise<string[]> => {
        await setEncrypted({
            key: 'excludedDappsKeys',
            value: JSON.stringify(excludedDappsKeys),
            session: false,
            strong: false,
        });

        return excludedDappsKeys;
    }
);

export const loadCustomizationsSyncPreference = createAsyncThunk(
    'account/getCustomizationsSyncPreference',
    async (): Promise<boolean> => {
        const isCustomizationSyncEnabled = await getEncrypted({
            key: 'customizationSync',
            session: false,
            strong: false,
        });

        return isCustomizationSyncEnabled === 'true';
    }
);

export const saveCustomizationsSyncPreference = createAsyncThunk(
    'account/saveCustomizationsSyncPreference',
    async (isCustomizationSyncEnabled: boolean): Promise<boolean> => {
        await setEncrypted({
            key: 'customizationSync',
            value: isCustomizationSyncEnabled.toString(),
            session: false,
            strong: false,
        });

        return isCustomizationSyncEnabled;
    }
);

export type AccountState = {
    loading: boolean;
    authentication: string | null;
    zkData: ZkData | null;
    email: string | null;
    mnemonic: string | null;
    passphrase: string | null;
    creating: boolean;
    createdMnemonic: string | null;
    address: string | null;
    accountInfos: AccountInfo[];
    activeAccountIndex: number;
    accountType: AccountType;
    locked: boolean;
    favoriteDappsKeys: string[];
    excludedDappsKeys: string[];
    customizationsSyncPreference: boolean;
    importNames: { mnemonics: string[]; privateKeys: string[] };
    ledgerConnected: boolean;
    onboarding: boolean;
};

const initialState: AccountState = {
    loading: true,
    authentication: null,
    zkData: null,
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
    favoriteDappsKeys: [],
    excludedDappsKeys: [],
    customizationsSyncPreference: false,
    importNames: {
        mnemonics: [],
        privateKeys: [],
    },
    ledgerConnected: false,
    onboarding: true,
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
        setZk: (state, action: PayloadAction<ZkData>) => {
            state.zkData = action.payload;
        },
        deleteZk: (state) => {
            state.zkData = null;
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
        lockWalletUI: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                if (state.authentication) {
                    state.onboarding = true;
                    deleteEncrypted({
                        key: 'onboarding',
                        session: false,
                        strong: false,
                    });
                }

                state.authentication = null;
            } else {
                state.locked = true;
            }
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

                    const address =
                        action.payload.address ??
                        (state.accountInfos.find(
                            (accountInfo) =>
                                (accountInfo.index || 0) ===
                                state.activeAccountIndex
                        )?.address ||
                            null);
                    state.address = address;
                    state.accountType = action.payload.accountType;
                    state.importNames = action.payload.importNames;
                    state.locked = action.payload.locked;
                    state.onboarding = action.payload.onboarding;
                    state.zkData = action.payload.zkData;
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
            .addCase(setZk.fulfilled, (state, action) => {
                state.zkData = action.payload;
                state.address = action.payload.address;
                state.accountType = AccountType.ZK;
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
            })
            .addCase(completeOnboarding.fulfilled, (state) => {
                state.onboarding = false;
            })
            .addCase(
                loadFavoriteDappsKeysFromStorage.fulfilled,
                (state, action) => {
                    state.favoriteDappsKeys = action.payload;
                }
            )
            .addCase(
                loadExcludedDappsKeysFromStorage.fulfilled,
                (state, action) => {
                    state.excludedDappsKeys = action.payload;
                }
            )
            .addCase(saveFavoriteDappsKeys.fulfilled, (state, action) => {
                state.favoriteDappsKeys = action.payload;
            })
            .addCase(saveExcludedDappsKeys.fulfilled, (state, action) => {
                state.excludedDappsKeys = action.payload;
            })
            .addCase(
                loadCustomizationsSyncPreference.fulfilled,
                (state, action) => {
                    state.customizationsSyncPreference = action.payload;
                }
            )
            .addCase(
                saveCustomizationsSyncPreference.fulfilled,
                (state, action) => {
                    state.customizationsSyncPreference = action.payload;
                }
            )
            .addCase(saveImportedMnemonic.fulfilled, (state, action) => {
                state.importNames.mnemonics.push(action.payload || '');
            })
            .addCase(saveImportedPrivateKey.fulfilled, (state, action) => {
                state.importNames.privateKeys.push(action.payload || '');
            })
            .addCase(deleteImportedMnemonic.fulfilled, (state, action) => {
                if (action.payload) {
                    state.importNames = action.payload.importNames;
                    state.accountInfos = action.payload.accountInfos;

                    const activeAccountIndex = state.accountInfos.findIndex(
                        (accountInfo) => accountInfo.address === state.address
                    );

                    if (activeAccountIndex === -1) {
                        state.address = state.accountInfos[0]?.address || null;
                        state.activeAccountIndex =
                            state.accountInfos[0]?.index || 0;
                    }
                }
            })
            .addCase(deleteImportedPrivateKey.fulfilled, (state, action) => {
                if (action.payload) {
                    state.importNames = action.payload.importNames;
                    state.accountInfos = action.payload.accountInfos;

                    const activeAccountIndex = state.accountInfos.findIndex(
                        (accountInfo) => accountInfo.address === state.address
                    );

                    if (activeAccountIndex === -1) {
                        state.address = state.accountInfos[0]?.address || null;
                        state.activeAccountIndex =
                            state.accountInfos[0]?.index || 0;
                    }
                }
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
                    owner &&
                    typeof owner === 'object' &&
                    ('ObjectOwner' in owner ||
                        ('AddressOwner' in owner &&
                            owner.AddressOwner === address))
            );
        }
        return [];
    }
);

export const balances = createSelector(
    suiBalancesAdapterSelectors.selectAll,
    activeAccountSelector,
    (balances) => balances
);

export const accountCoinsSelector = createSelector(
    ownedObjects,
    (allSuiObjects) => {
        return allSuiObjects
            .filter(Coin.isCoin)
            .map((aCoin) => aCoin.content as SuiMoveObject);
    }
);

export const accountAggregateBalancesSelector = createSelector(
    balances,
    (balances) =>
        balances.reduce((acc, balance) => {
            acc[balance.coinType] = BigInt(balance.totalBalance);
            return acc;
        }, {} as Record<string, bigint>)
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
        return allSuiObjects
            .filter((anObj) => !Coin.isCoin(anObj) && NFT.isNFT(anObj))
            .sort((a, b) => a.index - b.index);
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
