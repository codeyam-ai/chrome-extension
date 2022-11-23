import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import * as React from 'react';

import App from '_app/index';
import { renderWithProviders } from '_src/test/utils/react-rendering';
import suiGetObjectResponse from '_src/test/utils/sui-fake-responses/sui_getObject.json';

afterEach(() => {
    nock.cleanAll();
});

test('Signing in by importing an account with a seed phrase', async () => {
    nock('http://dev-net-fullnode.example.com')
        .post('/', /sui_getObjectsOwnedByAddress/)
        .reply(200, {
            jsonrpc: '2.0',
            result: [],
            id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
        })
        .post('/', /sui_getObject/)
        .reply(200, [suiGetObjectResponse]);
    const validSeedPhrase =
        'girl empower human spring circle ceiling wild pact stumble model wheel chuckle';
    renderWithProviders(<App />);

    await screen.findByText('The new web awaits');
    await userEvent.click(screen.getByText('Import', { exact: false }));
    await screen.findByText('Recovery phrase');
    await userEvent.type(
        screen.getByRole('textbox', { name: 'Recovery phrase' }),
        validSeedPhrase
    );
    await userEvent.click(screen.getByRole('button'));

    await screen.findByText(
        'Please provide a password to ensure your wallet is secure.'
    );

    await userEvent.type(screen.getByText('Password'), 'A Bad Password');

    await userEvent.type(
        screen.getByText('Confirm password'),
        'A Bad Password'
    );

    await userEvent.click(screen.getByText('Save'));

    await screen.findByText('Get started with Sui');
});
