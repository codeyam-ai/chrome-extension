import { TransactionBlock } from '@mysten/sui.js';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import KeypairVault from '_app/KeypairVault';
import { BackgroundClient } from '_app/background-client';
import { setTransactionRequests } from '_redux/slices/transaction-requests';
import { renderTemplate } from '_src/test/utils/json-templates';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { accountInfos, simulateMnemonicUser } from '_src/test/utils/storage';
import { createStore } from '_store';
import { thunkExtras } from '_store/thunk-extras';

import type { ApprovalRequest } from '_payloads/transactions';
import type { AppStore } from '_store';

describe('The Transaction Approval popup', () => {
    let store: AppStore;
    let mockchain: Mockchain;
    beforeEach(async () => {
        mockchain = new Mockchain();
        mockchain.mockCommonCalls();
        simulateMnemonicUser();
        store = createStore({});

        // TODO: consider moving this code to a common place. these objects hold state and every test should start
        //  with a clean slate
        thunkExtras.background = new BackgroundClient();
        thunkExtras.background.init(store.dispatch);
        thunkExtras.keypairVault = new KeypairVault();
    });

    test('shows the transaction and allows user to approve it', async () => {
        const { txRequestId } = simulateReduxStateWithTransaction();
        const executeScope = mockBlockchainTransactionExecution();

        const mockWindowCloser = jest.fn();
        renderApp({
            store: store,
            initialRoute: `/tx-approval/${txRequestId}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        await screen.findByText('Gain');
        const approveButton = await screen.findByText('Approve');

        await userEvent.click(approveButton);
        await waitFor(() => {
            expect(mockWindowCloser.mock.calls.length).toEqual(1);
        });

        expect(executeScope.actualCalls).toEqual(1);
    });

    test('the user can reject the transaction', async () => {
        const { txRequestId } = simulateReduxStateWithTransaction();
        const executeScope = mockBlockchainTransactionExecution();

        const mockWindowCloser = jest.fn();
        renderApp({
            store: store,
            initialRoute: `/tx-approval/${txRequestId}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        await screen.findByText('Gain');
        const cancelButton = await screen.findByText('Cancel');

        await userEvent.click(cancelButton);
        await waitFor(() =>
            expect(mockWindowCloser.mock.calls.length).toEqual(1)
        );

        expect(executeScope.actualCalls).toEqual(0);
    });

    test('complex transaction displays properly', async () => {
        const { txRequestId } = simulateReduxStateWithComplexTransaction();
        const executeScope = mockBlockchainTransactionExecution();

        const mockWindowCloser = jest.fn();
        renderApp({
            store: store,
            initialRoute: `/tx-approval/${txRequestId}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        const approveButton = await screen.findByText('Approve');

        // screen.debug(undefined, 9999);
        await screen.findByText(
            'This is a complex transaction. Please view the details below to ensure everything is expected.'
        );
        await screen.findByText('add_liquidity');
        await screen.findByText('Cost');

        await userEvent.click(approveButton);
        await waitFor(() =>
            expect(mockWindowCloser.mock.calls.length).toEqual(1)
        );

        expect(executeScope.actualCalls).toEqual(1);
    });

    test('mint coin transaction displays properly', async () => {
        const { txRequestId } = simulateReduxStateWithMintCoinTransaction();
        const executeScope = mockBlockchainTransactionExecution();

        const mockWindowCloser = jest.fn();
        renderApp({
            store: store,
            initialRoute: `/tx-approval/${txRequestId}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        const approveButton = await screen.findByText('Approve');

        await screen.findByText('You are about to mint');
        await screen.findByText('ETHOS_EXAMPLE_COIN');
        await screen.findByText('Gain');

        await userEvent.click(approveButton);
        await waitFor(() =>
            expect(mockWindowCloser.mock.calls.length).toEqual(1)
        );

        expect(executeScope.actualCalls).toEqual(1);
    });

    function simulateReduxStateWithTransaction() {
        const txRequestId = '95ae4a0d-0b7b-478b-ab70-bc3fe291540e';

        const transactionBlock = new TransactionBlock();
        transactionBlock.transferObjects(
            [
                transactionBlock.object(
                    '0x19fe0d83a3e3cb15570b6edc1160a15cc894e690'
                ),
            ],
            transactionBlock.pure('0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b')
        );
        const txRequest: ApprovalRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            approved: true,
            tx: {
                type: 'transaction',
                data: transactionBlock.serialize(),
                account: accountInfos[0].address,
                chain: 'sui::devnet',
            },
        };

        store.dispatch(setTransactionRequests([txRequest]));
        return { txRequestId };
    }

    function simulateReduxStateWithComplexTransaction() {
        const txRequestId = '65ae4a0d-0b7b-478b-ab70-bc3fe291540e';

        const data = `{"version":1,"gasConfig":{"budget":"30000"},"inputs":[{"kind":"Input","value":"0x091737ffb68786c34e84e4953823f29f4816422cf0b91a410276af5d92eceec7","index":0,"type":"object"},{"kind":"Input","value":"0x51a29d5019372256d29a591c18d5a986210b901997134ed9333dfae662ab130d","index":1,"type":"object"},{"kind":"Input","value":"0x6633f163516a0d06949f03f22a35ec65796164ddcb2bf63e849d4cbbbd3e3f4e","index":2,"type":"object"},{"kind":"Input","value":"0x84cef0c22b560577473172a24f388b4a4ff6091725beb109cee696f5299ac194","index":3,"type":"object"},{"kind":"Input","value":"50000000000","index":4,"type":"pure"},{"kind":"Input","value":"58264350776","index":5,"type":"pure"},{"kind":"Input","value":"0xce06dadf062062d551c86379e37bdef20da55835fa440e011e5beb4a333f1f62","index":6,"type":"object"},{"kind":"Input","value":"0","index":7,"type":"pure"},{"kind":"Input","value":"0","index":8,"type":"pure"}],"transactions":[{"kind":"MergeCoins","destination":{"kind":"Input","value":"0x091737ffb68786c34e84e4953823f29f4816422cf0b91a410276af5d92eceec7","index":0,"type":"object"},"sources":[{"kind":"Input","value":"0x51a29d5019372256d29a591c18d5a986210b901997134ed9333dfae662ab130d","index":1,"type":"object"}]},{"kind":"MergeCoins","destination":{"kind":"Input","value":"0x6633f163516a0d06949f03f22a35ec65796164ddcb2bf63e849d4cbbbd3e3f4e","index":2,"type":"object"},"sources":[{"kind":"Input","value":"0x84cef0c22b560577473172a24f388b4a4ff6091725beb109cee696f5299ac194","index":3,"type":"object"}]},{"kind":"SplitCoins","coin":{"kind":"Input","value":"0x091737ffb68786c34e84e4953823f29f4816422cf0b91a410276af5d92eceec7","index":0,"type":"object"},"amounts":[{"kind":"Input","value":"50000000000","index":4,"type":"pure"}]},{"kind":"SplitCoins","coin":{"kind":"Input","value":"0x6633f163516a0d06949f03f22a35ec65796164ddcb2bf63e849d4cbbbd3e3f4e","index":2,"type":"object"},"amounts":[{"kind":"Input","value":"58264350776","index":5,"type":"pure"}]},{"kind":"MoveCall","target":"0xb01f7d11da6c2d04b5225f43770d42d2cbbe52aaf5c27ec29d1188d78090e719::entry::add_liquidity","arguments":[{"kind":"Input","value":"0xce06dadf062062d551c86379e37bdef20da55835fa440e011e5beb4a333f1f62","index":6,"type":"object"},{"kind":"NestedResult","index":2,"resultIndex":0},{"kind":"Input","value":"0","index":7,"type":"pure"},{"kind":"NestedResult","index":3,"resultIndex":0},{"kind":"Input","value":"0","index":8,"type":"pure"}],"typeArguments":["0x229f4b94633cc25a68666d355a3eee5e2766ca9850349c48eca82387d378cac8::bnb::BNB","0x229f4b94633cc25a68666d355a3eee5e2766ca9850349c48eca82387d378cac8::dai::DAI","0xb01f7d11da6c2d04b5225f43770d42d2cbbe52aaf5c27ec29d1188d78090e719::curves::Uncorrelated"]}]}`;

        const txRequest: ApprovalRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            approved: true,
            tx: {
                type: 'transaction',
                data,
                account: accountInfos[0].address,
                chain: 'sui::devnet',
            },
        };

        store.dispatch(setTransactionRequests([txRequest]));
        return { txRequestId };
    }

    function simulateReduxStateWithMintCoinTransaction() {
        const txRequestId = '61ae4a0d-0b7b-478b-ab70-bc3fe291540e';

        const data = `{"version":1,"gasConfig":{},"inputs":[{"kind":"Input","value":"0x986b14a24acd0c8bb2b08d166069d6a2361f48e76f34151efc773e5cb98da53b","index":0,"type":"object"},{"kind":"Input","value":"100000","index":1,"type":"pure"}],"transactions":[{"kind":"MoveCall","target":"0x1cbfdf7de5004f887705fa53bb345d4372e5004bd8b04a6f8868f5e1ca1af9c7::ethos_example_coin::mint","arguments":[{"kind":"Input","value":"0x986b14a24acd0c8bb2b08d166069d6a2361f48e76f34151efc773e5cb98da53b","index":0,"type":"object"},{"kind":"Input","value":"100000","index":1,"type":"pure"}],"typeArguments":[]}]}`;

        const txRequest: ApprovalRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            approved: true,
            tx: {
                type: 'transaction',
                data,
                account: accountInfos[0].address,
                chain: 'sui::devnet',
            },
        };

        store.dispatch(setTransactionRequests([txRequest]));
        return { txRequestId };
    }

    function mockBlockchainTransactionExecution() {
        mockchain.mockBlockchainCall(
            {
                method: 'sui_multiGetObjects',
                params: [
                    ['0x19fe0d83a3e3cb15570b6edc1160a15cc894e690'],
                    {
                        showOwner: true,
                    },
                ],
            },
            [
                renderTemplate('coinObject', {
                    balance: 40000000,
                    id: '0x395c50c614cc22156c9de8db24163f48e4ff66ae',
                }),
            ]
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_multiGetObjects',
                params: [
                    [
                        '0x091737ffb68786c34e84e4953823f29f4816422cf0b91a410276af5d92eceec7',
                        '0x51a29d5019372256d29a591c18d5a986210b901997134ed9333dfae662ab130d',
                        '0x6633f163516a0d06949f03f22a35ec65796164ddcb2bf63e849d4cbbbd3e3f4e',
                        '0x84cef0c22b560577473172a24f388b4a4ff6091725beb109cee696f5299ac194',
                        '0xce06dadf062062d551c86379e37bdef20da55835fa440e011e5beb4a333f1f62',
                    ],
                    {
                        showOwner: true,
                    },
                ],
            },
            renderTemplate('liquidityMultiGetObjects', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_multiGetObjects',
                params: [
                    [
                        "0x986b14a24acd0c8bb2b08d166069d6a2361f48e76f34151efc773e5cb98da53b"
                    ],
                    {
                        showOwner: true,
                    },
                ],
            },
            renderTemplate('mintCoinMultiGetObjects', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'suix_getReferenceGasPrice',
                params: [],
            },
            '10'
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransactionBlock',
                params: [
                    'AAACAQA5XFDGFMwiFWyd6NskFj9I5P9mrgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwfABQc5QM+gq6aSOp0O1A9lrSbnFf+CwEBAQEAAAEBAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeCgAAAAAAAAAAypo7AAAAAAA=',
                ],
            },
            renderTemplate('dryRunTransaction', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransactionBlock',
                params: [
                    'AAACAQA5XFDGFMwiFWyd6NskFj9I5P9mrgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwfABQc5QM+gq6aSOp0O1A9lrSbnFf+CwEBAQEAAAEBAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeAfUb/H2Y2G+9dfGdFsN0hLDw9zgutsm/ytL+SpS+LIgiAgAAAAAAAAAgtDTkUvcH0/1b2UNBKf6rEnjGV5xUgQQZbsB49TjIbB//JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3goAAAAAAAAAZgQAAAAAAAAA',
                ],
            },
            renderTemplate('dryRunTransaction', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransactionBlock',
                params: [
                    'AAAJAQAJFzf/toeGw06E5JU4I/KfSBZCLPC5GkECdq9dkuzuxx4dBAAAAAAAIIHb51suMkInG/9uvR7He2p9hKkWagVlH2batkQfnjT0AQBRop1QGTciVtKaWRwY1amGIQuQGZcTTtkzPfrmYqsTDdiyBwAAAAAAINJ8ACKctJrv8NJ4mM6tVYOftQI8LuT+FnaxboQEweWOAQBmM/FjUWoNBpSfA/IqNexleWFk3csr9j6EnUy7vT4/TmjlBwAAAAAAIFzYX1Wr0DY67ubb0jZTSbr+k4OB+mAU/2E8m/k8AyukAQCEzvDCK1YFd0cxcqJPOItKT/YJFyW+sQnO5pb1KZrBlGjlBwAAAAAAIGV3X/mU+h+J2/qanFdtUQTdlD1mSFe1J2j2zaJwAfK7AAgAdDukCwAAAAAIOHDTkA0AAAABAc4G2t8GIGLVUchjeeN73vINpVg1+kQOAR5b60ozPx9iCEgCAAAAAAABAAgAAAAAAAAAAAAIAAAAAAAAAAAFAwEAAAEBAQADAQIAAQEDAAIBAAABAQQAAgECAAEBBQAAsB99EdpsLQS1Il9Ddw1C0su+Uqr1wn7CnRGI14CQ5xkFZW50cnkNYWRkX2xpcXVpZGl0eQMHIp9LlGM8wlpoZm01Wj7uXidmyphQNJxI7Kgjh9N4ysgDYm5iA0JOQgAHIp9LlGM8wlpoZm01Wj7uXidmyphQNJxI7Kgjh9N4ysgDZGFpA0RBSQAHsB99EdpsLQS1Il9Ddw1C0su+Uqr1wn7CnRGI14CQ5xkGY3VydmVzDFVuY29ycmVsYXRlZAAFAQYAAwIAAAABBwADAwAAAAEIAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeAfUb/H2Y2G+9dfGdFsN0hLDw9zgutsm/ytL+SpS+LIgiAgAAAAAAAAAgtDTkUvcH0/1b2UNBKf6rEnjGV5xUgQQZbsB49TjIbB//JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3goAAAAAAAAAMHUAAAAAAAAA',
                ],
            },
            renderTemplate('liquidityDryRunTransaction', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransactionBlock',
                params: [
                    'AAACAQGYaxSiSs0Mi7KwjRZgadaiNh9I5280FR78dz5cuY2lO98AAAAAAAAAAQAIoIYBAAAAAAABABy/333lAE+IdwX6U7s0XUNy5QBL2LBKb4ho9eHKGvnHEmV0aG9zX2V4YW1wbGVfY29pbgRtaW50AAIBAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3goAAAAAAAAAAMqaOwAAAAAA',
                ],
            },
            renderTemplate('multiCoinDryRunTransaction1', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransactionBlock',
                params: [
                    'AAACAQGYaxSiSs0Mi7KwjRZgadaiNh9I5280FR78dz5cuY2lO98AAAAAAAAAAQAIoIYBAAAAAAABABy/333lAE+IdwX6U7s0XUNy5QBL2LBKb4ho9eHKGvnHEmV0aG9zX2V4YW1wbGVfY29pbgRtaW50AAIBAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gH1G/x9mNhvvXXxnRbDdISw8Pc4LrbJv8rS/kqUviyIIgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwf/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4KAAAAAAAAAIYEAAAAAAAAAA==',
                ],
            },
            renderTemplate('multiCoinDryRunTransaction2', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'suix_getCoins',
                params: [
                    '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
                    '0x2::sui::SUI',
                    null,
                    null,
                ],
            },
            renderTemplate('getCoins', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_getNormalizedMoveFunction',
                params: [
                    '0xb01f7d11da6c2d04b5225f43770d42d2cbbe52aaf5c27ec29d1188d78090e719',
                    'entry',
                    'add_liquidity',
                ],
            },
            renderTemplate('liquidityNormalizedMoveFunction', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_getNormalizedMoveFunction',
                params: [
                    "0x1cbfdf7de5004f887705fa53bb345d4372e5004bd8b04a6f8868f5e1ca1af9c7",
                    "ethos_example_coin",
                    "mint",
                ],
            },
            renderTemplate('mintCoinNormalizedMoveFunction', {})
        );

        return mockchain.mockBlockchainCall(
            {
                method: 'sui_executeTransactionBlock',
            },
            renderTemplate('executeTransaction', {})
        );
    }
});
