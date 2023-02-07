import { screen } from '@testing-library/react';
import nock from 'nock';

import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('Rendering the Tokens page', () => {
    beforeEach(async () => {
        simulateAuthenticatedUser();
        mockCommonCalls();
    });

    test('rendering the Transaction History page when wallet has no transactions', async () => {
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
});
