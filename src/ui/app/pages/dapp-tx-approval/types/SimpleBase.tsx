import { useCallback } from 'react';

import { startWalletLockTimer } from '_src/ui/app/helpers/lock-wallet';
import ApproveContainerNavBar from '_src/ui/app/shared/navigation/nav-bar/ApproveContainerNavBar';

import type { ReactElement } from 'react';

const SimpleBase = ({
    onComplete,
    children,
}: {
    onComplete: (accept: boolean) => void;
    children: ReactElement;
}) => {
    const reject = useCallback(() => {
        startWalletLockTimer();
        onComplete(false);
    }, [onComplete]);

    return (
        <div className="w-full">
            <ApproveContainerNavBar reject={reject} />
            {children}
        </div>
    );
};

export default SimpleBase;
