import { act, fireEvent, screen } from '@testing-library/react';

import App from '_app/index';
import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import mockSuiObjects from '_src/test/utils/mockchain';
import { renderWithProviders } from '_src/test/utils/react-rendering';

describe('Rendering the Tokens page', () => {
    beforeEach(async () => {
        simulateAuthenticatedUser();
    });

    test('rendering the Tokens page when wallet has no coins', async () => {
        mockSuiObjects();
        renderWithProviders(<App />);
        await screen.findByText('Get started with Sui');
        const wallet = await screen.findByText('Wallet');
        fireEvent.click(wallet);

        const createWallet = await screen.findByText('Create Wallet');
        await fireEvent.click(createWallet);
        await screen.findByText('Wallet 2');

        const edit = await screen.findByText('Edit');
        await fireEvent.click(edit);  
        await screen.findByText("Select the wallet you'd like to edit");

        const wallet2s = await screen.findAllByText('Wallet 2');
        await fireEvent.click(wallet2s[2]);
        await screen.findByText('Edit Wallet');

        const input = await screen.findByDisplayValue("Wallet 2");
        await fireEvent.change(input, {e: { target: { value: "Gaming" } } })

        const done = await screen.findByText('Done');
        await fireEvent.click(done)
        await screen.findByText("Select the wallet you'd like to edit");

        await screen.findByText('Gaming');
    });
});
