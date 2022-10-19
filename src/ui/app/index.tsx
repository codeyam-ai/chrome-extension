// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import useSizeWindow from './hooks/useSizeWindow';
import { DappSignMessageApprovalPage } from './pages/dapp-sign-message-approval';
import BuyPage from './pages/home/buy';
import ReceivePage from './pages/home/receive';
import PasswordPage from './pages/password';
import { AppType } from './redux/slices/app/AppType';
import { useAppDispatch, useAppSelector } from '_hooks';
import { DappTxApprovalPage } from '_pages/dapp-tx-approval';
import HomePage, {
    NftsPage,
    TokensPage,
    TransactionDetailsPage,
    TransactionsPage,
    TransferCoinPage,
    NFTDetailsPage,
    ReceiptPage,
} from '_pages/home';
import InitializePage from '_pages/initialize';
import { loadAccountInformationFromStorage } from '_redux/slices/account';
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
