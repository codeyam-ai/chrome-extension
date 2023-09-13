import Authentication from 'src/background/Authentication';

import {
    type InitialAccountInfo,
    loadAccountInformationFromStorage,
} from '../index';
import { AccountType } from '_src/shared/constants';
import { getEncrypted } from '_src/shared/storagex/store';

describe('loadAccountInformationFromStorage Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Test Case 1: Test when authentication is not null and authentication is not equal to AUTHENTICATION_REQUESTED', async () => {
        // Setup mocks for this test case
        (getEncrypted as jest.Mock)
            .mockReturnValueOnce('SOME_ACCOUNT_TYPE')
            .mockReturnValueOnce('SOME_AUTHENTICATION')
            .mockReturnValueOnce('0')
            .mockReturnValueOnce('[]');

        (Authentication.getAccountInfos as jest.Mock).mockReturnValueOnce([]);

        const result: InitialAccountInfo =
            await loadAccountInformationFromStorage(undefined, {
                getState: jest.fn(() => ({ account: { locked: false } })),
            });

        // Expectations for this test case
        expect(result).toEqual({
            authentication: 'SOME_AUTHENTICATION',
            passphrase: null,
            mnemonic: null,
            accountInfos: [],
            activeAccountIndex: 0,
            locked: false,
            accountType: AccountType.EMAIL,
            importNames: {
                mnemonics: [],
                privateKeys: [],
            },
        });
    });
});
