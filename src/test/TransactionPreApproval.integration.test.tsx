import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { faker } from './utils/faker';
import { Mockchain } from './utils/mockchain';
import { renderApp } from './utils/react-rendering';
import { simulateMnemonicUser } from './utils/storage';
import KeypairVault from '_src/ui/app/KeypairVault';
import { BackgroundClient } from '_src/ui/app/background-client';
import { thunkExtras } from '_src/ui/app/redux/store/thunk-extras';
import { createStore } from '_store';

import type { PreloadedState } from '@reduxjs/toolkit';
import type { RootState } from '_src/ui/app/redux/RootReducer';
import type { AppStore } from '_src/ui/app/redux/store';

describe('transaction pre-approval flow', () => {
    let store: AppStore;
    let preloadedState: PreloadedState<RootState>;
    let mockchain: Mockchain;
    const id = '46987523-cadf-47c1-906a-baa0ce5b62c5';

    beforeEach(async () => {
        mockchain = new Mockchain();
        mockchain.mockCommonCalls();
        simulateMnemonicUser();
        mockchain.rpcMocks().sui_getNormalizedMoveFunction();
        preloadedState = {
            preapprovalRequests: {
                ids: [id],
                entities: {
                    [id]: faker.preapprovalRequest({ id }),
                },
                initialized: true,
            },
        };

        store = createStore(preloadedState);
        thunkExtras.background = new BackgroundClient();
        thunkExtras.background.init(store.dispatch);
        thunkExtras.keypairVault = new KeypairVault();
    });

    test('can accept transaction pre-approvals', async () => {
        const mockWindowCloser = jest.fn();

        renderApp({
            store,
            initialRoute: `/preapproval/${id}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        await screen.findByText('Pre-Approve Transactions');
        const approveButton = await screen.findByRole('button', {
            name: 'Approve',
        });
        await userEvent.click(approveButton);
        await waitFor(() =>
            expect(mockWindowCloser.mock.calls.length).toEqual(1)
        );
    });

    test('can reject transaction pre-approvals', async () => {
        const mockWindowCloser = jest.fn();

        renderApp({
            store,
            initialRoute: `/preapproval/${id}`,
            dependencies: { closeWindow: mockWindowCloser },
        });

        await screen.findByText('Pre-Approve Transactions');
        const rejectButton = await screen.findByRole('button', {
            name: 'Reject',
        });
        await userEvent.click(rejectButton);
        await waitFor(() => {
            expect(mockWindowCloser.mock.calls.length).toEqual(1);
        });
    });
});
