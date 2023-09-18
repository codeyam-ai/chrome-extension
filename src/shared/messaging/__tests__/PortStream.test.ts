import { Subject } from 'rxjs';

import { PortStream } from '../PortStream';

import type { Message } from '../messages';
import type { Runtime } from 'webextension-polyfill';

describe('PortStream', () => {
    let port: Runtime.Port;
    let portStream: PortStream;
    let mockOnDisconnect: Subject<any>;
    let mockOnMessage: Subject<any>;

    beforeEach(() => {
        mockOnDisconnect = new Subject();
        mockOnMessage = new Subject();

        port = {
            onDisconnect: {
                addListener: jest.fn(),
                removeListener: jest.fn(),
            },
            onMessage: {
                addListener: jest.fn(),
                removeListener: jest.fn(),
            },
            postMessage: jest.fn(),
        } as any;

        jest.spyOn(port.onDisconnect, 'addListener').mockImplementation((h) => {
            mockOnDisconnect.subscribe(h);
        });
        jest.spyOn(port.onMessage, 'addListener').mockImplementation((h) => {
            mockOnMessage.subscribe(h);
        });

        portStream = new PortStream(port);
    });

    it('should create a PortStream with connected state', () => {
        expect(portStream.connected).toBeTruthy();
    });

    it('should handle disconnect event', () => {
        expect(portStream.connected).toBeTruthy();
        mockOnDisconnect.next(port);
        expect(portStream.connected).toBeFalsy();
    });

    it('should register a listener for incoming messages', () => {
        const message: Message = { id: 'testID', payload: 'testPayload' };
        portStream.onMessage.subscribe((msg) => {
            expect(msg).toBe(message);
        });
        mockOnMessage.next(message);
    });

    it('should send a message using the port', () => {
        const sentMessage: Message = { id: 'testID', payload: 'testPayload' };
        portStream.sendMessage(sentMessage);
        expect(port.postMessage).toHaveBeenCalledWith(sentMessage);
    });

    it('should throw error if port is not defined when sending message', () => {
        portStream = new PortStream(undefined as any);
        expect(() => portStream.sendMessage({} as any)).toThrowError();
    });

    it('should create a response Observable using the message id', () => {
        const sentMessage: Message = { id: 'testID', payload: 'testPayload' };
        const response = portStream.sendMessage(sentMessage);
        response.subscribe((msg) => {
            expect(msg).toBe(sentMessage);
        });
        mockOnMessage.next(sentMessage);
    });

    it('should not create a response Observable if the message id did not match', () => {
        const testMessages: Message[] = [
            { id: 'testID1', payload: 'testPayload1' },
            { id: 'testID2', payload: 'testPayload2' },
        ];
        const response = portStream.sendMessage(testMessages[0]);
        response.subscribe((msg) => {
            expect(msg).toBe(testMessages[0]);
        });
        mockOnMessage.next(testMessages[1]);
    });
});
