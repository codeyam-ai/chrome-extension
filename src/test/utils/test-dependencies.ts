export const makeTestDeps = () => {
    return {
        closeWindow: jest.fn(),
        heartbeat: { onBeat: jest.fn() },
        featureFlags: {
            showUsd: true,
            showMobile: true,
            showWipFeatures: true,
        },
    };
};
