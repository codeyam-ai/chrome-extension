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

export async function removeLocal(keys: string | string[]) {
    Browser.storage.local.remove(keys);
}

export async function removeSession(keys: string | string[]) {
    chrome.storage.session.remove(keys);
}

export async function setEncrypted({
    key,
    value,
    session,
    strong,
    passphrase = MASTER_PASSPHRASE,
}: {
    key: string;
    value: string;
    session: boolean;
    strong: boolean;
    passphrase?: string;
}) {
    if (!key || key.length === 0) return;
    if (!value || value.length === 0) return;

    const encryptedKey = encrypt({
        text: key,
        passphrase,
        strong: false,
        masterSalt: MASTER_SALT,
    });

    const encryptedValue = encrypt({
        text: value,
        strong,
        passphrase,
    });
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
    strong = false,
}: {
    key: string;
    session: boolean;
    passphrase?: string;
    strong: boolean;
}) {
    const encryptedKey = encrypt({
        text: key,
        passphrase,
        masterSalt: MASTER_SALT,
        strong: false,
    });
    const encryptedValue = await (session
        ? getSession(encryptedKey)
        : getLocal(encryptedKey));

    if (!encryptedValue) return null;

    return decrypt({
        encryptedData: encryptedValue as string,
        passphrase,
        strong,
    });
}

export async function deleteEncrypted({
    key,
    session,
    passphrase = MASTER_PASSPHRASE,
    strong,
}: {
    key: string;
    session: boolean;
    passphrase?: string;
    strong: boolean;
}) {
    const encryptedKey = encrypt({
        text: key,
        passphrase,
        masterSalt: MASTER_SALT,
        strong,
    });
    await (session ? removeSession(encryptedKey) : removeLocal(encryptedKey));
}
