import { Dependencies } from '_shared/utils/dependenciesContext';

export const makeTestDeps = () => {
    return {
        closeWindow: jest.fn(),
        heartbeat: { onBeat: jest.fn() },
        featureFlags: { showUsd: true, showWipFeatures: true },
    };
};
