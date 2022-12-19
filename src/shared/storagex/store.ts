import Browser from 'webextension-polyfill';

import { decrypt, encrypt } from '../encryption/password';

const MASTER_PASSPHRASE = process.env.MASTER_PASSPHRASE || 'Ethos';
const MASTER_SALT = Uint8Array.from([1]);

export async function get(key: string): Promise<string | number> {
    const response = await Browser.storage.local.get(key);
    return response[key];
}

export async function set(keyValue: Record<string, string | null>) {
    Browser.storage.local.set(keyValue);
}

export async function setEncrypted(
    key: string,
    value: string,
    passphrase: string = MASTER_PASSPHRASE
) {
    if (!key || key.length === 0) return;
    if (!value || value.length === 0) return;

    const encryptedKey = encrypt(key, passphrase, MASTER_SALT);
    const encryptedValue = encrypt(value, passphrase);

    await set({ [encryptedKey]: encryptedValue });
}

export async function getEncrypted(
    key: string,
    passphrase: string = MASTER_PASSPHRASE
) {
    const encryptedKey = encrypt(key, passphrase, MASTER_SALT);
    const encryptedValue = await get(encryptedKey);

    if (!encryptedValue) return null;
    return decrypt(encryptedValue as string, passphrase);
}

export async function deleteEncrypted(
    key: string,
    passphrase: string = MASTER_PASSPHRASE
) {
    const encryptedKey = encrypt(key, passphrase, MASTER_SALT);
    await set({ [encryptedKey]: null });
}
