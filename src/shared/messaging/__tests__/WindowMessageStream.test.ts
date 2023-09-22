import { WindowMessageStream } from '../WindowMessageStream';

describe('WindowMessageStream', () => {
    let messageStream: WindowMessageStream;
    let messageEvent: Event;

    beforeEach(() => {
        global.window.postMessage = jest.fn();
        messageEvent = new MessageEvent('message', {
            data: { target: 'ethos_in-page', payload: {} },
        });
    });

    test('constructor throws an error if name and target are the same', () => {
        expect(
            () => new WindowMessageStream('ethos_in-page', 'ethos_in-page')
        ).toThrowError(
            '[WindowMessageStream] name and target must be different'
        );
    });

    test('messages should be an observable of the window messages', () => {
        messageStream = new WindowMessageStream(
            'ethos_in-page',
            'ethos_content-script'
        );
        window.dispatchEvent(messageEvent);
        messageStream.messages.subscribe((message) => {
            expect(message).toEqual({});
        });
    });

    test('send method should post a message to the window', () => {
        messageStream = new WindowMessageStream(
            'ethos_in-page',
            'ethos_content-script'
        );
        messageStream.send({ id: 'id', payload: { type: 'disconnect-app' } });
        expect(window.postMessage).toHaveBeenCalled();
    });
});
