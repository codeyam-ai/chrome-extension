import crypto from 'crypto';

import * as password from './password';

Object.defineProperty(global, 'crypto', {
    value: {
        getRandomValues: (arr: Uint8Array) =>
            new Uint8Array(crypto.randomBytes(arr.length)),
    },
});

describe('password', () => {
    it('encrypts and decrypts properly', () => {
        const text = 'this is some sample text';
        const passphrase = '123456passphrase654321';

        const encryptedData = password.encrypt({
            text,
            passphrase,
            strong: true,
        });
        const { saltString, nonceString, encryptedText } =
            JSON.parse(encryptedData);

        expect(saltString).toBeDefined();
        expect(nonceString).toBeDefined();
        expect(encryptedText).toBeDefined();
        expect(encryptedText).not.toBe(text);

        const decryptedText = password.decrypt({
            encryptedData,
            passphrase,
            strong: true,
        });
        expect(decryptedText).toBe(text);
    });
});
