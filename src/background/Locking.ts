import Browser from 'webextension-polyfill';

import { PERMISSIONS_STORAGE_KEY } from './Permissions';
import { connections } from '_src/background/index';
import { AUTO_LOCK_TIMEOUT_KEY } from '_src/shared/constants';
import {
    deleteEncrypted,
    getEncrypted,
    getLocal,
    setEncrypted,
} from '_src/shared/storagex/store';
import isZkExpired from '_src/ui/app/components/zklogin/isZkExpired';

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

async function resetZkWallet() {
    await setEncrypted({
        key: 'onboarding',
        session: false,
        strong: false,
        value: 'true',
    });
    await deleteEncrypted({
        key: 'zk',
        session: true,
        strong: false,
    });
    await deleteEncrypted({
        key: 'activeAccountIndex',
        session: false,
        strong: false,
    });
    await deleteEncrypted({
        key: PERMISSIONS_STORAGE_KEY,
        session: false,
        strong: false,
    });
    await deleteEncrypted({
        key: 'account-type',
        session: false,
        strong: false,
    });
    await deleteEncrypted({
        key: 'accountInfos',
        session: false,
        strong: false,
    });
    await deleteEncrypted({
        key: 'activeSeed',
        session: true,
        strong: false,
    });

    // window is not available in background script, so we use this.
    // it will close the expanded tab if there is one
    setTimeout(() => chrome.runtime.reload(), 500);
}

Browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === alarmName) {
        lockWallet();
    }
});

export const resetLockTimeout = async () => {
    // This is a very heavyweight way to get the is ZK (as this gets called every 5 sec with the heartbeat), should be refactored
    const zkDataSerialized = await getEncrypted({
        key: 'zk',
        session: true,
        strong: false,
    });

    if (zkDataSerialized) {
        // make sure the normal lock timeout is cancelled if ZK
        Browser.alarms.clear(alarmName);

        const zkData = zkDataSerialized ? JSON.parse(zkDataSerialized) : null;

        const isExpired = await isZkExpired(zkData.maxEpoch, zkData.minEpoch);

        if (isExpired) {
            await resetZkWallet();
        }
    } else {
        const timeout = (await getLocal(AUTO_LOCK_TIMEOUT_KEY)) as number;
        Browser.alarms.create(alarmName, {
            delayInMinutes: timeout || 15,
        });
    }
};
