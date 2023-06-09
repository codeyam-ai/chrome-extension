import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import {
    password as correctPassword,
    simulateMnemonicUser,
} from '_src/test/utils/storage';

describe('Unlocking the wallet', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        await createLockedWallet();
    });

    test('Entering an incorrect password will display error message', async () => {
        await userEvent.type(
            screen.getByTestId('password'),
            'an incorrect password'
        );
        await userEvent.click(screen.getByTestId('submit'));
        await screen.findByText('Password is incorrect');
    });

    test('Entering a correct password will log the user in', async () => {
        await userEvent.type(screen.getByTestId('password'), correctPassword);
        await userEvent.click(screen.getByTestId('submit'));
    });

    const createLockedWallet = async () => {
        await simulateMnemonicUser(false);
        mockBlockchain(mockJsonRpc);
        renderApp();
        await screen.findAllByText('Unlock Wallet');
    };
});
