// This module provides fake implementations of the webextension-polyfill Browser object
// NOTE: this is incomplete and provides just enough implementation for tests to pass

import { fakePort } from '_src/test/utils/fake-browser/fake-runtime';
import { FakeStorage } from '_src/test/utils/fake-browser/fake-storage';

const fakeLocalStorage = new FakeStorage();
export const fakeSessionStorage = new FakeStorage();

export const fakeBrowser = {
    runtime: {
        id: 'chrome-runtime-id',
        connect: () => fakePort(),
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
