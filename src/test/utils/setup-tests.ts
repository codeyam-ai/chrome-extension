import * as util from 'util';

import { fakeBrowser, clearLocalStorage } from './fake-browser';

jest.mock('webextension-polyfill', () => {
    return fakeBrowser;
});

jest.spyOn(window, 'resizeTo').mockImplementation();

beforeEach(() => clearLocalStorage());

// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
Object.defineProperty(window, 'TextEncoder', {
    writable: true,
    value: util.TextEncoder,
});
Object.defineProperty(window, 'TextDecoder', {
    writable: true,
    value: util.TextDecoder,
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

process.env.API_ENDPOINT_DEV_NET_FULLNODE =
    'http://dev-net-fullnode.example.com/';
process.env.API_ENDPOINT_DEV_NET_FAUCET = 'http://dev-net-faucet.example.com/';
