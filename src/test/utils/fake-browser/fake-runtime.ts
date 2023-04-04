export function fakeEvent() {
    return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
        hasListener: jest.fn(),
        hasListeners: () => false,
    };
}

export function fakePort() {
    return {
        name: 'whatever',
        disconnect: jest.fn(),
        onDisconnect: fakeEvent(),
        onMessage: fakeEvent(),
        postMessage: jest.fn(),
    };
}
