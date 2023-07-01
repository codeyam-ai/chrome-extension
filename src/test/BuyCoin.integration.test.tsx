import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import { makeTestDeps } from '_src/test/utils/test-dependencies';

describe('Buy coin flow', () => {
    let mockJsonRpc: MockJsonRpc;

    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        await simulateMnemonicUser();
        mockBlockchain(mockJsonRpc, {
            coinTransaction: 0,
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

    // test('Moonpay onboarding is disabled', async () => {
    //     renderApp({
    //         dependencies: {
    //             ...makeTestDeps(),
    //             featureFlags: {
    //                 showUsd: false,
    //                 showMobile: true,
    //                 showWipFeatures: false,
    //             },
    //         },
    //     });
    //     await ShouldClickBuy();
    //     await disabledAndBack();
    // });

    test.todo('Moonpay onboarding widget is displayed')
    // test('Moonpay onboarding widget is displayed', async () => {
    //     renderApp({
    //         dependencies: {
    //             ...makeTestDeps(),
    //             featureFlags: {
    //                 showUsd: false,
    //                 showMobile: true,
    //                 showWipFeatures: true,
    //             },
    //         },
    //     });
    //     await ShouldClickBuy();
    //     await enabledAndOnboard();
    // });
});
