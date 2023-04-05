
export const makeTestDeps = () => {
    return {
        closeWindow: jest.fn(),
        heartbeat: {onBeat: jest.fn()},
    }
}