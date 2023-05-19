import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderTemplate } from '_src/test/utils/json-templates';
import { mockCommonCalls, mockBlockchain } from '_src/test/utils/mockchain';
import { makeCoinObject } from '_src/test/utils/mockchain-templates/coinObject';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import { preventActWarning } from '_src/test/utils/test-helpers';
import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';

xdescribe('The Transaction History Page', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        simulateMnemonicUser();
        mockCommonCalls(mockJsonRpc);
    });

    test('Handles a wallet that has no transactions', async () => {
        mockBlockchain(mockJsonRpc);
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransactions',
                params: [
                    {
                        ToAddress: '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                    },
                ],
            },
            {
                data: [],
                nextCursor: null,
            }
        );
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransactions',
                params: [
                    {
                        FromAddress:
                            '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                    },
                ],
            },
            {
                data: [],
                nextCursor: null,
            }
        );
        renderApp({ initialRoute: '/transactions' });

        // this fails on CI occasionally. 1000ms (the default timeout) seems like it should be plenty, but alas.
        await screen.findByText('No transactions yet', {}, { timeout: 2000 });
    });

    test('Shows transactions TO the current wallet', async () => {
        mockBlockchain(mockJsonRpc);
        mockTransactionHistory();
        renderApp({ initialRoute: '/transactions' });
        await screen.findByText('$1.00', {}, { timeout: 2000 });

        // this annoying code prevents async code from getting scheduled after the test is over. It would be good to
        // find a better pattern; see discussion here:
        // https://discord.com/channels/723559267868737556/723565903228305549/1075109945541926913
        preventActWarning();
        await new Promise((r) => setTimeout(r, 10));
    });

    test('Shows correct transactions when switching wallet', async () => {
        mockBlockchain(mockJsonRpc);
        mockTransactionHistory();
        renderApp({ initialRoute: '/transactions' });
        await screen.findByText('$1.00', {}, { timeout: 2000 });

        let currentWallet = await screen.findByTestId('current-wallet-link');
        await within(currentWallet).findByText('Wallet 1');
        await userEvent.click(currentWallet);

        const wallet2Link = await screen.findByText('Wallet 2');
        await userEvent.click(wallet2Link);

        currentWallet = await screen.findByTestId('current-wallet-link');
        await within(currentWallet).findByText('Wallet 2');

        await await new Promise((r) => setTimeout(r, 500));

        // Note: the page will be loading until the next time the sui objects are fetched on the timer. So that's why we
        // wait 4 seconds. This is a bug, see
        // https://linear.app/ethoswallet/issue/ETHOS-414/switching-wallets-should-not-cause-the-page-to-reload-for-as-much-as-4
        await screen.findByText('No transactions yet', {}, { timeout: 4000 });
        expect(screen.queryByText('$100.00')).toBeFalsy();
    });

    function mockTransactionHistory() {
        const view = renderTemplate('transaction', {});
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransactions',
                params: [
                    {
                        ToAddress: '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                    },
                ],
            },
            {
                data: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
                nextCursor: null,
            }
        );
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransactions',
                params: [
                    {
                        FromAddress:
                            '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                    },
                ],
            },
            {
                data: [],
                nextCursor: null,
            }
        );
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransaction',
                params: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
            },
            view
        );

        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getObject',
                params: ['0x12e502e444d75209e744cd0b8e29b01e7c3ebf96'],
            },
            makeCoinObject(
                200000000,
                '0x12e502e444d75209e744cd0b8e29b01e7c3ebf96'
            ),
            true
        );

        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransactions',
                params: [
                    {
                        ToAddress: '0x434ffd2c55c39aa97f465eb4402ca949a263b868',
                    },
                ],
            },
            {
                data: [],
                nextCursor: null,
            }
        );
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getTransactions',
                params: [
                    {
                        FromAddress:
                            '0x434ffd2c55c39aa97f465eb4402ca949a263b868',
                    },
                ],
            },
            {
                data: [],
                nextCursor: null,
            }
        );
    }
});
