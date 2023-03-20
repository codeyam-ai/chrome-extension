import { toB64 } from '@mysten/bcs';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import { BASE_URL } from '_src/shared/constants';
import {
    fakeAccessToken,
    accountInfos,
    password,
    recoveryPhrase,
    simulateMnemonicUser,
    simulateEmailUser,
} from '_src/test/utils/fake-local-storage';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('The Security Settings page', () => {
    let mockchain: Mockchain;

    beforeEach(() => {
        mockchain = new Mockchain();
    });

    const init = () => {
        mockchain.mockSuiObjects({
            suiBalance: 400000000,
        });
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
        await userEvent.type(input, '0.2');
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

    describe('mnemonic user', () => {
        beforeEach(async () => {
            simulateMnemonicUser();
            mockchain.mockCommonCalls();

            // TODO: Remove this and still have the test pass!
            // It seems to be a useless call that errors anyways.
            mockchain.mockBlockchainCall(
                {
                    method: 'sui_getNormalizedMoveFunction',
                    params: [
                        '0x0000000000000000000000000000000000000000000000000000000000000000',
                        'base_registry',
                        'get_record_by_key',
                    ],
                },
                {
                    jsonrpc: '2.0',
                    error: {
                        code: -32000,
                        message:
                            'Package object does not exist with ID 0x0000000000000000000000000000000000000000000000000000000000000000',
                        visibility: 'public',
                    },
                    id: '48ae51da-5987-46fc-8026-274b8f14de80',
                }
            );
        });

        test('allows you to send Sui', async () => {
            init();
            await shouldSeeRootPageAndClickSend();
            // await shouldSeeErrorForInvalidAddress();
            await shouldAddRecipientAndClickContinue();
            await shouldAddAmountAndClickReview();
            // await shouldClickConfirmAndSeeTransactionSubmitted();
        });

        test.todo('it allows you to switch coins');

        test.todo(
            'it shows recent transactions and other internal wallet addresses'
        );

        test.todo(
            'it should fail gracefully when you try to transfer more than you have'
        );
    });

    // describe('email user', () => {

    // });
});
