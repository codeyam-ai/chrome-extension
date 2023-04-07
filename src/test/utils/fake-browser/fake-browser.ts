// This module provides fake implementations of the webextension-polyfill Browser object
// NOTE: this is incomplete and provides just enough implementation for tests to pass

import { FakeAlarms } from '_src/test/utils/fake-browser/fake-alarms';
import {
    FakeConnections,
    FakeEvent,
} from '_src/test/utils/fake-browser/fake-runtime';
import { FakeStorage } from '_src/test/utils/fake-browser/fake-storage';

const fakeLocalStorage = new FakeStorage();
export const fakeSessionStorage = new FakeStorage();

const fakeConnections = new FakeConnections();
export const fakeAlarms = new FakeAlarms();

export const fakeBrowser = {
    runtime: {
        id: 'chrome-runtime-id',
        connect: fakeConnections.connect,
        onConnect: fakeConnections.onConnect,
        onInstalled: new FakeEvent(),
        getManifest: () => ({ version: '0.0.0.1' }),
    },
    storage: {
        local: fakeLocalStorage,
    },
    alarms: fakeAlarms,
};

export const clearFakeStorages = () => {
    fakeAlarms.clear();
    fakeLocalStorage.clear();
    fakeSessionStorage.clear();
};
