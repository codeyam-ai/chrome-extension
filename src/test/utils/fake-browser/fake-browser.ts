// This module provides fake implementations of the webextension-polyfill Browser object
// NOTE: this is incomplete and provides just enough implementation for tests to pass

import { Runtime } from 'webextension-polyfill';

import { FakeStorage } from '_src/test/utils/fake-browser/fake-storage';
import {
    FakeConnections,
    FakeEvent,
    FakePort,
} from '_src/test/utils/fake-browser/fake-runtime';

const fakeLocalStorage = new FakeStorage();
export const fakeSessionStorage = new FakeStorage();

const fakeConnections = new FakeConnections();

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
};

export const clearFakeStorages = () => {
    fakeLocalStorage.clear();
    fakeSessionStorage.clear();
};
