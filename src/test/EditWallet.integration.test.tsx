import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('Top Nav Wallet Management', () => {
    beforeEach(async () => {
        simulateAuthenticatedUser();
        mockCommonCalls();
        mockSuiObjects();
    });

    test('Switching current wallet', async () => {
        renderApp();

        let currentWallet = await screen.findByTestId('current-wallet');
        await within(currentWallet).findByText('Wallet 1');
        await userEvent.click(currentWallet);

        const wallet2Link = await screen.findByText('Wallet 2');
        await userEvent.click(wallet2Link);

        currentWallet = await screen.findByTestId('current-wallet');
        await within(currentWallet).findByText('Wallet 2');
    });

    test('Editing wallet', async () => {
        renderApp();

        let currentWallet = await screen.findByTestId('current-wallet');
        await within(currentWallet).findByText('Wallet 1');
        await userEvent.click(currentWallet);

        const editLink = await screen.findByText('Edit');
        await userEvent.click(editLink);

        const wallet1Link = await screen.findByTestId('wallet1');
        await userEvent.click(wallet1Link);

        const nameInput = await screen.findByDisplayValue('Wallet 1');
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'Wal-1');
        await userEvent.click(await screen.findByText('Done'));

        // check wallet 1 still current wallet (see https://linear.app/ethoswallet/issue/ETHOS-89)
        currentWallet = await screen.findByTestId('current-wallet');
        await within(currentWallet).findByText('Wal-1');
    });
});
