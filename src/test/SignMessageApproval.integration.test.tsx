import { type SignedMessage } from '@mysten/sui.js';
import { toB64 } from '@mysten/sui.js/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BackgroundClient } from '_app/background-client';
import { TX_STORE_KEY } from '_shared/constants';
import { setEncrypted } from '_src/shared/storagex/store';
import { renderApp } from '_src/test/utils/react-rendering';
import { accountInfos, simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';

import type {
    ApprovalRequest,
    SignPersonalMessageApprovalRequest,
} from '_payloads/transactions';

describe('The Sign Message Approval popup', () => {
    const responseSpy = jest.spyOn(
        BackgroundClient.prototype,
        'sendTransactionRequestResponse'
    );

    const txRequestId = '95ae4a0d-0b7b-478b-ab70-bc3fe291540e';

    beforeEach(async () => {
        await simulateMnemonicUser();
        responseSpy.mockClear();
    });

    test('shows the message to sign and allows user to approve it', async () => {
        await simulateReduxStateWithSignMessage(txRequestId);
        const testDeps = makeTestDeps();
        const mockWindowCloser = testDeps.closeWindow;
        renderApp({
            initialRoute: `/sign-personal-message-approval/${txRequestId}`,
            dependencies: testDeps,
        });

        await screen.findByText('Message To Sign');
        await screen.findByText('hello');
        const approveButton = await screen.findByText('Sign');

        await userEvent.click(approveButton);
        await waitFor(() => {
            expect(mockWindowCloser.mock.calls.length).toEqual(1);
        });

        expect(responseSpy.mock.calls.length).toEqual(1);

        expect(responseSpy.mock.calls[0][1]).toBe(true);

        const result = responseSpy.mock.calls[0][2] as SignedMessage;
        expect(result).toBeDefined();
        expect(result.bytes).toEqual('aGVsbG8=');
        expect(result.signature).toEqual(
            'AODqBuGDqJhM2N0HJECuKowhEl2ZSpQ1t8jGGIa8CH1q/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4='
        );
    });

    test('shows the message to sign and allows user to reject it', async () => {
        await simulateReduxStateWithSignMessage(txRequestId);
        const testDeps = makeTestDeps();
        const mockWindowCloser = testDeps.closeWindow;
        renderApp({
            initialRoute: `/sign-personal-message-approval/${txRequestId}`,
            dependencies: testDeps,
        });

        await screen.findByText('Message To Sign');
        await screen.findByText('hello');
        const approveButton = await screen.findByText('Reject');

        await userEvent.click(approveButton);
        await waitFor(() => {
            expect(mockWindowCloser.mock.calls.length).toEqual(1);
        });

        expect(responseSpy.mock.calls.length).toEqual(1);

        expect(responseSpy.mock.calls[0][1]).toBe(false);
        expect(responseSpy.mock.calls[0][2]).toBeUndefined();
    });

    async function putApprovalRequestInLocalStorage(
        txRequestId: string,
        txRequest: ApprovalRequest
    ) {
        await setEncrypted({
            key: TX_STORE_KEY,
            value: JSON.stringify({ [txRequestId]: txRequest }),
            session: false,
            strong: false,
        });
    }

    async function simulateReduxStateWithSignMessage(txRequestId: string) {
        const message = toB64(new TextEncoder().encode('hello'));
        const txRequest: SignPersonalMessageApprovalRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            approved: true,
            tx: {
                type: 'sign-personal-message',
                message,
                accountAddress: accountInfos[0].address,
            },
        };

        await putApprovalRequestInLocalStorage(txRequestId, txRequest);
    }
});
