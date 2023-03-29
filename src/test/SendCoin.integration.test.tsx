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

        mockchain.mockBlockchainCall(
            {
                method: 'suix_getCoins',
                params: [
                    '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
                    '0x2::sui::SUI',
                    null,
                    null,
                ],
            },
            renderTemplate('getCoins', {}),
            true
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_dryRunTransactionBlock',
                params: [
                    'AAACAAgAypo7AAAAAAAg7JbTIOl80QFG+VOnnPncBaizXEaz6EKPeF7Drhtvj6YCAgABAQAAAQECAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gEAAAAAAAAAAMqaOwAAAAAA',
                ],
            },
            renderTemplate('dryRunTransaction', {}),
            true
        );

        mockchain.mockBlockchainCall(
            {
                method: 'sui_executeTransactionBlock',
                params: [
                    'AAACAAgAypo7AAAAAAAg7JbTIOl80QFG+VOnnPncBaizXEaz6EKPeF7Drhtvj6YCAgABAQAAAQECAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gH1G/x9mNhvvXXxnRbDdISw8Pc4LrbJv8rS/kqUviyIIgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwf/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4BAAAAAAAAAAwEAAAAAAAAAA==',
                    [
                        'ALtY0M5OdSte1NquP4pm5dLH9Co58+VeodZp4PZkXfjt/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4=',
                    ],
                    null,
                    null,
                ],
            },
            renderTemplate('executeTransaction', {})
        );
    });

    const init = () => {
        mockchain.mockBlockchainCall(
            { method: 'suix_getNormalizedMoveFunction' },
            renderTemplate('getNormalizedMoveFunction', {}),
            true
        );

        mockchain.mockBlockchainCall(
            { method: 'sui_devInspectTransactionBlock' },
            renderTemplate('devInspectTransaction', {})
        );

        mockchain.mockBlockchainCall(
            { method: 'suix_getReferenceGasPrice', params: [] },
            '1',
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
        await screen.findByText('Transaction successful.');
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
