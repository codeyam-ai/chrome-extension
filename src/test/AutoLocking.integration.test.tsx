import { act, screen } from '@testing-library/react';

import { fakeAlarms } from '_src/test/utils/fake-browser/fake-browser';
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

    class FakeHeartbeat {
        capturedListener?: () => void;
        onBeat(listener: () => void) {
            this.capturedListener = listener;
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

        // at this point we expect the heartbeat listener to be registered but no alarm to be set yet
        expect(fakeHeartbeat.capturedListener).not.toBeNull();
        expect(fakeAlarms.names).not.toContain('lockAlarm');

        // this sends the heartbeat to the background task
        fakeHeartbeat.capturedListener && fakeHeartbeat.capturedListener();
        expect(fakeAlarms.names).toContain('lockAlarm');

        // now invoke the alarm, which should trigger the UI to lock
        act(() => {
            fakeAlarms.onAlarm.listeners[0]({
                name: 'lockAlarm',
                periodInMinutes: 0,
                scheduledTime: 1,
            });
        });

        await screen.findAllByText('Unlock Wallet');
    });
});
