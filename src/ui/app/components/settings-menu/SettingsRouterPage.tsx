// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Route, Routes } from 'react-router-dom';

import LockOrResetPage from './subpages/LockOrReset/LockOrResetPage';
import ThemePage from './subpages/ThemePage';
import ChangePasswordPage from './subpages/security/subpages/change-password/ChangePasswordPage';
import { SettingsContainer } from '../../shared/navigation/nav-bar/SettingsContainer';
import ChangeAutoLockTimeoutPage from '_src/ui/app/components/settings-menu/ChangeAutoLockTimeoutPage';
import SettingsHomePage from '_src/ui/app/components/settings-menu/SettingsHomePage';
import NetworkPage from '_src/ui/app/components/settings-menu/subpages/network/NetworkPage';
import PermissionsPage from '_src/ui/app/components/settings-menu/subpages/permissions/PermissionsPage';
import SecurityHomePage from '_src/ui/app/components/settings-menu/subpages/security/SecurityHomePage';
import ViewPrivateKeyPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewPrivateKeyPage';
import ViewSeedPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/view-seed/ViewSeedPage';
import PersonalizationSync from './subpages/security/subpages/PersonalizationSync';

function SettingsRouterPage() {
    return (
        <Routes>
            <Route path={`settings`} element={<SettingsContainer />}>
                <Route path="main" element={<SettingsHomePage />} />
                <Route path="network" element={<NetworkPage />} />
                <Route path="theme" element={<ThemePage />} />
                <Route path="security">
                    <Route path={'home'} element={<SecurityHomePage />} />
                    <Route
                        path="change-password"
                        element={<ChangePasswordPage />}
                    />
                    <Route path="view-seed" element={<ViewSeedPage />} />
                    <Route
                        path="view-private-key"
                        element={<ViewPrivateKeyPage />}
                    />
                    <Route
                        path="personalization-sync"
                        element={<PersonalizationSync />}
                    />
                    {/* 
                        When adding routes to the security page, make sure to add them to the logic to show the
                        back button in the header at the top of SettingsHomePage.tsx
                    */}
                </Route>
                <Route path="permissions" element={<PermissionsPage />} />
                <Route path="lock" element={<LockOrResetPage />} />
                <Route
                    path="change-auto-lock-timeout"
                    element={<ChangeAutoLockTimeoutPage />}
                />
            </Route>
        </Routes>
    );
}

export default SettingsRouterPage;
