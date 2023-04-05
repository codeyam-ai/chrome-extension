import Browser from 'webextension-polyfill';
import {connections} from "_src/background/index";

const alarmName = 'lockAlarm';

Browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === alarmName) {
        const uiConnection = connections.getUiConnection();
        if (uiConnection) {
            uiConnection.sendWalletLockedMessage();
        }
    }
});

export const resetLockTimeout = async () => {
    Browser.alarms.create(alarmName, { delayInMinutes: 1 });
};
