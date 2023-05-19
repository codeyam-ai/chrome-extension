import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockCommonCalls, mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import {
    password as correctPassword,
    simulateMnemonicUser,
} from '_src/test/utils/storage';
import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';

describe('Unlocking the wallet', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        mockCommonCalls(mockJsonRpc);
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
        await screen.findByText('My Balance');
    });

    const createLockedWallet = async () => {
        await simulateMnemonicUser(false);
        mockBlockchain(mockJsonRpc);
        renderApp();
        await screen.findAllByText('Unlock Wallet');
    };
});
