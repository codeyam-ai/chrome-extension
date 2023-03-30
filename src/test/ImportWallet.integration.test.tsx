import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import truncateMiddle from '../ui/app/helpers/truncate-middle';

describe('Importing a wallet using a seed phrase', () => {
    let mockchain: Mockchain;
    beforeEach(() => {
        mockchain = new Mockchain();
        mockchain.mockCommonCalls();
    });

    test('Entire flow works', async () => {
        await renderAndChooseImportOption();
        await pasteSeedPhrase();
        await confirmAddress();
        await enterGoodPassword();
    });

    test('Password must be complex enough', async () => {
        await renderAndChooseImportOption();
        await pasteSeedPhrase();
        await confirmAddress();

        const badPassword = 'foo';
        await userEvent.type(screen.getByTestId('password'), badPassword);
        await userEvent.type(
            screen.getByTestId('confirmPassword'),
            badPassword
        );
        await screen.findByText(/Password is not strong enough/);

        await enterGoodPassword();
    });

    async function renderAndChooseImportOption() {
        renderApp();
        await screen.findByText('Welcome to Ethos');
        await userEvent.click(screen.getByText('Import', { exact: false }));
    }

    async function pasteSeedPhrase() {
        await screen.findByText('Paste Recovery Phrase');
        const validSeedPhrase =
            'girl empower human spring circle ceiling wild pact stumble model wheel chuckle';
        const seedPhraseList = validSeedPhrase.split(' ');

        for (let i = 0; i < 12; i++) {
            const wordInput = await screen.findByTestId('word-' + i);
            await userEvent.type(wordInput, seedPhraseList[i]);
        }

        await userEvent.click(screen.getByTestId('submit'));
    }

    async function confirmAddress() {
        await screen.findByText('Confirm Wallet Import');
        const walletAddressFromSeed = truncateMiddle(
            '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
            15
        );
        await screen.findByText(walletAddressFromSeed);

        await userEvent.click(screen.getByTestId('continue'));
    }

    async function enterGoodPassword() {
        const goodPassword = 'uj!Up27dxuMA!3Lm';
        await userEvent.type(screen.getByTestId('password'), goodPassword);
        await userEvent.type(
            screen.getByTestId('confirmPassword'),
            goodPassword
        );

        await userEvent.click(screen.getByTestId('terms-of-service'));

        await userEvent.click(screen.getByTestId('submit'));
        await screen.findByText('Wallet Set Up');
    }
});
