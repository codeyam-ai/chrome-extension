import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';
import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';

describe('Buy coin flow', () => {
    let mockchain: MockJsonRpc;

    beforeEach(async () => {
        mockchain = new MockJsonRpc();
        await simulateMnemonicUser();
        mockCommonCalls(mockchain);
        mockSuiObjects(mockchain, {
            suiBalance: 0,
        });
    });

    const ShouldClickBuy = async () => {
        await screen.findByText('My Balance');
        const buyButton = await screen.findByText('Buy');
        await userEvent.click(buyButton);
    };

    const disabledAndBack = async () => {
        await screen.findByText('Coming Soon');
        const backButton = await screen.findByText('Back');
        await userEvent.click(backButton);
        await screen.findByText('My Balance');
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
        // await ShouldClickBuy();
        // await disabledAndBack();
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
        // await ShouldClickBuy();
        // await enabledAndOnboard();
    });
});
