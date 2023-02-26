import { toB64 } from '@mysten/bcs';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { fakeAccessToken } from './utils/fake-local-storage';
import { BASE_URL } from '_src/shared/constants';
import { accountInfos, password, recoveryPhrase, simulateMnemonicUser, simulateEmailUser } from '_src/test/utils/fake-local-storage';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('The Security Settings page', () => {
    const init = async () => {
        await mockSuiObjects();
        await renderApp();

        await screen.findByText('Get started with Sui');
    }

    const navigateToSecurity = async () => {
        const settingsButton = await screen.findByTestId('settings-toggle');
        await userEvent.click(settingsButton);

        const securityButton = await screen.findByText('Security');
        await userEvent.click(securityButton)
    }

    const initAndNavigateToSecurity = async () => {
        await init();
        await navigateToSecurity();
    }

    describe("mnemonic user", () => {

        beforeEach(async () => {
            simulateMnemonicUser();
            mockCommonCalls();
        });
    
        test('requires a valid password to view the recovery phrase', async () => {
            await initAndNavigateToSecurity();
    
            const recoveryPhraseButton = await screen.findByText('View Recovery Phrase');
            await userEvent.click(recoveryPhraseButton)
    
            let recoveryPhraseElements = screen.queryAllByText(recoveryPhrase)
            expect(recoveryPhraseElements.length).toBe(0);
    
            const passwordInput = await screen.findByTestId('view-phrase-password');
            await userEvent.type(passwordInput, 'bad-password');
    
            const submitPasswordButton = await screen.findByText('View recovery phrase')
            await userEvent.click(submitPasswordButton)
    
            await screen.findByText('Password is not correct.')
    
            recoveryPhraseElements = screen.queryAllByText(recoveryPhrase)
            expect(recoveryPhraseElements.length).toBe(0);
    
            await userEvent.clear(passwordInput)
            await userEvent.type(passwordInput, password);
            await userEvent.click(submitPasswordButton)
    
            const errors = screen.queryAllByText('Password is not correct.')
            expect(errors.length).toBe(0)
    
            await screen.findByText(recoveryPhrase)
        });
    
        test('requires a valid password to view the private key', async () => {
            await initAndNavigateToSecurity();
    
            const recoveryPhraseButton = await screen.findByText('View Private Key');
            await userEvent.click(recoveryPhraseButton)
    
            const uint8Array = Uint8Array.from(accountInfos[0].privateKey.split(',').map(u => parseInt(u)))
            const privateKey = toB64(uint8Array)
            let recoveryPhraseElements = screen.queryAllByText(privateKey)
            expect(recoveryPhraseElements.length).toBe(0);
    
            const passwordInput = await screen.findByTestId('view-private-key-password');
            await userEvent.type(passwordInput, 'bad-password');
    
            const submitPasswordButton = await screen.findByText('View private key')
            await userEvent.click(submitPasswordButton)
    
            await screen.findByText('Password is not correct.')
    
            recoveryPhraseElements = screen.queryAllByText(privateKey)
            expect(recoveryPhraseElements.length).toBe(0);
    
            await userEvent.clear(passwordInput)
            await userEvent.type(passwordInput, password);
            await userEvent.click(submitPasswordButton)
    
            const errors = screen.queryAllByText('Password is not correct.')
            expect(errors.length).toBe(0)
    
            await screen.findByText(privateKey)
        });

        test('shows the proper private key for the selected account', async () => {
            await init();
    
            const currentWallet = await screen.findByTestId('current-wallet');
            await within(currentWallet).findByText('Wallet 1');
            await userEvent.click(currentWallet);
    
            const wallet2Link = await screen.findByText('Wallet 2');
            await userEvent.click(wallet2Link);    
    
            await navigateToSecurity();
    
            const recoveryPhraseButton = await screen.findByText('View Private Key');
            await userEvent.click(recoveryPhraseButton)
    
            const uint8Array = Uint8Array.from(accountInfos[1].privateKey.split(',').map(u => parseInt(u)))
            const privateKey = toB64(uint8Array)
    
            const passwordInput = await screen.findByTestId('view-private-key-password');
            const submitPasswordButton = await screen.findByText('View private key')
    
            await userEvent.type(passwordInput, password);
            await userEvent.click(submitPasswordButton)
    
            await screen.findByText(privateKey)
        });
    })

    describe("email user", () => {
        beforeEach(async () => {
            nock(BASE_URL, {
                reqheaders: { 'x-supabase-access-token': fakeAccessToken },
            })
                .persist()
                .post('/api/users/recovery_phrase')
                .reply(200, {
                    phrase: recoveryPhrase
                });

            simulateEmailUser();
            mockCommonCalls();
        });

        test('shows the seed phrase for email accounts', async () => {
            await initAndNavigateToSecurity();
    
            const recoveryPhraseButton = await screen.findByText('View Recovery Phrase');
            await userEvent.click(recoveryPhraseButton)
    
            let recoveryPhraseElements = screen.queryAllByText(recoveryPhrase)
            expect(recoveryPhraseElements.length).toBe(0);

            const viewPhraseCheck = await screen.findByTestId('view-phrase-check');
            await userEvent.click(viewPhraseCheck);

            const viewPhraseButton = await screen.findByText('View recovery phrase');
            await userEvent.click(viewPhraseButton);

            recoveryPhraseElements = screen.queryAllByText(recoveryPhrase)
            
            expect(recoveryPhraseElements.length).toBe(1);
        }); 
    })

});
