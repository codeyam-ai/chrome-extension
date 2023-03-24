import { useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Browser, { ActivityLog } from 'webextension-polyfill';

import {
    resetWalletLockTimer,
    startWalletLockTimer,
} from '../helpers/lock-wallet';
import { useAppDispatch } from '../hooks';
import { logout } from '../redux/slices/account';

const LockWalletProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const lockWallet = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch]);

    const lockWalletIfTimeIsExpired = useCallback(async () => {
        const { lockWalletOnTimestamp } = await Browser.storage.local.get(
            'lockWalletOnTimestamp'
        );
        if (lockWalletOnTimestamp > 0 && lockWalletOnTimestamp < Date.now()) {
            await lockWallet();
            resetWalletLockTimer();
        }
    }, [lockWallet]);

    const isOnboarding = useMemo(() => {
        return pathname.includes('welcome') || pathname.includes('initialize');
    }, [pathname]);

    useEffect(() => {
        setInterval(async () => {
            // Check if should log out every 5 seconds
            await lockWalletIfTimeIsExpired();
        }, 5000);
        const onFocus = () => {
            resetWalletLockTimer();
        };
        const onBlur = () => {
            if (!isOnboarding) {
                startWalletLockTimer();
            }
        };
        lockWalletIfTimeIsExpired().then(() => onFocus());
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return function cleanup() {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, [lockWalletIfTimeIsExpired, isOnboarding]);

    return <>{children}</>;
};

export default LockWalletProvider;
