import Browser from 'webextension-polyfill';

import { connections } from '_src/background/index';
import { AUTO_LOCK_TIMEOUT_KEY } from '_src/shared/constants';
import { getEncrypted, getLocal } from '_src/shared/storagex/store';

const alarmName = 'lockAlarm';

export async function lockWallet() {
    const authentication = await getEncrypted({
        key: 'authentication',
        session: true,
        strong: false,
    });

    chrome.storage.session.clear();

    const uiConnection = connections.getUiConnections();
    for (const connection of uiConnection) {
        connection.sendWalletLockedMessage(!!authentication);
    }
}

Browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === alarmName) {
        lockWallet();
    }
});

export const resetLockTimeout = async () => {
    const timeout = (await getLocal(AUTO_LOCK_TIMEOUT_KEY)) as number;
    Browser.alarms.create(alarmName, {
        delayInMinutes: timeout,
    });
};
