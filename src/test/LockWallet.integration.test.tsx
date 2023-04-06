import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';

describe('Lock Wallet Page', () => {
    let mockchain: Mockchain;

    beforeEach(() => {
        mockchain = new Mockchain();
    });

    beforeEach(async () => {
        simulateMnemonicUser();
        mockchain.mockCommonCalls();
        mockchain.mockSuiObjects();
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
