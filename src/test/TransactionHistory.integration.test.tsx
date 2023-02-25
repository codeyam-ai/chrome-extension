import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import nock from 'nock';

import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import { renderTemplate } from '_src/test/utils/json-templates';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { preventActWarning } from '_src/test/utils/test-helpers';

describe('The Transaction History Page', () => {
    let mockchain: Mockchain;
    beforeEach(async () => {
        mockchain = new Mockchain();
        simulateAuthenticatedUser();
        mockchain.mockCommonCalls();
    });

    test('Handles a wallet that has no transactions', async () => {
        mockchain.mockSuiObjects();
        mockchain.mockBlockchainBatchCall(
            [
                { method: 'sui_getTransactions' },
                { method: 'sui_getTransactions' },
            ],
            [
                { data: [], nextCursor: null },
                { data: [], nextCursor: null },
            ]
        );
        renderApp({ initialRoute: '/transactions' });

        // this fails on CI occasionally. 1000ms (the default timeout) seems like it should be plenty, but alas.
        await screen.findByText('No transactions yet', {}, { timeout: 2000 });
    });

    test('Shows transactions TO the current wallet', async () => {
        mockchain.mockSuiObjects();
        mockTransactionHistory();
        renderApp({ initialRoute: '/transactions' });
        await screen.findByText('$100.00', {}, { timeout: 2000 });

        // this annoying code prevents async code from getting scheduled after the test is over. It would be good to
        // find a better pattern; see discussion here:
        // https://discord.com/channels/723559267868737556/723565903228305549/1075109945541926913
        preventActWarning();
        await new Promise((r) => setTimeout(r, 10));
    });

    test('Shows correct transactions when switching wallet', async () => {
        mockchain.mockSuiObjects();
        mockTransactionHistory();
        renderApp({ initialRoute: '/transactions' });
        await screen.findByText('$100.00', {}, { timeout: 2000 });

        let currentWallet = await screen.findByTestId('current-wallet');
        await within(currentWallet).findByText('Wallet 1');
        await userEvent.click(currentWallet);

        const wallet2Link = await screen.findByText('Wallet 2');
        await userEvent.click(wallet2Link);

        currentWallet = await screen.findByTestId('current-wallet');
        await within(currentWallet).findByText('Wallet 2');

        await await new Promise((r) => setTimeout(r, 500));

        // Note: the page will be loading until the next time the sui objects are fetched on the timer. So that's why we
        // wait 4 seconds. This is a bug, see
        //linear.app/ethoswallet/issue/ETHOS-414/switching-wallets-should-not-cause-the-page-to-reload-for-as-much-as-4
        https: await screen.findByText(
            'No transactions yet',
            {},
            { timeout: 4000 }
        );
        expect(screen.queryByText('$100.00')).toBeFalsy();
    });

    function mockTransactionHistory() {
        const view = renderTemplate('transaction', {});
        mockchain.mockBlockchainBatchCall(
            [
                {
                    method: 'sui_getTransactions',
                    params: [
                        {
                            ToAddress:
                                '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                        },
                    ],
                },
                {
                    method: 'sui_getTransactions',
                    params: [
                        {
                            FromAddress:
                                '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                        },
                    ],
                },
            ],
            [
                {
                    data: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
                    nextCursor: null,
                },
                { data: [], nextCursor: null },
            ]
        );
        mockchain.mockBlockchainBatchCall(
            [
                {
                    method: 'sui_getTransaction',
                    params: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
                },
            ],
            [view]
        );

        // TODO: sui_getObject is already mocked in mockchain...it's inconsistent to mock it a second time here. probably
        // we should expand mockchain such that it will create objects and transactions together. after all,
        // you can't have objects without transactions, so it makes sense that if you tell it you want an object,
        // you'll also get a corresponding transaction
        mockchain.mockBlockchainCall(
            {
                method: 'sui_getObject',
                params: ['0x12e502e444d75209e744cd0b8e29b01e7c3ebf96'],
            },
            renderTemplate('coinObject', {
                balance: 200000000,
                id: '0x12e502e444d75209e744cd0b8e29b01e7c3ebf96',
            }),
            true
        );
        mockchain.mockBlockchainCall(
            {
                method: 'sui_getTransaction',
                params: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
            },
            view
        );

        mockchain.mockBlockchainBatchCall(
            [
                {
                    method: 'sui_getObject',
                    params: ['0x0000000000000000000000000000000000000005'],
                },
            ],
            [],
            true
        );

        mockchain.mockBlockchainBatchCall(
            [
                {
                    method: 'sui_getTransactions',
                    params: [
                        {
                            ToAddress:
                                '0x434ffd2c55c39aa97f465eb4402ca949a263b868',
                        },
                    ],
                },
                {
                    method: 'sui_getTransactions',
                    params: [
                        {
                            FromAddress:
                                '0x434ffd2c55c39aa97f465eb4402ca949a263b868',
                        },
                    ],
                },
            ],
            [
                { data: [], nextCursor: null },
                { data: [], nextCursor: null },
            ],
            true
        );
    }
});
