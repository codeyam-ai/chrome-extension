import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { recoveryPhrase, simulateMnemonicUser } from '_src/test/utils/storage';

const incorrectRecoveryPhrase =
    '!!!girl empower human spring circle ceiling wild pact stumble model wheel chuckle!!!';

const newPassword = 'one two three';

describe('Unlocking the wallet', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        await createLockedWallet();
    });

    test('Entering an incorrect recovery phrase will display error message', async () => {
        await navigateToForgotPasswordPage();
        await pasteSeedPhrase(incorrectRecoveryPhrase);
        await userEvent.click(screen.getByTestId('submit'));
        await screen.findByText('Recovery Phrase is incorrect');
    });

    test('Entire flow works', async () => {
        await navigateToForgotPasswordPage();
        await pasteSeedPhrase(recoveryPhrase);
        await userEvent.click(screen.getByTestId('submit'));
        await enterNewPassword();
        await lockWallet();
        await unlockWalletWithNewPassword();
    });

    const createLockedWallet = async () => {
        await simulateMnemonicUser(false);
        mockBlockchain(mockJsonRpc);
        renderApp();
        await screen.findAllByText('Unlock Wallet');
    };

    async function navigateToForgotPasswordPage() {
        await userEvent.click(screen.getByText('Forgot Password'));
        await screen.findByText('Forgot Password');
    }

    async function pasteSeedPhrase(phrase: string) {
        const seedPhraseList = phrase.split(' ');

        for (let i = 0; i < 12; i++) {
            const wordInput = await screen.findByTestId('word-' + i);
            await userEvent.type(wordInput, seedPhraseList[i]);
        }

        await userEvent.click(screen.getByTestId('submit'));
    }

    async function enterNewPassword() {
        await screen.findByText('Your recovery phrase has been verified');
        await userEvent.type(
            screen.getByPlaceholderText('Enter a new password'),
            newPassword
        );
        await userEvent.type(
            screen.getByPlaceholderText('Re-enter password'),
            newPassword
        );
        await userEvent.click(screen.getByTestId('submit'));
    }

    const lockWallet = async () => {
        const settingsButton = await screen.findByTestId('settings-toggle');
        await userEvent.click(settingsButton);

        const lockOption = await screen.findByText('Lock / Reset Ethos');
        await userEvent.click(lockOption);

        const lockWalletButton = await screen.findByText('Lock Wallet Now');
        await userEvent.click(lockWalletButton);
    };

    async function unlockWalletWithNewPassword() {
        const passwordInput = await screen.findByTestId('password');

        await userEvent.type(passwordInput, newPassword);
        await userEvent.click(screen.getByTestId('submit'));
        await screen.findByText('Get started with Sui');
    }
});
