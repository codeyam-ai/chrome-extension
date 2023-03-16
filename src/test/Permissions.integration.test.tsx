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

describe('The Permissions page', () => {
    let mockchain: Mockchain;

    beforeEach(() => {
        mockchain = new Mockchain();
        simulateMnemonicUser();
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
    });
});
