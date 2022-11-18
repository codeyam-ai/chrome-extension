// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import {
    useNextWalletPickerUrl,
    useWalletEditorIsOpen,
    useWalletPickerIsOpen,
    useWalletPickerUrl,
} from '_components/menu/hooks';
import { useOnKeyboardEvent } from '_hooks';
import Settings from '_src/ui/app/components/menu/content/settings';

import type { MouseEvent } from 'react';
import WalletPicker from '_src/ui/app/components/wallet-picker/WalletPicker';
import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { LinkType } from '_src/enums/LinkType';
import BodyLarge from '../../typography/BodyLarge';
import EthosLink from '../../typography/EthosLink';
import EditWallet from '_src/ui/app/components/wallet-picker/EditWallet';

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
    const expanded = walletPickerUrl !== '/';

    const toggleIsWalletEditing = useCallback(() => {
        setIsWalletEditing(!isWalletEditing);
    }, [isWalletEditing]);

    const closeWalletPicker = useCallback(() => {
        setIsWalletEditing(false);
        navigate(closeWalletPickerUrl);
    }, [closeWalletPickerUrl]);

    if (!isWalletPickerOpen) {
        return null;
    }
    return (
        <div className="absolute w-full h-full z-10">
            {/* Backdrop: */}
            <div
                className="absolute top-0 w-full h-full sm:rounded-[20px] bg-black opacity-20"
                onClick={handleOnCloseMenu}
            />

            <div className="relative flex flex-col drop-shadow-ethos-box-shadow rounded-[20px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                {/* Nav bar: */}
                {!isEditorOpen && (
                    <div className="flex flex-row items-center justify-between p-6 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
                        <WalletProfile />
                        <div className="flex flex-row gap-4 items-center">
                            <BodyLarge isSemibold>
                                <EthosLink
                                    type={LinkType.None}
                                    onClick={toggleIsWalletEditing}
                                >
                                    {isWalletEditing ? 'Done' : 'Edit'}
                                </EthosLink>
                            </BodyLarge>
                            <button onClick={closeWalletPicker}>
                                <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                            </button>
                        </div>
                    </div>
                )}
                {/* Content: */}
                <div className="relative max-h-full">
                    <Routes location={walletPickerUrl || ''}>
                        <Route
                            path="/"
                            element={
                                <WalletPicker
                                    isWalletEditing={isWalletEditing}
                                />
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
                                <Navigate
                                    to={walletPickerHomeUrl}
                                    replace={true}
                                />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default WalletPickerPage;
