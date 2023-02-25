import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import nock from 'nock';

import KeypairVault from '_app/KeypairVault';
import { BackgroundClient } from '_app/background-client';
import { setTransactionRequests } from '_redux/slices/transaction-requests';
import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import { renderTemplate } from '_src/test/utils/json-templates';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { createStore } from '_store';
import { thunkExtras } from '_store/thunk-extras';

import type { TransactionRequest } from '_payloads/transactions';
import type { AppStore } from '_store';

describe('The Transaction Approval popup', () => {
    let store: AppStore;
    let mockchain: Mockchain;
    beforeEach(async () => {
        mockchain = new Mockchain();
        mockchain.mockCommonCalls();
        simulateAuthenticatedUser();
        store = createStore({});

        // TODO: consider moving this code to a common place. these objects hold state and every test should start
        //  with a clean slate
        thunkExtras.background = new BackgroundClient();
        thunkExtras.background.init(store.dispatch);
        thunkExtras.keypairVault = new KeypairVault();
    });

    test('shows the transaction and allows user to approve it', async () => {
        const { txRequestId } = simulateReduxStateWithTransaction();
        const { executeScope } = mockBlockchainTransactionExecution();

        const mockWindowCloser = jest.fn();
        renderApp({
            store: store,
            initialRoute: `/tx-approval/${txRequestId}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        await screen.findByText('1500000');
        const approveButton = await screen.findByText('Approve');

        await userEvent.click(approveButton);
        await waitFor(() => {
            expect(mockWindowCloser.mock.calls.length).toEqual(1);
        });

        expect(executeScope.isDone()).toBeTruthy();
    });

    test('the user can reject the transaction', async () => {
        const { txRequestId } = simulateReduxStateWithTransaction();
        const { executeScope } = mockBlockchainTransactionExecution();

        const mockWindowCloser = jest.fn();
        renderApp({
            store: store,
            initialRoute: `/tx-approval/${txRequestId}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        await screen.findByText('1500000');
        const rejectButton = await screen.findByText('Reject');

        await userEvent.click(rejectButton);
        await waitFor(() =>
            expect(mockWindowCloser.mock.calls.length).toEqual(1)
        );

        expect(executeScope.isDone()).toBeFalsy();
    });

    function simulateReduxStateWithTransaction() {
        const txRequestId = '95ae4a0d-0b7b-478b-ab70-bc3fe291540e';
        const txRequest: TransactionRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            tx: {
                type: 'v2',
                data: {
                    kind: 'pay',
                    data: {
                        inputCoins: [
                            '0x19fe0d83a3e3cb15570b6edc1160a15cc894e690',
                        ],
                        recipients: [
                            '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                        ],
                        amounts: [1500000],
                        gasBudget: 1000,
                    },
                },
            },
        };

        store.dispatch(setTransactionRequests([txRequest]));
        return { txRequestId };
    }

    function mockBlockchainTransactionExecution() {
        const payScope = mockchain.mockBlockchainCall(
            { method: 'sui_pay' },
            renderTemplate('pay', {
                base64EncodedTxBytes: 'ZmFrZSBkYXRh',
            }),
            true
        );

        // note: this is only expected to be called once
        const dryRunTransactionScope = mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransaction',
                params: ['ZmFrZSBkYXRh'],
            },
            renderTemplate('dryRunTransaction', {})
        );

        const getObjectForDryRunScope = mockchain.mockBlockchainCall(
            {
                method: 'sui_getObject',
                params: ['0x19fe0d83a3e3cb15570b6edc1160a15cc894e690'],
            },
            renderTemplate('coinObject', {
                balance: 40000000,
                id: '0x395c50c614cc22156c9de8db24163f48e4ff66ae',
            })
        );

        const getCoinsForDryRunScope = mockchain.mockBlockchainCall(
            {
                method: 'sui_getCoins',
                params: [
                    '1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                    '0x2::sui::SUI',
                    null,
                    null,
                ],
            },
            renderTemplate('getCoins', {})
        );

        const getObjectForDryRunScope2 = mockchain.mockBlockchainBatchCall(
            [
                {
                    method: 'sui_getObject',
                    params: ['0x19fe0d83a3e3cb15570b6edc1160a15cc894e690'],
                },
            ],
            [
                renderTemplate('coinObject', {
                    balance: 50000000,
                    id: '0x19fe0d83a3e3cb15570b6edc1160a15cc894e690',
                }),
            ]
        );

        const executeScope = mockchain.mockBlockchainCall(
            {
                method: 'sui_executeTransactionSerializedSig',
                params: ['ZmFrZSBkYXRh'],
            },
            renderTemplate('executeTransaction', {})
        );

        return {
            executeScope,
            dryRunTransactionScope,
            getObjectForDryRunScope,
            getCoinsForDryRunScope,
            getObjectForDryRunScope2,
            payScope,
        };
    }
});
