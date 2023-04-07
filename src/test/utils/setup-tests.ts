import { fromHEX, toB64 } from '@mysten/bcs';
import { utils } from 'aes-js';
import nock from 'nock';
import * as util from 'util';

import {
    fakeBrowser,
    clearFakeStorages,
    fakeSessionStorage,
} from './fake-browser/fake-browser';
import { accountInfos } from './storage';

global.chrome = {
    ...(global.chrome || {}),
    storage: {
        ...(global.chrome?.storage || {}),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session: fakeSessionStorage,
    },
};

jest.mock('webextension-polyfill', () => {
    return fakeBrowser;
});

jest.spyOn(window, 'resizeTo').mockImplementation();

jest.mock('asmcrypto.js', () => {
    const asmCrypto = jest.requireActual('asmcrypto.js');
    return {
        Pbkdf2HmacSha256: jest.fn((passphrase: string, salt: Uint8Array) => {
            const passphraseBytes = utils.utf8.toBytes(passphrase);
            return asmCrypto.Pbkdf2HmacSha256(
                new Uint8Array(passphraseBytes),
                new Uint8Array(salt),
                10,
                32
            )
        }),
    }
});

jest.mock('animate.css/animate.min.css', () => '');
jest.mock('react-toastify/dist/ReactToastify.css', () => '');
jest.mock('_shared/cryptography/mnemonics', () => {
    const mnemonics = jest.requireActual('_shared/cryptography/mnemonics');
    return {
        ...mnemonics,
        getKeypairFromMnemonics: jest.fn((_mnemonic, index) => {
            const accountInfo = accountInfos.find(
                (accountInfo) => accountInfo.index === index
            );
            return {
                getPublicKey: jest.fn(() => ({
                    toSuiAddress: jest.fn(() => accountInfo?.address),
                    toBytes: jest.fn(() => fromHEX(accountInfo?.address || '')),
                })),
                export: jest.fn(() => ({
                    privateKey: toB64(
                        Uint8Array.from(
                            (accountInfo?.privateKey || '')
                                .split(',')
                                .map((s) => parseInt(s))
                        )
                    ),
                })),
                signData: jest.fn((data) => data),
                getKeyScheme: jest.fn(() => 'ED25519'),
            };
        }),
    };
});

beforeEach(() => clearFakeStorages());

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

process.env.GROWTHBOOK_API_KEY = 'test';

process.env.API_ENDPOINT_DEVNET_FULLNODE =
    'http://devNet-fullnode.example.com/';
process.env.API_ENDPOINT_DEVNET_FAUCET = 'http://devNet-faucet.example.com/';

process.env.API_ENDPOINT_TESTNET_FULLNODE =
    'http://testNet-fullnode.example.com/';
process.env.API_ENDPOINT_TESTNET_FAUCET = 'http://testNet-faucet.example.com/';

process.env.BASE_URL = 'http://ethos-base-url.example.com/';

process.env.EXPLORER_URL_LOCAL = 'http://www.explorer.sui.io/';

process.env.EXPLORER_URL_DEVNET = 'http://www.explorer.sui.io/';

process.env.EXPLORER_URL_TESTNET = 'http://www.explorer.sui.io/';

nock('https://cdn.growthbook.io')
    .persist()
    .get(`/api/features/test`)
    .reply(200, {});

afterEach(() => {
    nock.cleanAll();
});

jest.setTimeout(60000);
