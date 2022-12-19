import Loading from '../../components/loading';
import { useFullscreenGuard, useInitializedGuard } from '../../hooks';
import { AppState } from '../../hooks/useInitializedGuard';

import type React from 'react';

const OnboardingLayout = ({
    children,
}: React.HTMLAttributes<HTMLDivElement>) => {
    const guardLoading = useFullscreenGuard(true);
    const checkingInitialized = useInitializedGuard([
        AppState.UNINITIALIZED,
        AppState.HOSTED,
        AppState.MNEMONIC,
        AppState.LOCKED,
    ]);
    return (
        <Loading loading={guardLoading || checkingInitialized} big={true}>
            <div className="relative flex min-h-screen w-full flex-col justify-center place-items-center overflow-hidden bg-ethos-light-fullscreen-backdrop text-ethos-light-text-default">
                {children}
            </div>
        </Loading>
    );
};

export default OnboardingLayout;
