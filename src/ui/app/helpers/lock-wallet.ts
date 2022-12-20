import Browser from 'webextension-polyfill';

import { WALLET_LOCK_TIMEOUT_MS } from '_src/shared/constants';

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
