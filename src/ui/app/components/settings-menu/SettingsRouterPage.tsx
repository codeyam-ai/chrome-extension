// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LockPage from './subpages/LockPage';
import ThemePage from './subpages/ThemePage';
import ChangePasswordPage from './subpages/security/subpages/change-password/ChangePasswordPage';
import { getEncrypted } from '_src/shared/storagex/store';
import SettingsHomePage from '_src/ui/app/components/settings-menu/SettingsHomePage';
import {
    useNextSettingsUrl,
    useSettingsIsOpen,
    useSettingsUrl,
} from '_src/ui/app/components/settings-menu/hooks';
import ImportWalletPage from '_src/ui/app/components/settings-menu/subpages/ImportWalletPage';
import NetworkPage from '_src/ui/app/components/settings-menu/subpages/network/NetworkPage';
import PermissionsPage from '_src/ui/app/components/settings-menu/subpages/permissions/PermissionsPage';
import SecurityHomePage from '_src/ui/app/components/settings-menu/subpages/security/SecurityHomePage';
import ViewPrivateKeyPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewPrivateKeyPage';
import ViewSeedPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewSeedPage';

function SettingsRouterPage() {
    const [isHostedWallet, setIsHostedWallet] = useState(false);
    const isOpen = useSettingsIsOpen();
    const settingsUrl = useSettingsUrl();
    const settingsHomeUrl = useNextSettingsUrl(true, '/');

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted('authentication');
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    if (!isOpen) {
        return null;
    }
    return (
        <div className="absolute flex flex-col h-[536px] w-full overflow-y-auto z-10 drop-shadow-ethos-box-shadow sm:rounded-[20px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
            <div className="overflow-scroll no-scrollbar">
                <Routes location={settingsUrl || ''}>
                    <Route path="/" element={<SettingsHomePage />} />
                    <Route path="/network" element={<NetworkPage />} />
                    <Route path="/theme" element={<ThemePage />} />
                    <Route
                        path="/security"
                        element={
                            <SecurityHomePage isHostedWallet={isHostedWallet} />
                        }
                    />
                    <Route
                        path="/security/change-password"
                        element={<ChangePasswordPage />}
                    />
                    <Route
                        path="/security/view-seed"
                        element={<ViewSeedPage />}
                    />
                    <Route
                        path="/security/view-private-key"
                        element={<ViewPrivateKeyPage />}
                    />
                    <Route path="/permissions" element={<PermissionsPage />} />
                    <Route path="/lock" element={<LockPage />} />
                    <Route
                        path="/import-wallet"
                        element={<ImportWalletPage />}
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate to={settingsHomeUrl} replace={true} />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default SettingsRouterPage;
