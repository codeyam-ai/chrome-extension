import { toB64 } from '@mysten/bcs';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { BASE_URL } from '_src/shared/constants';
import {
    fakeAccessToken,
    accountInfos,
    password,
    recoveryPhrase,
    simulateMnemonicUser,
    simulateEmailUser,
} from '_src/test/utils/fake-local-storage';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('The Security Settings page', () => {
    let mockchain: Mockchain;

    beforeEach(() => {
        mockchain = new Mockchain();
    });

    const init = async () => {
        await mockchain.mockSuiObjects({
            suiBalance: 400000000,
        });
        await renderApp();

        await screen.findByText('Get started with Sui');
    };

    const navigateToSend = async () => {
        const sendButton = await screen.findByTestId('send');
        await userEvent.click(sendButton);
        await screen.findByText('Sending');
    };

    const initAndNavigateToSend = async () => {
        await init();
        await navigateToSend();
    };

    describe('mnemonic user', () => {
        beforeEach(async () => {
            simulateMnemonicUser();
            mockchain.mockCommonCalls();
        });

        test('allows you to send Sui', async () => {
            await initAndNavigateToSend();

            // Add more!
        });

        test.todo('it allows you to switch coins');

        test.todo(
            'it shows recent transactions and other internal wallet addresses'
        );
    });

    // describe('email user', () => {

    // });
});
