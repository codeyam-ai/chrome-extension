import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import {
    mockCommonCalls,
    mockSuiObjects,
    rpcMocks,
} from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';

describe('send coin flow', () => {
    let mockJsonRpc: MockJsonRpc;

    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        await simulateMnemonicUser();
        mockCommonCalls(mockJsonRpc);
        mockSuiObjects(mockJsonRpc, {
            suiBalance: 4_000_000_000, // MIST units
        });
        const mocks = rpcMocks(mockJsonRpc);
        mocks.suix_getNormalizedMoveFunction();
        mocks.sui_dryRunTransactionBlock(
            'AAACAAgAypo7AAAAAAAg7JbTIOl80QFG+VOnnPncBaizXEaz6EKPeF7Drhtvj6YCAgABAQAAAQECAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gEAAAAAAAAAAHQ7pAsAAAAA'
        );
        mocks.suix_getReferenceGasPrice();
        mocks.suix_getCoins();
        mocks.sui_dryRunTransactionBlock(
            'AAACAAgAypo7AAAAAAAg7JbTIOl80QFG+VOnnPncBaizXEaz6EKPeF7Drhtvj6YCAgABAQAAAQECAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gH1G/x9mNhvvXXxnRbDdISw8Pc4LrbJv8rS/kqUviyIIgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwf/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4BAAAAAAAAAOoHAAAAAAAAAA=='
        );
        mocks.sui_executeTransactionBlock([
            'AAACAAgAypo7AAAAAAAg7JbTIOl80QFG+VOnnPncBaizXEaz6EKPeF7Drhtvj6YCAgABAQAAAQECAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gH1G/x9mNhvvXXxnRbDdISw8Pc4LrbJv8rS/kqUviyIIgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwf/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4BAAAAAAAAAOoHAAAAAAAAAA==',
            [
                'ANxsS6HbawTiWXyO7YUEIqDMnQUkGXO7sBEAMbCurjec/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4=',
            ],
            null,
            null,
        ]);
    });

    const shouldSeeRootPageAndClickSend = async () => {
        const sendButton = await screen.findByText('Send');
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
        await screen.findByText(
            'Transaction submitted.',
            {},
            { timeout: 5000 }
        );
        await screen.findByText(
            'Transaction successful.',
            {},
            { timeout: 5000 }
        );
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
