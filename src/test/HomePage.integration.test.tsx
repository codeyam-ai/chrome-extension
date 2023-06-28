import { screen, waitFor, within } from '@testing-library/react';
import nock from 'nock';

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

        nock('https://explorer.ethoswallet.xyz')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .persist()
            .get('/api/v1/coin/convert')
            .reply(200, {
                fiatCurrency: 'usd',
                fiatSymbol: '$',
                conversionRate: 100,
                cryptocurrencySymbol: 'sui',
            });
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
                coinTransaction: 40000000000,
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

            await within(walletAndBalance).queryByText('40 SUI');
            await waitFor(() => screen.getByText('SUI Balance ≈ $4,000 USD'));

            const coinList = await screen.findByTestId('coin-list');
            await within(coinList).findByText('≈ $4,000.00 USD');
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
            expect(
                within(walletAndBalance).queryByText('SUI Balance ≈ $4,000 USD')
            ).toBeNull();

            const coinList = await screen.findByTestId('coin-list');
            expect(within(coinList).queryByText('$4,000.00 USD')).toBeNull();
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
