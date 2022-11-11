import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import App from '_app/index';
import { renderWithProviders } from '_src/test/utils/react-rendering';

function fakeLocalStorageGet(dkeys?: null | string | string[] | Record<string, unknown>): Promise<Record<string, unknown>> {
    return new Promise<Record<string, unknown>>((resolve, reject) => {
        const returnVal: Record<string, unknown> = {}
        if (typeof dkeys === "string") {
            returnVal[dkeys] = null
        }

        resolve(returnVal)
    });
}

function mockLocalStorage(numGets = 2) {
    // mockzilla does not have a concept of "it can be called any number of times". so unfortunately every test needs
    // to declare how many :(
    mockBrowser.storage.local.get.spy(fakeLocalStorageGet).times(numGets);
}

test('Signing in by importing an account with a seed phrase', async () => {
    const validSeedPhrase =
        'girl empower human spring circle ceiling wild pact stumble model wheel chuckle';
    mockLocalStorage();
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
});
