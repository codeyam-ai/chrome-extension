import { useCallback } from 'react';

import ChainIndicator from './ChainIndicator';
import { BASE_URL, LINK_URL } from '_src/shared/constants';
import { useAppSelector } from '_src/ui/app/hooks';
import UserApproveHeaderWithSiteIcon from '_src/ui/app/shared/headers/page-headers/UserApproveHeaderWithSiteIcon';
import ApproveContainerNavBar from '_src/ui/app/shared/navigation/nav-bar/ApproveContainerNavBar';

import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';
import type { ReactElement } from 'react';

const SimpleBase = ({
    approval,
    onComplete,
    children,
}: {
    approval?: ApprovalRequest | null;
    onComplete: (accept: boolean) => void;
    children: ReactElement;
}) => {
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

    const reject = useCallback(() => {
        onComplete(false);
    }, [onComplete]);

    return (
        <div className="w-full flex flex-col gap-3 text-ethos-light-text-default dark:text-ethos-dark-text-default">
            <ApproveContainerNavBar reject={reject} />
            <UserApproveHeaderWithSiteIcon
                iconSrc={approval?.originFavIcon}
                iconAlt={`${approval?.origin} icon`}
                isConnectingToEthosDashboard={
                    origin === BASE_URL || origin === LINK_URL
                }
            />
            <ChainIndicator apiEnv={selectedApiEnv} />
            {children}
        </div>
    );
};

export default SimpleBase;
