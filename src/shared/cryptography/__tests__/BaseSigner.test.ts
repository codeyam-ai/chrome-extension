import { SuiClient } from '@mysten/sui.js/client';
import * as cryptography from '@mysten/sui.js/cryptography';
import { Ed25519Keypair, type Ed25519PublicKey } from '@mysten/sui.js/keypairs/ed25519';
import * as nobleHashes from '@noble/hashes/blake2b';

import { BaseSigner } from '../BaseSigner';

describe('BaseSigner', () => {
    const blake2bSpy = jest.spyOn(nobleHashes, 'blake2b');
    const toSerializedSignatureSpy = jest.spyOn(cryptography, 'toSerializedSignature');
    const keypair = new Ed25519Keypair();
    const client = new SuiClient({ url: 'http://localhost:3000' });
    const signer = new BaseSigner(keypair, client);
    const data = new Uint8Array([1, 2, 3]);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAddress should return key pair public key in Sui address format', async () => {
        const getAddressSpy = jest.spyOn(keypair, 'getPublicKey').mockReturnValue(
            {toSuiAddress: () => 'sui-address'} as Ed25519PublicKey
        );
        const result = await signer.getAddress();
        expect(result).toEqual('sui-address');
        expect(getAddressSpy).toHaveBeenCalled();
    });

    it('signData should sign data using key pair and return serialized signature', async () => {
        const signDataSpy = jest.spyOn(keypair, 'signData').mockReturnValue(
            new Uint8Array([1,2,3,4])
        );
        
        const mockPublickKey = {
            toSuiAddress: () => 'sui-address',
            toBytes: () => new Uint8Array([4,5,6,7])
        }  as unknown as Ed25519PublicKey
        const publicKeySpy = jest.spyOn(keypair, 'getPublicKey').mockReturnValue(mockPublickKey);
        blake2bSpy.mockReturnValue(new Uint8Array([8,9,10,11]));

        const result = await signer.signData(data);
        expect(result).toEqual('AAECAwQEBQYH');
        expect(signDataSpy).toHaveBeenCalledWith(new Uint8Array([8,9,10,11]));
        expect(publicKeySpy).toHaveBeenCalled();
        expect(blake2bSpy).toHaveBeenCalledWith(data, {dkLen: 32});
        expect(toSerializedSignatureSpy).toHaveBeenCalledWith({
            signature: new Uint8Array([1,2,3,4]),
            signatureScheme: 'ED25519',
            publicKey: mockPublickKey
        });
    });

    it('connect should return new instance of BaseSigner', () => {
        const newSigner = signer.connect(client);
        expect(newSigner).toBeInstanceOf(BaseSigner);
    });
});