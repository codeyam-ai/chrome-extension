export default async function importPublicKey(
    keyData: string
): Promise<CryptoKey> {
    try {
        const decodedData = atob(keyData);
        const importKeyData = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            importKeyData[i] = decodedData.charCodeAt(i);
        }

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
