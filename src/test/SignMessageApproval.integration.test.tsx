import { toB64 } from '@mysten/sui.js';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TX_STORE_KEY } from '_shared/constants';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';
import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockCommonCalls } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { accountInfos, simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';

import type { ApprovalRequest, SignMessageApprovalRequest } from '_payloads/transactions';

describe('The Sign Message Approval popup', () => {
    const txRequestId = '95ae4a0d-0b7b-478b-ab70-bc3fe291540e';
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        mockCommonCalls(mockJsonRpc);
        await simulateMnemonicUser();
    });

    test('shows the message to sign and allows user to approve it', async () => {
        await simulateReduxStateWithSignMessage(txRequestId);
        const testDeps = makeTestDeps();
        const mockWindowCloser = testDeps.closeWindow;
        console.log("HIy0")
        renderApp({
            initialRoute: `/sign-message-approval/${txRequestId}`,
            dependencies: testDeps,
        });

        console.log("HIy1s")
        await screen.findByText('HI THERE');

        console.log("HIy1")
        await screen.findByText('Message To Sign');
        console.log("HIy2")
        await screen.findByText('hello');
        console.log("HIy3")
        const approveButton = await screen.findByText('Approve');

        await userEvent.click(approveButton);
        await waitFor(() => {
            expect(mockWindowCloser.mock.calls.length).toEqual(1);
        });

        const response = await getApprovalRequestFromLocalStorage(txRequestId);
        console.log("REPSONSE", response)
    });

    // test('the user can reject the transaction', async () => {
    //     await simulateReduxStateWithSignMessage(txRequestId);

    //     const testDeps = makeTestDeps();
    //     const mockWindowCloser = testDeps.closeWindow;

    //     renderApp({
    //         initialRoute: `/tx-approval/${txRequestId}`,
    //         dependencies: testDeps,
    //     });

    //     await screen.findByText('Cost', {}, { timeout: 5000 });

    //     const cancelButton = await screen.findByText('Cancel');
    //     await userEvent.click(cancelButton);
    //     await waitFor(() =>
    //         expect(mockWindowCloser.mock.calls.length).toEqual(1)
    //     );
    // });

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

    async function getApprovalRequestFromLocalStorage(
        txRequestId: string
    ) {
        const response = await getEncrypted({
            key: TX_STORE_KEY,
            session: false,
            strong: false,
        });
        if (!response) return;

        const approvalRequests = JSON.parse(response);

        return approvalRequests[txRequestId];
    }

    async function simulateReduxStateWithSignMessage(txRequestId: string) {
        const message = toB64(new TextEncoder().encode('hello'));
        const txRequest: SignMessageApprovalRequest = {
            id: txRequestId,
            origin: 'https://ethoswallet.xyz',
            originFavIcon: 'https://ethoswallet.xyz/favicon.ico',
            createdDate: '2022-11-29T23:33:53.084Z',
            approved: true,
            tx: {
                type: 'sign-message',
                message,
                accountAddress: accountInfos[0].address,
            },
        };

        await putApprovalRequestInLocalStorage(txRequestId, txRequest);
    }
});
