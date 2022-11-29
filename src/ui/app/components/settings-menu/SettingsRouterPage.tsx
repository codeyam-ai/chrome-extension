// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import HeaderWithClose from '../../shared/headers/section-headers/HeaderWithClose';
import {
    useSettingsIsOpen,
    useSettingsUrl,
    useNextSettingsUrl,
    useSettingsIsOpenOnSubPage,
} from '_components/menu/hooks';
import { useOnKeyboardEvent } from '_hooks';
import ConnectedApps from '_src/ui/app/components/menu/content/connected-apps';
import NetworkPage from '_src/ui/app/components/settings-menu/subpages/network/NetworkPage';
import Preapprovals from '_src/ui/app/components/menu/content/preapprovals';
import ViewSeed from '_src/ui/app/components/menu/content/view-seed';
import SettingsHomePage from '_src/ui/app/components/settings-menu/SettingsHomePage';
import ImportWalletPage from '_src/ui/app/components/settings-menu/subpages/ImportWalletPage';

import PermissionsPage from '_src/ui/app/components/settings-menu/subpages/PermissionsPage';
import SecurityPage from '_src/ui/app/components/settings-menu/subpages/SecurityPage';
import ThemePage from './subpages/ThemePage';
import NavBarWithBackAndWalletPicker from '../../shared/navigation/nav-bar/NavBarWithBackAndWalletPicker';

const CLOSE_KEY_CODES: string[] = ['Escape'];

function SettingsRouterPage() {
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

    if (!isOpen) {
        return null;
    }
    return (
        <div className="absolute w-full h-full z-10">
            <div
                // The height class is added to adjust for the height of the nav bar and top padding of the main container.
                // Without it, the backdrop will bleed over the bottom edge in the expanded veiw.
                className="absolute w-full sm:rounded-[20px] bg-black opacity-20 h-full"
                onClick={handleOnCloseMenu}
            />
            <div
                className={
                    (expanded ? 'h-full' : '') +
                    ' ' +
                    'relative max-h-full overflow-y-auto drop-shadow-ethos-box-shadow sm:rounded-[20px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default'
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
                <Routes location={settingsUrl || ''}>
                    <Route path="/" element={<SettingsHomePage />} />
                    <Route path="/network" element={<NetworkPage />} />
                    <Route path="/theme" element={<ThemePage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/permissions" element={<PermissionsPage />} />
                    <Route path="/settings/view-seed" element={<ViewSeed />} />
                    <Route path="/connected-apps" element={<ConnectedApps />} />
                    <Route path="/preapprovals" element={<Preapprovals />} />
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
