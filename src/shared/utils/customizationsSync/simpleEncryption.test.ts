import { simpleDecryptMessage, simpleEncryptMessage } from './simpleEncryption';

describe('simpleEncryption', () => {
    it('should encrypt and decrypt', () => {
        const message = 'Hello World';
        const privateKey = '0x123';
        const encrypted = simpleEncryptMessage(message, privateKey);
        const decrypted = simpleDecryptMessage(encrypted, privateKey);
        expect(decrypted).toEqual(message);
    });
});
