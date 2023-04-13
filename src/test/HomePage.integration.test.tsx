import { screen, within } from '@testing-library/react';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';

describe('Rendering the Home page', () => {
    let mockchain: Mockchain;
    beforeEach(async () => {
        mockchain = new Mockchain();
        simulateMnemonicUser();
        mockchain.mockCommonCalls();
    });

    test('when wallet has no coins', async () => {
        mockchain.mockSuiObjects();
        renderApp();
        await screen.findByText('Get started with Sui');
    });

    describe('when the wallet has some coins', () => {
        test('shows the USD amount AND NOT the SUI amount when configured to do so', async () => {
            mockchain.mockSuiObjects({
                suiBalance: 40000000000,
            });
            renderApp();

            // be careful only to check within the main part of the screen, as there is also a CoinList with
            // similar information.
            const walletAndBalance = await screen.findByTestId(
                'wallet-and-balance'
            );
            await within(walletAndBalance).findByText('$4,000');
            expect(within(walletAndBalance).queryByText('40 SUI')).toBeNull();
        });

        test('shows just the SUI amount when configured to do so', async () => {
            mockchain.mockSuiObjects({
                suiBalance: 40000000000,
            });
            renderApp({
                dependencies: {
                    ...makeTestDeps(),
                    featureFlags: { showUsd: false },
                },
            });

            // be careful only to check within the main part of the screen, as there is also a CoinList with
            // similar information.
            const walletAndBalance = await screen.findByTestId(
                'wallet-and-balance'
            );
            expect(within(walletAndBalance).queryByText('$4,000')).toBeNull();
            await within(walletAndBalance).findByText('40 SUI');
        });
    });
});
