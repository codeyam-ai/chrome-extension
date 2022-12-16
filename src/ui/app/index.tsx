// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Browser from 'webextension-polyfill';

import useSizeWindow from './hooks/useSizeWindow';
import { DappSignMessageApprovalPage } from './pages/dapp-sign-message-approval';
import BuyPage from './pages/home/buy';
import ReceivePage from './pages/home/receive';
import LockedPage from './pages/locked';
import PasswordPage from './pages/password';
import { AppType } from './redux/slices/app/AppType';
import { useAppDispatch, useAppSelector } from '_hooks';
import { DappTxApprovalPage } from '_pages/dapp-tx-approval';
import HomePage, {
    NFTDetailsPage,
    NftsPage,
    ReceiptPage,
    TokensPage,
    TransactionDetailsPage,
    TransactionsPage,
    TransferCoinPage,
} from '_pages/home';
import InitializePage from '_pages/initialize';
import {
    loadAccountInformationFromStorage,
    logout,
} from '_redux/slices/account';
import { setNavVisibility } from '_redux/slices/app';
import { ThemeProvider } from '_src/shared/utils/themeContext';
import { DappPreapprovalPage } from '_src/ui/app/pages/dapp-preapproval';
import BackupPage from '_src/ui/app/pages/initialize/backup';
import HostedPage from '_src/ui/app/pages/initialize/hosted';
import ImportPage from '_src/ui/app/pages/initialize/import';
import SiteConnectPage from '_src/ui/app/pages/site-connect';
import WelcomePage from '_src/ui/app/pages/welcome';

const HIDDEN_MENU_PATHS = ['/nft-details', '/receipt'];

const App = () => {
    const dispatch = useAppDispatch();
    useSizeWindow();

    const lockWallet = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch]);

    const lockWalletIfTimeIsExpired = useCallback(async () => {
        const { lockWalletOnTimestamp } = await Browser.storage.local.get(
            'lockWalletOnTimestamp'
        );
        if (lockWalletOnTimestamp > 0 && lockWalletOnTimestamp < Date.now()) {
            await lockWallet();
            Browser.storage.local.set({
                lockWalletOnTimestamp: -1,
            });
        }
    }, [lockWallet]);

    useEffect(() => {
        dispatch(loadAccountInformationFromStorage());
    }, [dispatch]);

    const isPopup = useAppSelector(
        (state) => state.app.appType === AppType.popup
    );

    useEffect(() => {
        document.body.classList[isPopup ? 'add' : 'remove']('is-popup');
    }, [isPopup]);
    const location = useLocation();

    useEffect(() => {
        const menuVisible = !HIDDEN_MENU_PATHS.includes(location.pathname);
        dispatch(setNavVisibility(menuVisible));
    }, [location, dispatch]);

    useEffect(() => {
        const lockTimeoutInMs = 15 * 60000;
        setInterval(async () => {
            // Check if should log out every 5 seconds
            await lockWalletIfTimeIsExpired();
        }, 5000);
        const onFocus = () => {
            Browser.storage.local.set({
                lockWalletOnTimestamp: -1,
            });
        };
        const onBlur = () => {
            Browser.storage.local.set({
                lockWalletOnTimestamp: Date.now() + lockTimeoutInMs,
            });
        };
        lockWalletIfTimeIsExpired().then(() => onFocus());
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);

        return function cleanup() {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, [lockWalletIfTimeIsExpired]);

    return (
        <ThemeProvider initialTheme={undefined}>
            <Routes>
                <Route path="/*" element={<HomePage />}>
                    <Route
                        index
                        element={<Navigate to="/tokens" replace={true} />}
                    />
                    <Route path="tokens" element={<TokensPage />} />
                    <Route path="nfts" element={<NftsPage />} />
                    <Route path="nft-details" element={<NFTDetailsPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route path="send" element={<TransferCoinPage />} />
                    <Route path="receive" element={<ReceivePage />} />
                    <Route path="buy" element={<BuyPage />} />
                    <Route
                        path="tx/:txDigest"
                        element={<TransactionDetailsPage />}
                    />
                    <Route path="receipt" element={<ReceiptPage />} />
                </Route>
                <Route path="welcome" element={<WelcomePage />} />
                <Route path="/initialize" element={<InitializePage />}>
                    <Route path="hosted" element={<HostedPage />} />
                    <Route path="import" element={<ImportPage />} />
                    <Route path="backup" element={<BackupPage />} />
                </Route>
                <Route path="password" element={<PasswordPage />} />
                <Route path="locked" element={<LockedPage />} />
                <Route path="locked/*" element={<LockedPage />} />
                <Route
                    path="/connect/:requestID"
                    element={<SiteConnectPage />}
                />
                <Route
                    path="/tx-approval/:txID"
                    element={<DappTxApprovalPage />}
                />
                <Route
                    path="/sign-message-approval/:signMessageRequestID"
                    element={<DappSignMessageApprovalPage />}
                />
                <Route
                    path="/preapproval/:preapprovalRequestID"
                    element={<DappPreapprovalPage />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/tokens" replace={true} />}
                />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
