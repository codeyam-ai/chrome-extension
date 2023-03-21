// This module provides fake implementations of the webextension-polyfill Browser object
// NOTE: this is incomplete and provides just enough implementation for tests to pass

class FakeStorage {

    records: Record<string, unknown> = {};

    get(dkeys?: null | string | string[] | Record<string, unknown>): Promise<Record<string, unknown>> {
        return new Promise<Record<string, unknown>>((resolve, reject) => {
            const returnVal: Record<string, unknown> = {};
            if (typeof dkeys === 'string') {
                returnVal[dkeys] = this.records[dkeys];
            }
            resolve(returnVal);
        });
    }

    async set(
        items: Record<string, unknown>
    ): Promise<void> {
        for (const property in items) {
            this.records[property] = items[property];
        }
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    clear() {
        this.records = {}
    }

}

const fakeLocalStorage = new FakeStorage();

function fakeEvent() {
    return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
        hasListener: jest.fn(),
        hasListeners: () => false,
    };
}
function fakePort() {
    return {
        name: 'whatever',
        disconnect: jest.fn(),
        onDisconnect: fakeEvent(),
        onMessage: fakeEvent(),
        postMessage: jest.fn(),
    };
}
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

export const clearLocalStorage = () => {
    fakeLocalStorage.clear();
};
