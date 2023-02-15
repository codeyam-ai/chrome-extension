import { screen } from '@testing-library/react';
import _ from 'lodash';
import nock from 'nock';

import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import { renderTemplate } from '_src/test/utils/json-templates';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { preventActWarning } from '_src/test/utils/test-helpers';

describe('The Transaction History Page', () => {
    beforeEach(async () => {
        simulateAuthenticatedUser();
        mockCommonCalls();
    });

    test('Handles a wallet that has no transactions', async () => {
        mockSuiObjects();
        nock('http://testNet-fullnode.example.com')
            .post('/', /sui_getTransactions/)
            .reply(200, [
                {
                    jsonrpc: '2.0',
                    result: { data: [], nextCursor: null },
                    id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                },
                {
                    jsonrpc: '2.0',
                    result: { data: [], nextCursor: null },
                    id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                },
            ]);
        renderApp({ initialRoute: '/transactions' });
        await screen.findByText('No transactions yet');
    });

    test('Shows transactions TO the current wallet', async () => {
        mockSuiObjects();
        mockTransactionHistory();
        renderApp({ initialRoute: '/transactions' });
        await screen.findByText('$100.00');

        preventActWarning();
        await new Promise((r) => setTimeout(r, 10));
    });

    function mockTransactionHistory() {
        const transactionResult = renderTemplate('transaction', {});
        nock('http://testNet-fullnode.example.com')
            .post(
                '/',
                _.matches([
                    {
                        method: 'sui_getTransactions',
                        params: [
                            {
                                ToAddress:
                                    '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                            },
                            null,
                            null,
                            true,
                        ],
                    },
                    {
                        method: 'sui_getTransactions',
                        params: [
                            {
                                FromAddress:
                                    '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                            },
                            null,
                            null,
                            true,
                        ],
                    },
                ])
            )
            .reply(200, [
                {
                    jsonrpc: '2.0',
                    result: {
                        data: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
                        nextCursor: null,
                    },
                    id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                },
                {
                    jsonrpc: '2.0',
                    result: { data: [], nextCursor: null },
                    id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                },
            ])
            .post(
                '/',
                _.matches([
                    {
                        method: 'sui_getTransaction',
                        params: [
                            '5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH',
                        ],
                    },
                ])
            )
            .reply(200, [
                {
                    jsonrpc: '2.0',
                    result: transactionResult,
                    id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                },
            ]);
        nock('http://testNet-fullnode.example.com')
            .persist()
            .post(
                '/',
                _.matches({
                    method: 'sui_getObject',
                    params: ['0x12e502e444d75209e744cd0b8e29b01e7c3ebf96'],
                })
            )
            .reply(200, {
                jsonrpc: '2.0',
                result: renderTemplate('coinObject', {
                    balance: 200000000,
                    id: '0x12e502e444d75209e744cd0b8e29b01e7c3ebf96',
                }),
                id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
            });
        nock('http://testNet-fullnode.example.com')
            .post(
                '/',
                _.matches({
                    method: 'sui_getTransaction',
                    params: ['5VaudApwJSXRCcpzAeKuGsXatyYa1PBMAHhPEDJHEMNH'],
                })
            )
            .reply(200, {
                jsonrpc: '2.0',
                result: transactionResult,
                id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
            });
    }
});
