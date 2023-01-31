import { screen } from '@testing-library/react';

import { simulateAuthenticatedUser } from '_src/test/utils/fake-local-storage';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('Rendering the Tokens page', () => {
    beforeEach(async () => {
        simulateAuthenticatedUser();
        mockCommonCalls();
    });

    test('rendering the Tokens page when wallet has no coins', async () => {
        mockSuiObjects();
        renderApp();
        await screen.findByText('Get started with Sui');
    });

    test('rendering the Tokens page when the wallet has some coins', async () => {
        mockSuiObjects({ suiBalance: 400000000 });
        renderApp();
        await screen.findByText('$40');
    });
});
