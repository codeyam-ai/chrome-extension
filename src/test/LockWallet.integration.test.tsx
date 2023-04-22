import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import {
    simulateEmailUser,
    simulateMnemonicUser,
} from '_src/test/utils/storage';

describe('Lock Wallet Page', () => {
    let mockchain: Mockchain;

    beforeEach(async () => {
        mockchain = new Mockchain();
        mockchain.mockCommonCalls();
        mockchain.mockSuiObjects();
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

            const lockOption = await screen.findByText('Lock Ethos');
            await userEvent.click(lockOption);

            const lockWalletButton = await screen.findByText('Lock Wallet');
            await userEvent.click(lockWalletButton);

            await screen.findAllByText('Sign in with Email');
        });
    });

    describe('for a mnemonic user', () => {
        beforeEach(async () => {
            simulateMnemonicUser();
        });

        test('allows user to set the lock timeout', async () => {
            await renderApp();
            await screen.findByText('Get started with Sui');
            const settingsButton = await screen.findByTestId('settings-toggle');
            await userEvent.click(settingsButton);

            const lockOption = await screen.findByText('Lock Ethos');
            await userEvent.click(lockOption);

            await screen.findByText(/15 minutes/);
            const changeAutolockButton = await screen.findByText(
                'Change Auto-Lock time'
            );
            await userEvent.click(changeAutolockButton);

            await screen.findByText('HI');

            // const timeoutInput = await screen.findByText('timeout-input');
            // await userEvent.type(timeoutInput, '7');
            // await userEvent.click(await screen.findByText('Save'));
            //
            // await screen.findByText('7 minutes');
        });

        test('allows user to lock the wallet manually', async () => {
            await renderApp();
            await screen.findByText('Get started with Sui');
            const settingsButton = await screen.findByTestId('settings-toggle');
            await userEvent.click(settingsButton);

            const lockOption = await screen.findByText('Lock Ethos');
            await userEvent.click(lockOption);

            const lockWalletButton = await screen.findByText('Lock Wallet');
            await userEvent.click(lockWalletButton);

            await screen.findAllByText('Unlock Wallet');
        });
    });
});
