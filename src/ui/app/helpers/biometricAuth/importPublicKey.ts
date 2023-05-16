import { fromB64 } from '@mysten/bcs';

export default async function importPublicKey(
    keyData: string
): Promise<CryptoKey> {
    try {
        console.log('KEY DATA', keyData);
        const importKeyData = fromB64(keyData);

        console.log('importKeyData :>> ', importKeyData);

        const key = await window.crypto.subtle.importKey(
            'spki',
            importKeyData,
            {
                name: 'ECDSA',
                namedCurve: 'P-256',
            },
            false,
            ['verify']
        );
        console.log('key :>> ', key);
        return key;
    } catch (error) {
        console.error('Error importing key:', error);
        throw error; // or handle the error as appropriate for your application
    }
}
