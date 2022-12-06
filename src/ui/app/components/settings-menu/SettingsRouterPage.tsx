// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import HeaderWithClose from '../../shared/headers/section-headers/HeaderWithClose';
import NavBarWithBackAndWalletPicker from '../../shared/navigation/nav-bar/NavBarWithBackAndWalletPicker';
import LockPage from './subpages/LockPage';
import ThemePage from './subpages/ThemePage';
import ChangePasswordPage from './subpages/security/subpages/change-password/ChangePasswordPage';
import { useOnKeyboardEvent } from '_hooks';
import { getEncrypted } from '_src/shared/storagex/store';
import ConnectedApps from '_src/ui/app/components/menu/content/connected-apps';
import Preapprovals from '_src/ui/app/components/menu/content/preapprovals';
import SettingsHomePage from '_src/ui/app/components/settings-menu/SettingsHomePage';
import {
    useSettingsIsOpen,
    useSettingsUrl,
    useNextSettingsUrl,
    useSettingsIsOpenOnSubPage,
} from '_src/ui/app/components/settings-menu/hooks';
import ImportWalletPage from '_src/ui/app/components/settings-menu/subpages/ImportWalletPage';
import PermissionsPage from '_src/ui/app/components/settings-menu/subpages/PermissionsPage';
import NetworkPage from '_src/ui/app/components/settings-menu/subpages/network/NetworkPage';
import SecurityHomePage from '_src/ui/app/components/settings-menu/subpages/security/SecurityHomePage';
import ViewPrivateKeyPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewPrivateKeyPage';
import ViewSeedPage from '_src/ui/app/components/settings-menu/subpages/security/subpages/ViewSeedPage';

const CLOSE_KEY_CODES: string[] = ['Escape'];

function SettingsRouterPage() {
    const [isHostedWallet, setIsHostedWallet] = useState(false);
    const isOpen = useSettingsIsOpen();
    const settingsIsOpenOnSubPage = useSettingsIsOpenOnSubPage();
    const settingsUrl = useSettingsUrl();
    const settingsHomeUrl = useNextSettingsUrl(true, '/');
    const closeSettingsUrl = useNextSettingsUrl(false);
    const navigate = useNavigate();
    const handleOnCloseMenu = useCallback(() => {
        if (isOpen) {
            navigate(closeSettingsUrl);
        }
    }, [isOpen, navigate, closeSettingsUrl]);
    useOnKeyboardEvent('keydown', CLOSE_KEY_CODES, handleOnCloseMenu, isOpen);
    const expanded = settingsUrl !== '/';

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
        <div className="absolute w-full h-full z-10">
            <div
                // The height class is added to adjust for the height of the nav bar and top padding of the main container.
                // Without it, the backdrop will bleed over the bottom edge in the expanded view.
                className="absolute w-full sm:rounded-[20px] bg-black opacity-20 h-full"
                onClick={handleOnCloseMenu}
            />
            <div
                className={
                    (expanded ? 'h-full' : '') +
                    ' ' +
                    'relative flex flex-col max-h-full overflow-y-auto drop-shadow-ethos-box-shadow sm:rounded-[20px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default'
                }
            >
                {!settingsIsOpenOnSubPage ? (
                    <HeaderWithClose
                        title="Settings"
                        onClickClose={handleOnCloseMenu}
                    />
                ) : (
                    <NavBarWithBackAndWalletPicker backUrl={settingsHomeUrl} />
                )}
                <div className="overflow-scroll no-scrollbar">
                    <Routes location={settingsUrl || ''}>
                        <Route path="/" element={<SettingsHomePage />} />
                        <Route path="/network" element={<NetworkPage />} />
                        <Route path="/theme" element={<ThemePage />} />
                        <Route
                            path="/security"
                            element={
                                <SecurityHomePage
                                    isHostedWallet={isHostedWallet}
                                />
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
                        <Route
                            path="/permissions"
                            element={<PermissionsPage />}
                        />
                        <Route path="/lock" element={<LockPage />} />
                        <Route
                            path="/connected-apps"
                            element={<ConnectedApps />}
                        />
                        <Route
                            path="/preapprovals"
                            element={<Preapprovals />}
                        />
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
        </div>
    );
}

export default SettingsRouterPage;
