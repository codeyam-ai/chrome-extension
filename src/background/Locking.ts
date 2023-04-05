import Browser from 'webextension-polyfill';

import {connections} from "_src/background/index";

const alarmName = 'lockAlarm';

function lockWallet() {
    chrome.storage.session.clear();
    const uiConnection = connections.getUiConnection();
    if (uiConnection) {
        uiConnection.sendWalletLockedMessage();
    }
}

Browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === alarmName) {
        lockWallet();
    }
});

export const resetLockTimeout = async () => {
    Browser.alarms.create(alarmName, { delayInMinutes: 1 });
};
