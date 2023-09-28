import { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { blake2b } from '@noble/hashes/blake2b';

import { BaseSigner } from '../BaseSigner';

jest.mock('@noble/hashes/blake2b');

describe('BaseSigner', () => {
    const keypair = new Ed25519Keypair();
    const client = new SuiClient();
    const signer = new BaseSigner(keypair, client);
    const data = new Uint8Array([1, 2, 3]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAddress should return key pair public key in Sui address format', async () => {
        const getAddressSpy = jest.spyOn(keypair, 'getPublicKey').mockReturnValue({toSuiAddress: () => 'base58check-address'});
        const result = await signer.getAddress();
        expect(result).toEqual('base58check-address');
        expect(getAddressSpy).toHaveBeenCalled();
    });

    it('signData should sign data using key pair and return serialized signature', async () => {
        const signDataSpy = jest.spyOn(keypair, 'signData').mockReturnValue(Promise.resolve(new Uint8Array([1,2,3,4])));
        const publicKeySpy = jest.spyOn(keypair, 'getPublicKey').mockReturnValue(new Uint8Array([4,5,6,7]));
        const blake2bSpy = blake2b as jest.Mock;
        blake2bSpy.mockReturnValue(new Uint8Array([8,9,10,11]));

        const result = await signer.signData(data);
        expect(result).toEqual({signature: new Uint8Array([1,2,3,4]), signatureScheme: 'ED25519', publicKey: new Uint8Array([4,5,6,7])});
        expect(signDataSpy).toHaveBeenCalledWith(new Uint8Array([8,9,10,11]));
        expect(publicKeySpy).toHaveBeenCalled();
        expect(blake2bSpy).toHaveBeenCalledWith(data, {dkLen: 32});
    });

    it('connect should return new instance of BaseSigner', () => {
        const newSigner = signer.connect(client);
        expect(newSigner).toBeInstanceOf(BaseSigner);
    });
});