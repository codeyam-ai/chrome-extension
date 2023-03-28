// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import LockPage from './subpages/LockPage';
import ThemePage from './subpages/ThemePage';
import ChangePasswordPage from './subpages/security/subpages/change-password/ChangePasswordPage';
import { SettingsContainer } from '../../shared/navigation/nav-bar/SettingsContainer';
import { getEncrypted } from '_src/shared/storagex/store';
import SettingsHomePage from '_src/ui/app/components/settings-menu/SettingsHomePage';
import NetworkPage from '_src/ui/app/components/settings-menu/subpages/network/NetworkPage';
import PermissionsPage from '_src/ui/app/components/settings-menu/subpages/permissions/PermissionsPage';
import SecurityHomePage from '_src/ui/app/components/settings-menu/subpages/security/SecurityHomePage';
import ViewPrivateKeyPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewPrivateKeyPage';
import ViewSeedPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewSeedPage';

function SettingsRouterPage() {
    const [isHostedWallet, setIsHostedWallet] = useState(false);

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted({
                key: 'authentication',
                session: true,
            });
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    return (
        <Routes>
            <Route path={`settings`} element={<SettingsContainer />}>
                <Route path="main" element={<SettingsHomePage />} />
                <Route path="network" element={<NetworkPage />} />
                <Route path="theme" element={<ThemePage />} />
                <Route path="security">
                    <Route
                        path={'home'}
                        element={
                            <SecurityHomePage isHostedWallet={isHostedWallet} />
                        }
                    />
                    <Route
                        path="change-password"
                        element={<ChangePasswordPage />}
                    />
                    <Route path="view-seed" element={<ViewSeedPage />} />
                    <Route
                        path="view-private-key"
                        element={<ViewPrivateKeyPage />}
                    />
                </Route>
                <Route path="permissions" element={<PermissionsPage />} />
                <Route path="lock" element={<LockPage />} />
            </Route>
        </Routes>
    );
}

export default SettingsRouterPage;
