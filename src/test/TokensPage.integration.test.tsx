import { screen } from '@testing-library/react';

import { simulateMnemonicUser } from '_src/test/utils/storage';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('Rendering the Tokens page', () => {
    let mockchain: Mockchain;
    beforeEach(async () => {
        mockchain = new Mockchain();
        simulateMnemonicUser();
        mockchain.mockCommonCalls();
    });

    test('rendering the Tokens page when wallet has no coins', async () => {
        mockchain.mockSuiObjects();
        renderApp();
        await screen.findByText('Get started with Sui');
    });

    test('rendering the Tokens page when the wallet has some coins', async () => {
        mockchain.mockSuiObjects({
            suiBalance: 40000000000,
        });
        renderApp();
        await screen.findByText('$40');
    });
});
