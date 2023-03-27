import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderTemplate } from './utils/json-templates';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';

describe('send coin flow', () => {
    let mockchain: Mockchain;

    beforeEach(async () => {
        mockchain = new Mockchain();
        await simulateMnemonicUser();
        mockchain.mockCommonCalls();
        mockchain.mockSuiObjects({
            suiBalance: 4_000_000_000, // MIST units
        });
    });

    const init = () => {
        mockchain.mockBlockchainCall(
            { method: 'suix_getNormalizedMoveFunction' },
            renderTemplate('getNormalizedMoveFunction', {}),
            true
        );

        mockchain.mockBlockchainCall(
            { method: 'sui_devInspectTransaction' },
            renderTemplate('devInspectTransaction', {})
        );

        mockchain.mockBlockchainCall(
            { method: 'suix_getReferenceGasPrice', params: [] },
            "1",
            true
        );

        renderApp();
    };

    const shouldSeeRootPageAndClickSend = async () => {
        await screen.findByText('Coins');
        await screen.findByText('Get started with Sui');
        const sendButton = screen.getByRole('button', { name: 'Send' });
        await userEvent.click(sendButton);
    };

    const shouldSeeErrorForInvalidAddress = async () => {
        const input = await screen.findByPlaceholderText('0x... or SuiNS name');
        await userEvent.type(input, 'howdy');
        await screen.findByText('Invalid address. Please check again.');
        await userEvent.clear(input);
    };

    const shouldAddRecipientAndClickContinue = async () => {
        const input = await screen.findByPlaceholderText('0x... or SuiNS name');
        await userEvent.type(
            input,
            '0xec96d320e97cd10146f953a79cf9dc05a8b35c46b3e8428f785ec3ae1b6f8fa6'
        );
        const continueButton = await screen.findByRole('button', {
            name: 'Continue',
        });
        await userEvent.click(continueButton);
    };

    const shouldAddAmountAndClickReview = async () => {
        const input = await screen.findByPlaceholderText('Amount');
        await userEvent.type(input, '1');
        const reviewButton = await screen.findByRole('button', {
            name: 'Review',
        });
        await userEvent.click(reviewButton);
    };

    const shouldClickConfirmAndSeeTransactionSubmitted = async () => {
        const button = await screen.findByRole('button', {
            name: 'Confirm & Send',
        });
        await userEvent.click(button);
        await screen.findByText('Transaction submitted.');
    };

    test('allows you to send Sui', async () => {
        init();
        await shouldSeeRootPageAndClickSend();
        await shouldSeeErrorForInvalidAddress();
        await shouldAddRecipientAndClickContinue();
        await shouldAddAmountAndClickReview();
        await shouldClickConfirmAndSeeTransactionSubmitted();
    });

    test.todo(
        'it shows recent transactions and other internal wallet addresses'
    );

    test.todo(
        'it should fail gracefully when you try to transfer more than you have'
    );
});
