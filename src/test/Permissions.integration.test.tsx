import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import {
    simulateConnectedApps,
    simulateMnemonicUser,
} from '_src/test/utils/storage';

describe('The Permissions page', () => {
    let mockJsonRpc: MockJsonRpc;

    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        await simulateMnemonicUser();
        await simulateConnectedApps();
        mockBlockchain(mockJsonRpc);
    });

    test('Allows the user to revoke permissions to connected apps', async () => {
        renderApp();
        const settingsButton = await screen.findByTestId('settings-toggle');
        await userEvent.click(settingsButton);

        const permissionsButton = await screen.findByText('Permissions');
        await userEvent.click(permissionsButton);

        await screen.findByText('Connected Apps');
        expect(screen.queryAllByText('Ethos Wallet Explorer').length).toBe(1);
        const revokeButton = await screen.findByRole('button', {
            name: 'Revoke',
        });
        await userEvent.click(revokeButton);
        expect(screen.queryAllByText('Ethos Wallet Explorer').length).toBe(0);
    });
});
