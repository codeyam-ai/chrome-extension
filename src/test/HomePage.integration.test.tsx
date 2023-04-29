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
        beforeEach(async () => {
            mockchain.mockSuiObjects({
                suiBalance: 40000000000,
            });
        });
        test('shows the USD amount when configured to do so', async () => {
            renderApp();

            const walletAndBalance = await screen.findByTestId(
                'wallet-and-balance'
            );
            await within(walletAndBalance).findByText('$4,000');
            expect(within(walletAndBalance).queryByText('40 SUI')).toBeNull();

            const coinList = await screen.findByTestId('coin-list');
            await within(coinList).findByText('$4,000.00');
            await within(coinList).findByText('40');
        });

        test('shows just the SUI amount when configured to do so', async () => {
            const testDeps = makeTestDeps();
            renderApp({
                dependencies: {
                    ...testDeps,
                    featureFlags: {
                        ...testDeps.featureFlags,
                        showUsd: false,
                    },
                },
            });

            const walletAndBalance = await screen.findByTestId(
                'wallet-and-balance'
            );
            expect(within(walletAndBalance).queryByText('$4,000')).toBeNull();
            // Amount and coin symbol are in separate elements
            await within(walletAndBalance).findByText('40');
            await within(walletAndBalance).findByText('SUI');

            const coinList = await screen.findByTestId('coin-list');
            expect(within(coinList).queryByText('$4,000.00')).toBeNull();
            await within(coinList).findByText('40');
        });
    });
});
