import { waitFor, fireEvent, screen } from '@testing-library/react';

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
        fireEvent.click(createWallet);
        await waitFor(
            async () => (await screen.findAllByText('Wallet 2')).length > 0
        );

        const edit = screen.getByText('Edit');
        fireEvent.click(edit);
        await screen.findByText("Select the wallet you'd like to edit");

        const wallet2s = await screen.findAllByText('Wallet 2');
        fireEvent.click(wallet2s[2]);
        await screen.findByText('Edit Wallet');

        // Can't get input onChange to fire...
        // const input = screen.getByDisplayValue('Wallet 2');
        // fireEvent.focus(input)
        // fireEvent.change(input, { e: { target: { value: 'Gaming' } } });
        // await waitFor(
        //     async () =>
        //         (await screen.findAllByDisplayValue('Gaming')).length > 0
        // );

        // Can't get emoji picker to open
        // const emojiPicker = screen.getByTestId('emoji-picker')
        // fireEvent.click(emojiPicker);
        // await screen.findByText('Pick an emoji...');
        // const scream = screen.getAllByText('😱')[0];
        // fireEvent.click(scream);

        // await screen.findByText('Choose an Emoji');
        // await screen.findByText('😱');

        const colorPicker = screen.getByTestId('color-picker');
        fireEvent.click(colorPicker);
        const green = await screen.findByTestId('color-picker-#EB154C')
        fireEvent.click(green);

        const done = await screen.findByText('Done');
        fireEvent.click(done);
        await screen.findByText("Select the wallet you'd like to edit");

        // await screen.findByText('Gaming');
        // await screen.findByText('😱');

        await screen.findAllByTestId('color-#EB154C')
    });
});
