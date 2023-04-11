import { screen } from '@testing-library/react';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';

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

    describe('when the wallet has some coins', () => {
        test('shows the USD amount when configured to do so', async () => {
            mockchain.mockSuiObjects({
                suiBalance: 40000000000,
            });
            renderApp();
            await screen.findByText('$4,000');
        });

        xtest('shows the SUI amount when configured to do so', async () => {
            mockchain.mockSuiObjects({
                suiBalance: 40000000000,
            });
            renderApp();
            await screen.findByText('40 SUI');
        });
    });
});
