import { useCallback, useEffect, type ReactNode } from 'react';
import Browser from 'webextension-polyfill';

import { useAppDispatch } from '../hooks';
import { logout } from '../redux/slices/account';

const LockWalletProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();

    const lockWallet = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch]);

    const lockWalletIfTimeIsExpired = useCallback(async () => {
        const { lockWalletOnTimestamp } = await Browser.storage.local.get(
            'lockWalletOnTimestamp'
        );
        if (lockWalletOnTimestamp > 0 && lockWalletOnTimestamp < Date.now()) {
            await lockWallet();
            Browser.storage.local.set({
                lockWalletOnTimestamp: -1,
            });
        }
    }, [lockWallet]);

    useEffect(() => {
        const lockTimeoutInMs = 15 * 60000;
        setInterval(async () => {
            // Check if should log out every 5 seconds
            await lockWalletIfTimeIsExpired();
        }, 5000);
        const onFocus = () => {
            Browser.storage.local.set({
                lockWalletOnTimestamp: -1,
            });
        };
        const onBlur = () => {
            Browser.storage.local.set({
                lockWalletOnTimestamp: Date.now() + lockTimeoutInMs,
            });
        };
        lockWalletIfTimeIsExpired().then(() => onFocus());
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return function cleanup() {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, [lockWalletIfTimeIsExpired]);

    return <>{children}</>;
};

export default LockWalletProvider;
