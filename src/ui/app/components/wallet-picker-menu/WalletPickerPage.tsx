// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import NavBarWithCloseAndActionAndWalletPicker from '../../shared/navigation/nav-bar/NavBarWithCloseAndActionAndWalletPicker';
import { useOnKeyboardEvent } from '_hooks';
import {
    useNextWalletPickerUrl,
    useWalletEditorIsOpen,
    useWalletPickerIsOpen,
    useWalletPickerUrl,
} from '_src/ui/app/components/settings-menu/hooks';
import EditWallet from '_src/ui/app/components/wallet-picker/EditWallet';
import WalletPicker from '_src/ui/app/components/wallet-picker/WalletPicker';

import type { MouseEvent } from 'react';

const CLOSE_KEY_CODES: string[] = ['Escape'];

function WalletPickerPage() {
    const [isWalletEditing, setIsWalletEditing] = useState(false);
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const isEditorOpen = useWalletEditorIsOpen();
    const walletPickerUrl = useWalletPickerUrl();
    const walletPickerHomeUrl = useNextWalletPickerUrl(true, '/');
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);
    const navigate = useNavigate();
    const handleOnCloseMenu = useCallback(
        (e: KeyboardEvent | MouseEvent<HTMLDivElement>) => {
            if (isWalletPickerOpen) {
                e.preventDefault();
                setIsWalletEditing(false);
                navigate(closeWalletPickerUrl);
            }
        },
        [isWalletPickerOpen, navigate, closeWalletPickerUrl]
    );
    useOnKeyboardEvent(
        'keydown',
        CLOSE_KEY_CODES,
        handleOnCloseMenu,
        isWalletPickerOpen
    );

    const toggleIsWalletEditing = useCallback(() => {
        setIsWalletEditing(!isWalletEditing);
    }, [isWalletEditing]);

    const onCloseWalletPicker = useCallback(() => {
        setIsWalletEditing(false);
    }, []);

    if (!isWalletPickerOpen) {
        return null;
    }
    return (
        <div className="absolute w-full h-full z-10">
            {/* Backdrop: */}
            <div
                className="absolute top-0 w-full h-full sm:rounded-[20px] bg-black opacity-20 dark:opacity-80"
                onClick={handleOnCloseMenu}
            />

            <div className="relative flex flex-col max-h-full drop-shadow-ethos-box-shadow rounded-b-[20px] sm:rounded-[20px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                {/* Nav bar: */}
                {!isEditorOpen && (
                    <NavBarWithCloseAndActionAndWalletPicker
                        closeUrl={closeWalletPickerUrl}
                        onClickClose={onCloseWalletPicker}
                        actionText={isWalletEditing ? 'Done' : 'Edit'}
                        onClickAction={toggleIsWalletEditing}
                        onClickWalletPicker={onCloseWalletPicker}
                    />
                )}
                {/* Content: */}
                <Routes location={walletPickerUrl || ''}>
                    <Route
                        path="/"
                        element={
                            <WalletPicker isWalletEditing={isWalletEditing} />
                        }
                    />
                    <Route
                        path="/edit"
                        element={
                            <EditWallet
                                setIsWalletEditing={setIsWalletEditing}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate to={walletPickerHomeUrl} replace={true} />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default WalletPickerPage;
