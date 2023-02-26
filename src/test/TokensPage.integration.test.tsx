import { screen } from '@testing-library/react';

import { simulateMnemonicUser } from '_src/test/utils/fake-local-storage';
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
            coinId: '0xfd9cff9fd6befa0e7d6481d0eeae02056b2ca46e',
            suiBalance: 400000000,
        });
        renderApp();
        await screen.findByText('$40');
    });
});
