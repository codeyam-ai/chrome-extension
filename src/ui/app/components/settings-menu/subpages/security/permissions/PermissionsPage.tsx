import { useCallback, useEffect, useMemo, useState } from 'react';

import ConnectedAppDisplay from './ConnectedAppDisplay';
import Permissions from '_src/background/Permissions';
import Transactions from '_src/background/Transactions';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

import type { Permission } from '_src/shared/messaging/messages/payloads/permissions';
import type { PreapprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';

export interface ConnectedApp extends Permission {
    preappovals: PreapprovalRequest[];
}

const PermissionsPage = () => {
    const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [, setPreapprovals] = useState<PreapprovalRequest[]>([]);

    const getPreapprovals = useCallback(async () => {
        const _preapprovals = await Transactions.getPreapprovalRequests();
        setPreapprovals(Object.values(_preapprovals));
    }, []);

    const getConnectedApps = async () => {
        const _permissions = Object.values(await Permissions.getPermissions());
        const _preapprovals = await Transactions.getPreapprovalRequests();

        const _connectedApps: ConnectedApp[] = [];

        for (const _permission in _permissions) {
            if (
                Object.prototype.hasOwnProperty.call(_permissions, _permission)
            ) {
                const connectedApp = _permissions[_permission] as ConnectedApp;
                connectedApp.preappovals = [];
                for (const _preapproval in _preapprovals) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            _preapprovals,
                            _preapproval
                        )
                    ) {
                        const preapproval = _preapprovals[_preapproval];
                        if (connectedApp.origin === preapproval.origin) {
                            connectedApp.preappovals.push(preapproval);
                        }
                    }
                }
                _connectedApps.push(connectedApp);
            }
        }
        setConnectedApps(_connectedApps);
    };

    const connectedAppsDisplay = useMemo(() => {
        return connectedApps.filter(
            (connectedApp) => connectedApp.permissions.length > 0
        );
    }, [connectedApps]);

    const revokePreapprovals = async (preappovals: PreapprovalRequest[]) => {
        for (const preappoval of preappovals) {
            await Transactions.removePreapprovalRequest(
                preappoval.id as string
            );
        }
    };

    const revokeAccess = useCallback(
        async (connectedApp: ConnectedApp) => {
            await Permissions.revokeAllPermissions(connectedApp.origin);

            await revokePreapprovals(connectedApp.preappovals);

            // remove site from UI (thinking about how I can do this by having state keep track of current permissions instead)
            const updatedConnectedApps = connectedApps.filter(
                (c) => c.origin !== connectedApp.origin
            );
            getConnectedApps();
            setPermissions(updatedConnectedApps);
        },
        [connectedApps]
    );

    useEffect(() => {
        getPreapprovals();
    }, [getPreapprovals]);

    useEffect(() => {
        const getPermissions = async () => {
            const _permissions = Object.values(
                await Permissions.getPermissions()
            );
            setPermissions(_permissions);
        };
        getPermissions();
    }, []);

    useEffect(() => {
        getConnectedApps();
    }, []);

    return (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Connected Apps</Header>
                <BodyLarge isTextColorMedium>
                    Here you can manage or remove your connected apps.
                </BodyLarge>
            </ContentBlock>

            {connectedAppsDisplay.map((connectedApp, key) => {
                return (
                    <ConnectedAppDisplay
                        connectedApp={connectedApp}
                        revokeAccess={revokeAccess}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

export default PermissionsPage;
