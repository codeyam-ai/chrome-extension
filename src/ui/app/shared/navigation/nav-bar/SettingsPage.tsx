// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import HeaderWithClose from '../../headers/section-headers/HeaderWithClose';
import {
    useMenuIsOpen,
    useMenuUrl,
    useNextMenuUrl,
} from '_components/menu/hooks';
import { useOnKeyboardEvent } from '_hooks';
import ConnectedApps from '_src/ui/app/components/menu/content/connected-apps';
import Network from '_src/ui/app/components/menu/content/network';
import Preapprovals from '_src/ui/app/components/menu/content/preapprovals';
import ViewSeed from '_src/ui/app/components/menu/content/view-seed';
import SettingsListPage from '_src/ui/app/components/settings/main-menu-page/SettingsListPage';
import ImportWallet from '_src/ui/app/components/settings/subpages/ImportWallet';

import PermissionsPage from '_src/ui/app/components/settings/subpages/PermissionsPage';
import Security from '_src/ui/app/components/settings/subpages/Security';

const CLOSE_KEY_CODES: string[] = ['Escape'];

function SettingsPage() {
    const isOpen = useMenuIsOpen();
    const menuUrl = useMenuUrl();
    const menuHomeUrl = useNextMenuUrl(true, '/');
    const closeMenuUrl = useNextMenuUrl(false);
    const navigate = useNavigate();
    const handleOnCloseMenu = useCallback(() => {
        if (isOpen) {
            navigate(closeMenuUrl);
        }
    }, [isOpen, navigate, closeMenuUrl]);
    useOnKeyboardEvent('keydown', CLOSE_KEY_CODES, handleOnCloseMenu, isOpen);
    const expanded = menuUrl !== '/';

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
                <HeaderWithClose
                    title="Settings"
                    onClickClose={handleOnCloseMenu}
                />
                <Routes location={menuUrl || ''}>
                    <Route path="/" element={<SettingsListPage />} />
                    <Route path="/settings/view-seed" element={<ViewSeed />} />
                    <Route path="/connected-apps" element={<ConnectedApps />} />
                    <Route path="/preapprovals" element={<Preapprovals />} />
                    <Route path="/network" element={<Network />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/permissions" element={<PermissionsPage />} />
                    <Route path="/import-wallet" element={<ImportWallet />} />
                    <Route
                        path="*"
                        element={<Navigate to={menuHomeUrl} replace={true} />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default SettingsPage;
