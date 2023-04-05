import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
        const rpcMocks = mockchain.rpcMocks();
        rpcMocks.suix_getNormalizedMoveFunction();
        rpcMocks.sui_devInspectTransactionBlock();
        rpcMocks.suix_getReferenceGasPrice();
        rpcMocks.suix_getCoins();
        rpcMocks.sui_dryRunTransactionBlock();
        rpcMocks.sui_executeTransactionBlock();
    });

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

    const shouldAddAmountAndClickReview = async ({
        amountString,
    }: {
        amountString: string;
    }) => {
        const input = await screen.findByPlaceholderText('Amount');
        await userEvent.type(input, amountString);
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
        await screen.findByText('Transaction successful.');
    };

    test('allows you to send Sui', async () => {
        renderApp();
        await shouldSeeRootPageAndClickSend();
        await shouldSeeErrorForInvalidAddress();
        await shouldAddRecipientAndClickContinue();
        await shouldAddAmountAndClickReview({ amountString: '1' });
        await shouldClickConfirmAndSeeTransactionSubmitted();
    });

    test('allows you to send Sui in a locale that uses comma-decimal-separator like german', async () => {
        renderApp({ locale: 'de' });
        await shouldSeeRootPageAndClickSend();
        await shouldSeeErrorForInvalidAddress();
        await shouldAddRecipientAndClickContinue();
        // '1,0' in german is '1.0' in english
        await shouldAddAmountAndClickReview({ amountString: '1,0' });
        await shouldClickConfirmAndSeeTransactionSubmitted();
    });

    test.todo(
        'it should fail gracefully when you try to transfer more than you have'
    );
});
