import { RawSigner } from '@mysten/sui.js';
import { SuiClient } from '@mysten/sui.js/client';

import { deleteAllCustomizationsFromSeed } from '../deleteAllCustomizationsFromSeed';
import getJwtWithSigner from '../getJwtWithSigner';
import saveCustomization from '../saveCustomization';

// Creating mock functions for our external dependencies
// We need to do this to make sure our tests only test the functionality of deleteAllCustomizationsFromSeed
jest.mock('@mysten/sui.js', () => ({
    RawSigner: jest.fn(),
}));

jest.mock('../getJwtWithSigner', () => jest.fn());

jest.mock('../saveCustomization', () => jest.fn());

jest.mock('_src/ui/app/KeypairVault', () => {
    return jest.fn().mockImplementation(() => {
        return { 
            mnemonic: '',
            getKeyPair: jest.fn().mockImplementation(() => ({
                publicKey: 'testPublicKey',
            }))
        };
    });
});

jest.mock('@mysten/sui.js/client', () => ({
    SuiClient: jest.fn().mockImplementation(() => {
        return {
          
        };
    }),
}));

// Actual Test Block
describe('deleteAllCustomizationsFromSeed', () => {
    // Test to check if deleteAllCustomizationsFromSeed function work fine
    test('Should delete all customizations', async () => {
        // Setting up the mocks
        const mockAccountInfo = [
            { index: 1, address: 'testAddress1', publicKey: 'testPublicKey1' },
            { index: 2, address: 'testAddress2', publicKey: 'testPublicKey2' }
        ];

        const mockSuiClient = new SuiClient({ url: 'testUrl' });
        const mockMnemonic = 'test mnemonic';
        (saveCustomization as jest.Mock).mockImplementation(() => Promise.resolve(null));
        (getJwtWithSigner as jest.Mock).mockImplementation(() =>
            Promise.resolve('jwt-string')
        );
        (RawSigner as jest.Mock).mockImplementation(
            () => 'signer'
        );

        await deleteAllCustomizationsFromSeed(
            mockMnemonic,
            mockAccountInfo,
            mockSuiClient
        );

        // Assert that saveCustomization function is called right amount of times
        expect((saveCustomization as jest.Mock).mock.calls.length).toBe(2);
        expect(getJwtWithSigner).toHaveBeenCalledTimes(2);
        expect(saveCustomization).toHaveBeenCalledTimes(2);
        expect(saveCustomization).toHaveBeenCalledWith('jwt-string', 'deleted');
    });
});
