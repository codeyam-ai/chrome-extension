import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    simulateConnectedApps,
    simulateMnemonicUser,
} from '_src/test/utils/storage';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('The Permissions page', () => {
    let mockchain: Mockchain;

    beforeEach(async () => {
        mockchain = new Mockchain();
        await simulateMnemonicUser();
        await simulateConnectedApps();
        mockchain.mockCommonCalls();
        mockchain.mockSuiObjects();
    });

    test('Allows the user to revoke permissions to connected apps', async () => {
        renderApp();
        const settingsButton = await screen.findByTestId('settings-toggle');
        await userEvent.click(settingsButton);

        const permissionsButton = await screen.findByText('Permissions');
        await userEvent.click(permissionsButton);

        await screen.findByText('Connected Apps');
        const connectedApp = await screen.findByText('Ethos Wallet Explorer');
        const revokeButton = await screen.findByRole('button', {
            name: 'Revoke',
        });
        await userEvent.click(revokeButton);
        await waitForElementToBeRemoved(connectedApp);
    });
});
