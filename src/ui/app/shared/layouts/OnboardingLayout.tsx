import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';
import {
    useAppSelector,
    useFullscreenGuard,
    useInitializedGuard,
} from '../../hooks';
import { AppState } from '../../hooks/useInitializedGuard';
import { AccountType } from '_src/shared/constants';

import type React from 'react';

const OnboardingLayout = ({
    children,
}: React.HTMLAttributes<HTMLDivElement>) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onboarding = useAppSelector(({ account }) => account.onboarding);
    const accountType = useAppSelector(({ account }) => account.accountType);
    const guardLoading = useFullscreenGuard(true);
    const checkingInitialized = useInitializedGuard([
        AppState.UNINITIALIZED,
        AppState.HOSTED,
        AppState.ZK,
        AppState.MNEMONIC,
        AppState.LOCKED,
    ]);

    useEffect(() => {
        if (
            accountType === AccountType.EMAIL ||
            accountType === AccountType.ZK
        ) {
            if (pathname === '/welcome') {
                return;
            }
        }
        if (!onboarding) {
            navigate('/', { replace: true });
        }
    }, [pathname, navigate, onboarding, accountType]);

    return (
        <Loading loading={guardLoading || checkingInitialized} big={true}>
            <div className="relative flex min-h-screen w-full flex-col justify-center place-items-center overflow-hidden bg-ethos-light-fullscreen-backdrop text-ethos-light-text-default">
                {children}
            </div>
        </Loading>
    );
};

export default OnboardingLayout;
