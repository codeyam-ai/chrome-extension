import { useCallback } from 'react';

import ChainIndicator from './ChainIndicator';
import { startWalletLockTimer } from '_src/ui/app/helpers/lock-wallet';
import { useAppSelector } from '_src/ui/app/hooks';
import ApproveContainerNavBar from '_src/ui/app/shared/navigation/nav-bar/ApproveContainerNavBar';

import type { ReactElement } from 'react';

const SimpleBase = ({
    onComplete,
    children,
}: {
    onComplete: (accept: boolean) => void;
    children: ReactElement;
}) => {
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

    const reject = useCallback(() => {
        startWalletLockTimer();
        onComplete(false);
    }, [onComplete]);

    return (
        <div className="w-full flex flex-col gap-3 text-ethos-light-text-default dark:text-ethos-dark-text-default">
            <ApproveContainerNavBar reject={reject} />
            <ChainIndicator apiEnv={selectedApiEnv} />
            {children}
        </div>
    );
};

export default SimpleBase;
