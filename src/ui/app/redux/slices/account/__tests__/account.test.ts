import accountSliceReducer, { type AccountState, setMnemonic } from '../index';
import { AccountType } from '_src/shared/constants';

describe('accountSlice', () => {
    it('handles setMnemonic on initial state', () => {
        const action = setMnemonic('test mnemonic');
        const state = accountSliceReducer(initialState, action);
        expect(state.mnemonic).toBe('test mnemonic');
    });

    it('handles setMnemonic when mnemonic is already set', () => {
        const existingState = {
            ...initialState,
            mnemonic: 'existing mnemonic',
        };
        const action = setMnemonic('test mnemonic');
        const state = accountSliceReducer(existingState, action);
        expect(state.mnemonic).toBe('test mnemonic');
    });

    // it('should return the address of the active account', () => {
    //     const state = {
    //       account: {
    //         ...initialState,
    //         address: '0x123',
    //       },
    //       app: {},
    //       suiObjects: {},
    //       balances: {},
    //       transactions: {},
    //       permissions: {},
    //       forms: {},

    //     };

    //     // Act
    //     const result = activeAccountSelector(state);

    //     // Assert
    //     expect(result).toEqual('0x123');
    //   });
});

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
    favoriteDappsKeys: [],
    excludedDappsKeys: [],
    customizationsSyncPreference: false,
    importNames: {
        mnemonics: [],
        privateKeys: [],
    },
    ledgerConnected: false,
};
