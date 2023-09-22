import { SuiClient } from '@mysten/sui.js/client';

import { getAllCustomizationsFromSeed } from '../getAllCustomizationsFromSeed';
import getCustomization from '../getCustomization';
import getJwtWithSigner from '../getJwtWithSigner';
import { BaseSigner } from '_src/shared/cryptography/BaseSigner';

// Mocking the necessary modules
jest.mock('../getCustomization');
jest.mock('../getJwtWithSigner');
jest.mock('_src/shared/cryptography/BaseSigner');

jest.mock('@mysten/sui.js/client', () => ({
    SuiClient: jest.fn().mockImplementation(() => {
        return {};
    }),
}));

describe('getAllCustomizationsFromSeed', () => {
    const client = new SuiClient({ url: 'testUrl' });

    beforeEach(() => {
        (getJwtWithSigner as jest.Mock).mockImplementation(() =>
            Promise.resolve('jwt')
        );
        (BaseSigner as jest.Mock).mockImplementation(() => ({
            getAddress: () => Promise.resolve('address'),
        }));
    });

    describe('with existing customizations', () => {
        beforeEach(() => {
            (getCustomization as jest.Mock).mockReturnValueOnce(
                Promise.resolve('customization')
            );
        });

        it('should return customizations', async () => {
            const customizations = await getAllCustomizationsFromSeed(
                'mnemonic',
                client
            );
            expect(customizations).toEqual({ address: 'customization' });
        });

        it('should return deleted when customization is deleted', async () => {
            (getCustomization as jest.Mock).mockImplementationOnce(() =>
                Promise.resolve('deleted')
            );
            const customizations = await getAllCustomizationsFromSeed(
                'mnemonic',
                client
            );
            expect(customizations).toBe('deleted');
        });
    });

    describe('with no customizations', () => {
        beforeEach(() => {
            (getCustomization as jest.Mock).mockReturnValueOnce(
                Promise.resolve(null)
            );
        });

        it('should break loop when no customization is returned', async () => {
            const customizations = await getAllCustomizationsFromSeed(
                'mnemonic',
                client
            );
            expect(customizations).toEqual({});
        });
    });
});
