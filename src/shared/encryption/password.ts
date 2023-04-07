import { Counter, ModeOfOperation, utils } from 'aes-js';
import { Pbkdf2HmacSha256 } from 'asmcrypto.js';

const ITERATIONS = 10000;
const KEY_LENGTH = 32;

export function encrypt(
    text: string,
    passphrase: string,
    masterSalt?: Uint8Array
): string {
    const salt: Uint8Array =
        masterSalt || crypto.getRandomValues(new Uint8Array(16));
    const key = generateKey(passphrase, salt);

    const nonce: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
    const aesCtr = new ModeOfOperation.ctr(
        key,
        new Counter(masterSalt ? 1 : nonce)
    );

    const encodedText = encodeURIComponent(text);
    const decryptedBytes = utils.utf8.toBytes(encodedText);

    const encryptedBytes = aesCtr.encrypt(decryptedBytes);
    const encryptedText = utils.hex.fromBytes(encryptedBytes);

    if (masterSalt) {
        return encryptedText;
    }

    const encryptedData = JSON.stringify({
        encryptedText,
        saltString: utils.hex.fromBytes(salt),
        nonceString: utils.hex.fromBytes(nonce),
    });

    return encryptedData;
}

export function decrypt(encryptedData: string, passphrase: string): string {
    const { saltString, nonceString, encryptedText } =
        JSON.parse(encryptedData);
    const salt = utils.hex.toBytes(saltString);
    const nonce = utils.hex.toBytes(nonceString);
    const key = generateKey(passphrase, salt);

    const aesCtr = new ModeOfOperation.ctr(key, new Counter(nonce));
    const encryptedBytes = utils.hex.toBytes(encryptedText);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const encodedText = utils.utf8.fromBytes(decryptedBytes);
    return decodeURIComponent(encodedText);
}

function generateKey(passphrase: string, salt: Uint8Array) {
    const passphraseBytes = utils.utf8.toBytes(passphrase);
    return Pbkdf2HmacSha256(
        new Uint8Array(passphraseBytes),
        new Uint8Array(salt),
        ITERATIONS,
        KEY_LENGTH
    );
}
