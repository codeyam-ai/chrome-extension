import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import App from '_app/index';
import mockSuiObjects from '_src/test/utils/mockchain';
import { renderWithProviders } from '_src/test/utils/react-rendering';

describe('Authenticating by importing an account with a seed phrase', () => {
    test('Entire flow works', async () => {
        mockSuiObjects();
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
});
