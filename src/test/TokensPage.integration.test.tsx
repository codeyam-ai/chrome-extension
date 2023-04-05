import { screen } from '@testing-library/react';

import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';
import {fakeAlarms} from "_src/test/utils/fake-browser/fake-browser";

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
        await screen.findByText('$4,000');
    });

    class FakeHeartbeat {
        capturedBeatCallback?: () => void;
        onBeat(callback: () => void) {
            this.capturedBeatCallback = callback;
        }
    }

    test('sends heartbeat and locks when background service says to', async () => {
        const fakeHeartbeat = new FakeHeartbeat();
        mockchain.mockSuiObjects();
        renderApp({
            dependencies: {
                closeWindow: jest.fn(),
                heartbeat: fakeHeartbeat,
            },
        });
        await screen.findByText('Get started with Sui');

        expect(fakeHeartbeat.capturedBeatCallback).not.toBeNull();
        expect(fakeAlarms.names).not.toContain('lockAlarm');
        fakeHeartbeat.capturedBeatCallback &&
        fakeHeartbeat.capturedBeatCallback();

        // make sure alarm has been set
        expect(fakeAlarms.names).toContain('lockAlarm');

        // then invoke the alarm
        fakeAlarms.onAlarm.listeners[0]({name: 'lockAlarm', periodInMinutes: 0, scheduledTime: 1})

        await screen.findAllByText('Unlock Wallet');
    });

});
