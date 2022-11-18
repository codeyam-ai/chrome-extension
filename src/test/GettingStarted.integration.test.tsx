import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

import App from '_app/index';
import { initAppType } from '_redux/slices/app';
import { getFromLocationSearch } from '_redux/slices/app/AppType';
import { renderWithProviders } from '_src/test/utils/react-rendering';
import suiGetObjectResponse from '_src/test/utils/sui-fake-responses/sui_getObject.json';

afterEach(() => {
    nock.cleanAll();
});

function fakeOutLocalStorage(numGets: number, numSets: number) {
    const records: Record<string, unknown> = {};

    function fakeLocalStorageGet(
        dkeys?: null | string | string[] | Record<string, unknown>
    ): Promise<Record<string, unknown>> {
        return new Promise<Record<string, unknown>>((resolve, reject) => {
            const returnVal: Record<string, unknown> = {};
            if (typeof dkeys === 'string') {
                returnVal[dkeys] = records[dkeys];
            }

            resolve(returnVal);
        });
    }

    function fakeLocalStorageSet(
        items: Record<string, unknown>
    ): Promise<void> {
        for (const property in items) {
            records[property] = items[property];
        }
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
    mockBrowser.storage.local.get.spy(fakeLocalStorageGet).times(numGets);
    mockBrowser.storage.local.set.spy(fakeLocalStorageSet).times(numSets);
}

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
    fakeOutLocalStorage(7, 3);
    const view = renderWithProviders(<App />);
    act(() => {
        // todo (mag): is this the right way to do this, or can we just set up the store with this state and avoid
        // the act/dispatch indirection
        view.store.dispatch(
            initAppType(getFromLocationSearch(window.location.search))
        );
    });

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
