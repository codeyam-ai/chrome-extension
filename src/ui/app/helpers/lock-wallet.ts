import Browser from 'webextension-polyfill';

import {
    deleteEncrypted,
    getEncrypted,
    setEncrypted,
} from '_shared/storagex/store';
import { WALLET_LOCK_TIMEOUT_MS } from '_src/shared/constants';

const LOCKED = 'locked';

export const resetWalletLockTimer = () => {
    Browser.storage.local.set({
        lockWalletOnTimestamp: -1,
    });
};

export const startWalletLockTimer = () => {
    Browser.storage.local.set({
        lockWalletOnTimestamp: Date.now() + WALLET_LOCK_TIMEOUT_MS,
    });
};

export const setUnlocked = async (passphrase: string) => {
    await setEncrypted({
        key: LOCKED,
        value: `${LOCKED}${passphrase}`,
        session: true,
        passphrase,
    });
};

export const setLocked = async (passphrase: string) => {
    await deleteEncrypted({ key: LOCKED, session: true, passphrase });
};

export const isLocked = async (passphrase: string) => {
    const unlocked = await getEncrypted({
        key: LOCKED,
        session: true,
        passphrase,
    });

    return !unlocked || unlocked !== `${LOCKED}${passphrase}`;
};
