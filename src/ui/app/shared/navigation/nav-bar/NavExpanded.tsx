// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import {
    useMenuIsOpen,
    useMenuUrl,
    useNextMenuUrl,
} from '_components/menu/hooks';
import { useOnKeyboardEvent } from '_hooks';

import type { MouseEvent } from 'react';

import ConnectedApps from '_src/ui/app/components/menu/content/connected-apps';
import MenuList from '_src/ui/app/components/menu/content/menu-list';
import Network from '_src/ui/app/components/menu/content/network';
import Playground from '_src/ui/app/components/menu/content/playground';
import Preapprovals from '_src/ui/app/components/menu/content/preapprovals';
import Settings from '_src/ui/app/components/menu/content/settings';
import SwitchWallet from '_src/ui/app/components/menu/content/switch-wallet';
import ViewSeed from '_src/ui/app/components/menu/content/view-seed';

const CLOSE_KEY_CODES: string[] = ['Escape'];

function NavExpanded() {
    const isOpen = useMenuIsOpen();
    const menuUrl = useMenuUrl();
    const menuHomeUrl = useNextMenuUrl(true, '/');
    const closeMenuUrl = useNextMenuUrl(false);
    const navigate = useNavigate();
    const handleOnCloseMenu = useCallback(
        (e: KeyboardEvent | MouseEvent<HTMLDivElement>) => {
            if (isOpen) {
                e.preventDefault();
                navigate(closeMenuUrl);
            }
        },
        [isOpen, navigate, closeMenuUrl]
    );
    useOnKeyboardEvent('keydown', CLOSE_KEY_CODES, handleOnCloseMenu, isOpen);
    const expanded = menuUrl !== '/';

    if (!isOpen) {
        return null;
    }
    return (
        <div className="absolute w-full h-full z-10">
            <div
                className="absolute w-full h-full bg-white opacity-20"
                onClick={handleOnCloseMenu}
            />
            <div
                className={
                    (expanded ? 'h-full' : '') +
                    ' ' +
                    'relative px-6 pb-6 max-h-full overflow-y-auto shadow-ethos-box-shadow rounded-b-lg border-solid border-[1px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default dark:border-gray-500'
                }
            >
                <Routes location={menuUrl || ''}>
                    <Route path="/" element={<MenuList />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/view-seed" element={<ViewSeed />} />
                    <Route path="/switch-wallet" element={<SwitchWallet />} />
                    <Route path="/connected-apps" element={<ConnectedApps />} />
                    <Route path="/preapprovals" element={<Preapprovals />} />
                    <Route path="/playground" element={<Playground />} />
                    <Route path="/network" element={<Network />} />
                    <Route
                        path="*"
                        element={<Navigate to={menuHomeUrl} replace={true} />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default NavExpanded;
