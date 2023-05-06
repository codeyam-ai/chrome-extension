import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Browser from 'webextension-polyfill';

import { fakeAlarms } from './utils/fake-browser/fake-browser';
import { makeTestDeps } from './utils/test-dependencies';
import {
    AUTO_LOCK_TIMEOUT_KEY,
    DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES,
} from '_src/shared/constants';
import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import {
    simulateEmailUser,
    simulateMnemonicUser,
} from '_src/test/utils/storage';

describe('Lock Wallet Page', () => {
    let mockJsonRpc: MockJsonRpc;

    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        mockCommonCalls(mockJsonRpc);
        mockSuiObjects(mockJsonRpc);
    });

    describe('for an email user', () => {
        beforeEach(async () => {
            simulateEmailUser();
        });

        test('allows user to lock the wallet manually', async () => {
            await renderApp();
            await screen.findByText('Get started with Sui');
            const settingsButton = await screen.findByTestId('settings-toggle');
            await userEvent.click(settingsButton);

            const lockOption = await screen.findByText('Lock / Reset Ethos');
            await userEvent.click(lockOption);

            const lockWalletButton = await screen.findByText('Lock Wallet Now');
            await userEvent.click(lockWalletButton);

            await screen.findAllByText('Sign in with Email');
        });
    });

    describe('for a mnemonic user', () => {
        beforeEach(async () => {
            simulateMnemonicUser();
        });

        test('shows the currently set timeout', async () => {
            Browser.storage.local.set({ [AUTO_LOCK_TIMEOUT_KEY]: 6 });
            await renderApp();
            await screen.findByText('Get started with Sui');
            const settingsButton = await screen.findByTestId('settings-toggle');
            await userEvent.click(settingsButton);

            const lockOption = await screen.findByText('Lock / Reset Ethos');
            await userEvent.click(lockOption);

            await screen.findByText(/6 minutes/);
        });

        test('allows user to set the lock timeout', async () => {
            // - styling
            // - figure out max and min values and validate both in the input and in the background
            await renderApp();
            await screen.findByText('Get started with Sui');
            const settingsButton = await screen.findByTestId('settings-toggle');
            await userEvent.click(settingsButton);

            const lockOption = await screen.findByText('Lock / Reset Ethos');
            await userEvent.click(lockOption);

            await screen.findByText(
                new RegExp(`${DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES} minutes`)
            );
            const editAutolockLink = await screen.findByText(
                'Edit Auto-Lock time'
            );
            await userEvent.click(editAutolockLink);

            const timeoutInput = await screen.findByTestId('timeout-input');
            await userEvent.clear(timeoutInput);
            await userEvent.type(timeoutInput, '7');
            await userEvent.click(await screen.findByText('Save'));

            await screen.findByText(/7 minutes/);

            expect(fakeAlarms.alarmsCreated).toHaveLength(1);
            expect(
                fakeAlarms.alarmsCreated[0].alarmInfo.delayInMinutes
            ).toEqual(7);
        });

        test('allows user to lock the wallet manually', async () => {
            await renderApp();
            await screen.findByText('Get started with Sui');
            const settingsButton = await screen.findByTestId('settings-toggle');
            await userEvent.click(settingsButton);

            const lockOption = await screen.findByText('Lock / Reset Ethos');
            await userEvent.click(lockOption);

            const lockWalletButton = await screen.findByText('Lock Wallet Now');
            await userEvent.click(lockWalletButton);

            await screen.findAllByText('Unlock Wallet');
        });
    });
});
