export const makeTestDeps = () => {
    return {
        closeWindow: jest.fn(),
        heartbeat: { onBeat: jest.fn() },
        featureFlags: {
            showUsd: true,
            // Showing the QR code (in ViewSeedPage.tsx) fails the tests, and it's currently wrapped in the showMobile feature flag.
            showMobile: false,
            showWipFeatures: true,
        },
    };
};
