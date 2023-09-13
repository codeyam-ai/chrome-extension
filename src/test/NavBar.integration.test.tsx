import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { simulateMnemonicUser } from './utils/storage';
import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('Top Nav Wallet Management', () => {
    let mockJsonRpc: MockJsonRpc;

    beforeEach(async () => {
        simulateMnemonicUser();
        mockJsonRpc = new MockJsonRpc();
        mockBlockchain(mockJsonRpc);

        // Mock customizations saving
        nock('http://localhost:3000')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .persist()
            .post('/api/v1/auth/sui/signature')
            .reply(200, {
                jwt: 'anything',
            });

        nock('http://localhost:3000')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .persist()
            .put('/api/v1/user/profile')
            .reply(200, {});
    });

    test('Switching current wallet', async () => {
        renderApp();

        let currentWallet = await screen.findByTestId('current-wallet-link');
        await within(currentWallet).findByText('Wallet 1');
        await userEvent.click(currentWallet);

        const wallet2Link = await screen.findByText('Wallet 2');
        await userEvent.click(wallet2Link);

        currentWallet = await screen.findByTestId('current-wallet-link');
        await within(currentWallet).findByText('Wallet 2');
    });

    test('Editing wallet', async () => {
        renderApp();

        let currentWallet = await screen.findByTestId('current-wallet-link');
        await within(currentWallet).findByText('Wallet 1');
        await userEvent.click(currentWallet);

        const editLink = await screen.findByText('Edit');
        await userEvent.click(editLink);

        const wallet1Link = await screen.findByTestId('wallet1');
        await userEvent.click(wallet1Link);

        const nameInput = await screen.findByDisplayValue('Wallet 1');
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'Wal-1');

        const colorPicker = screen.getByTestId('color-picker');
        await userEvent.click(colorPicker);
        const green = await screen.findByTestId('color-picker-#EB154C');
        await userEvent.click(green);

        await userEvent.click(await screen.findByText('Done'));

        await screen.findByText("Select the wallet you'd like to edit");
        await screen.findAllByText('Wal-1');
        await screen.findAllByTestId('color-#EB154C');

        // check wallet 1 still current wallet (see https://linear.app/ethoswallet/issue/ETHOS-89)
        currentWallet = await screen.findByTestId('current-wallet-link');
        await within(currentWallet).findByText('Wal-1');
    });
});
