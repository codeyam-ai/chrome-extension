import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';

describe('Buy coin flow', () => {
    let mockchain: Mockchain;

    beforeEach(async () => {
        mockchain = new Mockchain();
        await simulateMnemonicUser();
        mockchain.mockCommonCalls();
        mockchain.mockSuiObjects({
            suiBalance: 0,
        });
    });

    const ShouldClickBuy = async () => {
        await screen.findByText('Wallet Balance');
        const buyButton = await screen.findByText('Buy');
        await userEvent.click(buyButton);
    };

    const disabledAndBack = async () => {
        await screen.findByText('Coming Soon');
        const backButton = await screen.findByText('Back');
        await userEvent.click(backButton);
        await screen.findByText('Wallet Balance');
    };

    const enabledAndOnboard = async () => {
        // TODO: Add logic to test async iFrame loading
    };

    test('Moonpay onboarding is disabled', async () => {
        renderApp({
            dependencies: {
                ...makeTestDeps(),
                featureFlags: {
                    showUsd: false,
                    showWipFeatures: false,
                },
            },
        });
        await ShouldClickBuy();
        await disabledAndBack();
    });

    test('Moonpay onboarding widget is displayed', async () => {
        renderApp({
            dependencies: {
                ...makeTestDeps(),
                featureFlags: {
                    showUsd: false,
                    showWipFeatures: true,
                },
            },
        });
        await ShouldClickBuy();
        await enabledAndOnboard();
    });
});
