import iframe from '../iframe';
import { BASE_URL } from '_src/shared/constants';

// Mocking and spying on external dependencies
const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

const mockIframeElement = {
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    contentWindow: {
        postMessage: jest.fn(),
    },
};

Object.defineProperty(document, 'getElementById', {
    value: jest.fn(() => mockIframeElement),
});

// Setting environment variables
process.env.ETHOS_API_KEY = 'test-api-key';

describe('iframe helper', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should listen for logout', async () => {
        const promise = iframe.listenForLogout();
        const mockMessageEvent = new MessageEvent('message', {
            origin: BASE_URL,
            data: { action: 'logoutComplete' },
        });
        window.dispatchEvent(mockMessageEvent);
        await expect(promise).resolves.toBeUndefined();
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function)
        );
    });

    it('should listen for ready', () => {
        iframe.listenForReady();
        const mockMessageEvent = new MessageEvent('message', {
            origin: BASE_URL,
            data: { action: 'ready' },
        });
        window.dispatchEvent(mockMessageEvent);
        expect(mockIframeElement.setAttribute).toHaveBeenCalledWith(
            'readyToReceiveMessages',
            'true'
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function)
        );
    });

    it('should listen for user', () => {
        iframe.listenForUser();
        const mockMessageEvent = new MessageEvent('message', {
            origin: BASE_URL,
            data: { action: 'user', data: {} },
        });
        window.dispatchEvent(mockMessageEvent);
        expect(mockIframeElement.setAttribute).toHaveBeenCalledWith(
            'userReady',
            'true'
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function)
        );
    });

    it('should login', async () => {
        const promise = iframe.login('test@email.com');
        const mockMessageEvent = new MessageEvent('message', {
            origin: BASE_URL,
            data: { action: 'login', data: {} },
        });
        window.dispatchEvent(mockMessageEvent);
        await expect(promise).resolves.toEqual({});
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function)
        );
    });

    it('should log out', async () => {
        const promise = iframe.logOut('test@email.com');
        const mockMessageEvent = new MessageEvent('message', {
            origin: BASE_URL,
            data: { action: 'logout', data: {} },
        });
        window.dispatchEvent(mockMessageEvent);
        await expect(promise).resolves.toEqual({});
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function)
        );
    });

    it('should message wallet', () => {
        const message = {
            action: 'testAction',
            data: {},
        };
        iframe.messageWallet(message);
        expect(
            mockIframeElement.contentWindow.postMessage
        ).toHaveBeenCalledWith(
            { ...message, data: { apiKey: 'test-api-key' } },
            '*'
        );
    });

    it('should connect app', async () => {
        const promise = iframe.connectApp();
        const mockMessageEvent = new MessageEvent('message', {
            origin: BASE_URL,
            data: { action: 'user', data: {} },
        });
        window.dispatchEvent(mockMessageEvent);
        await expect(promise).resolves.toEqual({});
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'message',
            expect.any(Function)
        );
    });
});
