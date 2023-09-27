import { toB64 } from '@mysten/bcs';
import { SuiClient } from '@mysten/sui.js/client';

import { EthosSigner } from '../EthosSigner';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200,
    } as Response)
);

jest.mock('@mysten/sui.js/client', () => {
    return {
        SuiClient: jest.fn().mockImplementation(() => {
            return {
                ...jest.requireActual('@mysten/sui.js/client'),
                resolveNameServiceAddress: jest.fn(),
                getRpcApiVersion: jest.fn(),
                getCoins: jest.fn(),
                getAllCoins: jest.fn(),
            };
        }),
        getFullnodeUrl: jest.fn(),
    };
});

describe('EthosSigner', () => {
    const mockFetch = global.fetch as jest.Mock;
    const client = new SuiClient({ url: 'test-url' });
    const address = 'test-address';
    const accessToken = 'test-token';
    const testSigner = new EthosSigner(address, accessToken, client);
    const data = new Uint8Array([1, 2, 3, 4, 5]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAddress should return address', async () => {
        const result = await testSigner.getAddress();
        expect(result).toEqual(address);
    });

    it('signData should call simpleApiCall and return signature', async () => {
        mockFetch.mockResolvedValueOnce(
            Promise.resolve({
                json: () => ({
                    signature: 'test-signature',
                }),
                status: 200,
            })
        );

        const result = await testSigner.signData(data);
        expect(result).toEqual('test-signature');
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            'http://localhost:3000/api/transactions/sign',
            {
                body: JSON.stringify({
                    network: 'sui',
                    walletAddress: 'test-address',
                    dataToSign: toB64(data),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Supabase-Access-Token': 'test-token',
                },
                method: 'POST',
            }
        );
    });

    it('signData should throw error if status not equal to 200', async () => {
        mockFetch.mockResolvedValueOnce(
            Promise.resolve({
                json: () => ({
                    signature: 'test-signature',
                }),
                status: 201,
            })
        );
        await expect(testSigner.signData(data)).rejects.toThrow(
            'Signing error: 201'
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('connect should return new instance of EthosSigner', () => {
        const newSigner = testSigner.connect(client);
        expect(newSigner).toBeInstanceOf(EthosSigner);
    });
});
