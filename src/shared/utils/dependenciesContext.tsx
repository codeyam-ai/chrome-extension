import { createContext, useContext } from 'react';

export interface WindowCloser {
    (): void;
}

export interface Heartbeat {
    onBeat(listener: () => void): void;
}

export interface FeatureFlags {
    showUsd: boolean;
}

export interface Dependencies {
    closeWindow: WindowCloser;
    featureFlags: FeatureFlags;
    heartbeat: Heartbeat;
}
export const DependenciesContext = createContext<Dependencies | undefined>(
    undefined
);

export const useDependencies = (): Dependencies => {
    const dependencies = useContext(DependenciesContext);
    if (!dependencies) {
        throw new Error('Dependencies not found');
    }
    return dependencies;
};
