import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

import { getSuiAddress } from '../nameservice';

jest.mock('@mysten/sui.js/client');

describe('getSuiAddress', () => {
    let mockSuiClient: jest.Mock;

    beforeEach(() => {
        mockSuiClient = SuiClient as jest.Mock;
        mockSuiClient.prototype.resolveNameServiceAddress = jest.fn();
    });

    it('returns the address for the provided domain', async () => {
        const domain = 'test.sten';
        const expectedAddress = '0000xaddress';

        mockSuiClient.prototype.resolveNameServiceAddress.mockResolvedValue(expectedAddress);

        const actualAddress = await getSuiAddress(domain);

        expect(getFullnodeUrl).toBeCalledWith('mainnet');
        expect(mockSuiClient.prototype.resolveNameServiceAddress).toBeCalledWith({
            name: domain,
        });
        expect(actualAddress).toEqual(expectedAddress);
    });

    it('returns null when there is an error', async () => {
        const domain = 'error.sten';

        mockSuiClient.prototype.resolveNameServiceAddress.mockRejectedValue(new Error('Network error'));

        const actualAddress = await getSuiAddress(domain);

        expect(actualAddress).toBeNull();
    });
});