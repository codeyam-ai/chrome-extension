// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import {
    Navigate,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

import {
    useNextWalletPickerUrl,
    useWalletEditorIsOpen,
    useWalletPickerIsOpen,
} from '_src/ui/app/components/settings-menu/hooks';
import EditWallet from '_src/ui/app/components/wallet-picker/EditWallet';
import WalletPicker from '_src/ui/app/components/wallet-picker/WalletPicker';

interface WalletPickerPageProps {
    isWalletEditing: boolean;
    setIsWalletEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function WalletPickerPage({
    isWalletEditing,
    setIsWalletEditing,
}: WalletPickerPageProps) {
    const isWalletEditorIsOpen = useWalletEditorIsOpen();
    const isWalletPickerOpen = useWalletPickerIsOpen();
    const walletPickerHomeUrl = useNextWalletPickerUrl(true, 'open');
    const { pathname } = useLocation();
    const isSettingsOpen = pathname.includes('settings');
    const [params] = useSearchParams();

    const navigate = useNavigate();
    const handleOnCloseMenu = useCallback(() => {
        setIsWalletEditing(false);
        if (isWalletEditorIsOpen) {
            navigate(-2);
            return;
        } else if (!isSettingsOpen) {
            navigate(pathname);
        } else {
            navigate(-1);
        }
    }, [
        navigate,
        setIsWalletEditing,
        pathname,
        isSettingsOpen,
        isWalletEditorIsOpen,
    ]);

    if (!isWalletPickerOpen) {
        return null;
    }

    const walletState = params.get('wallet-picker');
    let walletView;

    if (walletState === 'open') {
        walletView = <WalletPicker isWalletEditing={isWalletEditing} />;
    } else if (walletState === 'edit') {
        walletView = <EditWallet setIsWalletEditing={setIsWalletEditing} />;
    } else {
        walletView = <Navigate to={walletPickerHomeUrl} replace={true} />;
    }

    return (
        <div className="absolute w-full h-full z-20">
            <div
                className="absolute top-0 w-full h-[550px] sm:rounded-2xl bg-black opacity-20 dark:opacity-80"
                onClick={handleOnCloseMenu}
            />
            <div className="relative flex flex-col max-h-full drop-shadow-ethos-box-shadow rounded-b-[20px]  bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                {walletView}
            </div>
        </div>
    );
}

export default WalletPickerPage;
