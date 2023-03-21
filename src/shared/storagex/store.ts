import Browser from 'webextension-polyfill';

import { decrypt, encrypt } from '../encryption/password';

const MASTER_PASSPHRASE = process.env.MASTER_PASSPHRASE || 'Ethos';
const MASTER_SALT = Uint8Array.from([1]);

export async function getLocal(key: string): Promise<string | number> {
    const response = await Browser.storage.local.get(key);
    return response[key];
}

export async function getSession(key: string): Promise<string | number> {
    const response = await chrome.storage.session.get(key);
    return response[key];
}

export async function setLocal(keyValue: Record<string, string | null>) {
    Browser.storage.local.set(keyValue);
}

export async function setSession(keyValue: Record<string, string | null>) {
    chrome.storage.session.set(keyValue);
}

export async function setEncrypted({
    key,
    value,
    session,
    passphrase = MASTER_PASSPHRASE,
}: {
    key: string;
    value: string;
    session: boolean;
    passphrase?: string;
}) {
    if (!key || key.length === 0) return;
    if (!value || value.length === 0) return;

    const encryptedKey = encrypt(key, passphrase, MASTER_SALT);
    const encryptedValue = encrypt(value, passphrase);

    if (session) {
        await setSession({ [encryptedKey]: encryptedValue });
    } else {
        await setLocal({ [encryptedKey]: encryptedValue });
    }
}

export async function getEncrypted({
    key,
    session,
    passphrase = MASTER_PASSPHRASE,
}: {
    key: string;
    session: boolean;
    passphrase?: string;
}) {
    const encryptedKey = encrypt(key, passphrase, MASTER_SALT);
    const encryptedValue = await (session
        ? getSession(encryptedKey)
        : getLocal(encryptedKey));

    if (!encryptedValue) return null;
    return decrypt(encryptedValue as string, passphrase);
}

export async function deleteEncrypted({
    key,
    session,
    passphrase = MASTER_PASSPHRASE,
}: {
    key: string;
    session: boolean;
    passphrase?: string;
}) {
    const encryptedKey = encrypt(key, passphrase, MASTER_SALT);
    await (session
        ? setSession({ [encryptedKey]: null })
        : setLocal({ [encryptedKey]: null }));
}
