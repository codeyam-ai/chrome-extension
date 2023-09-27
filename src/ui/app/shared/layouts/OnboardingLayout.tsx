import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';
import {
    useAppSelector,
    useFullscreenGuard,
    useInitializedGuard,
} from '../../hooks';
import { AppState } from '../../hooks/useInitializedGuard';

import type React from 'react';

const OnboardingLayout = ({
    children,
}: React.HTMLAttributes<HTMLDivElement>) => {
    const navigate = useNavigate();
    const onboarding = useAppSelector(({ account }) => account.onboarding);
    const guardLoading = useFullscreenGuard(true);
    const checkingInitialized = useInitializedGuard([
        AppState.UNINITIALIZED,
        AppState.HOSTED,
        AppState.MNEMONIC,
        AppState.LOCKED,
    ]);

    useEffect(() => {
        if (!onboarding) {
            navigate('/', { replace: true });
        }
    }, [navigate, onboarding]);

    return (
        <Loading loading={guardLoading || checkingInitialized} big={true}>
            <div className="relative flex min-h-screen w-full flex-col justify-center place-items-center overflow-hidden bg-ethos-light-fullscreen-backdrop text-ethos-light-text-default">
                {children}
            </div>
        </Loading>
    );
};

export default OnboardingLayout;
