import { Transaction } from '@mysten/sui.js';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import KeypairVault from '_app/KeypairVault';
import { BackgroundClient } from '_app/background-client';
import { setTransactionRequests } from '_redux/slices/transaction-requests';
import {
    accountInfos,
    simulateMnemonicUser,
} from '_src/test/utils/fake-local-storage';
import { renderTemplate } from '_src/test/utils/json-templates';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
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

        await screen.findByText('Costs');
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

        await screen.findByText('Costs');
        const rejectButton = await screen.findByText('Reject');

        await userEvent.click(rejectButton);
        await waitFor(() =>
            expect(mockWindowCloser.mock.calls.length).toEqual(1)
        );

        expect(executeScope.actualCalls).toEqual(0);
    });

    function simulateReduxStateWithTransaction() {
        const txRequestId = '95ae4a0d-0b7b-478b-ab70-bc3fe291540e';

        const transaction = new Transaction();
        transaction.transferObjects(
            [transaction.object('0x19fe0d83a3e3cb15570b6edc1160a15cc894e690')],
            transaction.pure('0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b')
        );
        const txRequest: ApprovalRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            approved: true,
            tx: {
                type: 'transaction',
                data: transaction.serialize(),
                account: accountInfos[0].address,
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
                method: 'sui_getReferenceGasPrice',
                params: [],
            },
            10
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransaction',
                params: [
                    'AAACAQA5XFDGFMwiFWyd6NskFj9I5P9mrgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwfABQc5QM+gq6aSOp0O1A9lrSbnFf+CwEBAQEAAAEBAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeCgAAAAAAAAAAypo7AAAAAAA=',
                ],
            },
            renderTemplate('dryRunTransaction', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransaction',
                params: [
                    'AAACAQA5XFDGFMwiFWyd6NskFj9I5P9mrgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwfABQc5QM+gq6aSOp0O1A9lrSbnFf+CwEBAQEAAAEBAP8mOpQbllC1EgemdNWXKPbzQQLTZvTfWllRS8NmhgLeAfUb/H2Y2G+9dfGdFsN0hLDw9zgutsm/ytL+SpS+LIgiAgAAAAAAAAAgtDTkUvcH0/1b2UNBKf6rEnjGV5xUgQQZbsB49TjIbB//JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3goAAAAAAAAAdgMAAAAAAAAA',
                ],
            },
            renderTemplate('dryRunTransaction', {})
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_getCoins',
                params: [
                    '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
                    '0x2::sui::SUI',
                    null,
                    null,
                ],
            },
            renderTemplate('getCoins', {})
        );

        return mockchain.mockBlockchainCall(
            {
                method: 'sui_executeTransaction',
            },
            renderTemplate('executeTransaction', {})
        );
    }
});
