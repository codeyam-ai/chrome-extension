import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export const simpleEncryptMessage = (message: string, passphrase: string) => {
    return AES.encrypt(message, passphrase).toString();
};

export const simpleDecryptMessage = (
    encryptedMessage: string,
    passphrase: string
) => {
    const bytes = AES.decrypt(encryptedMessage, passphrase);
    const originalText = bytes.toString(Utf8);
    return originalText;
};
