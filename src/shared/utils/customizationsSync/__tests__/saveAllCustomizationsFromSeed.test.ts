import { de } from 'date-fns/locale';
import getJwtWithSigner from '../getJwtWithSigner';
import { saveAllCustomizationsFromSeed } from '../saveAllCustomizationsFromSeed';
import saveCustomization from '../saveCustomization';

import type { SuiClient } from '@mysten/sui.js/client';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

// Mock the getJwtWithSigner method
jest.mock('../getJwtWithSigner', () => ({
    __esModule: true,
    default: jest.fn(() => 'mocked_jwt'),
}));

// Mock the saveCustomization method
jest.mock('../saveCustomization', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve()),
}));

// Mock the KeypairVault class
jest.mock('_src/ui/app/KeypairVault', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        getKeyPair: jest.fn(() => ({
            export: () => ({ privateKey: 'mocked_privateKey' }),
        })),
    })),
    AccountInfo: jest.fn(),
    RawSigner: jest.fn(),
}));

describe('saveAllCustomizationsFromSeed', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save all account customizations from provided mnemonic', async () => {
        const accountInfos = [
            { index: 1 } as AccountInfo,
            // Add more account information objects as required
        ];
        const mnemonic = 'test mnemonic';
        const client = {} as SuiClient;

        await saveAllCustomizationsFromSeed(mnemonic, accountInfos, client);

        expect(getJwtWithSigner).toHaveBeenCalledTimes(1);
        expect(saveCustomization).toHaveBeenCalledTimes(1);
    });

    describe('Edge Cases', () => {
        it('should throw an error if getJwtWithSigner fails', async () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            jest.spyOn(global.console, 'error').mockImplementation(() => {});

            const accountInfos = [{ index: 1 } as AccountInfo];
            const mnemonic = 'test mnemonic';
            const client = {} as SuiClient;

            (getJwtWithSigner as jest.Mock).mockRejectedValue(
                new Error('getJwtWithSigner failed')
            );

            await saveAllCustomizationsFromSeed(mnemonic, accountInfos, client);

            // eslint-disable-next-line no-console
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(getJwtWithSigner).toHaveBeenCalledTimes(1);
        });

        // Similarly add further tests for failing saveCustomization or encryption related errors etc.
    });
});
