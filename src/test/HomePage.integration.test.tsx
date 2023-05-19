import { screen, within } from '@testing-library/react';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';

describe('Rendering the Home page', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        simulateMnemonicUser();
    });

    test('when wallet has no coins', async () => {
        mockBlockchain(mockJsonRpc, {
            stakedSui: [
                {
                    principal: '1000000000',
                },
                {
                    principal: '1000000000',
                },
            ],
        });
        renderApp();
        await screen.findByText('Get started with Sui');
    });

    describe('when the wallet has some coins', () => {
        beforeEach(async () => {
            mockBlockchain(mockJsonRpc, {
                suiBalance: 40000000000,
                stakedSui: [
                    {
                        principal: '1000000000',
                    },
                    {
                        principal: '1000000000',
                    },
                ],
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
            await within(coinList).findByText('40 SUI');
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
            await within(coinList).findByText('40 SUI');
        });
    });

    describe('when the wallet has staked SUI', () => {
        beforeEach(async () => {
            mockBlockchain(mockJsonRpc, {
                stakedSui: [
                    {
                        principal: '1000000000',
                    },
                    {
                        principal: '1000000000',
                    },
                ],
            });
        });

        test('shows staked SUI total', async () => {
            renderApp();

            const stakedInfo = await screen.findByTestId('staked-sui-info');

            await within(stakedInfo).findByText('Go to Staking');
            await within(stakedInfo).findByText('2 SUI');
        });
    });
});
