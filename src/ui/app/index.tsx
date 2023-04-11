// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// replaces global fetch with something that works in Node (i.e. tests)
import 'isomorphic-fetch';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import useSizeWindow from './hooks/useSizeWindow';
import { DappSignMessageApprovalPage } from './pages/dapp-sign-message-approval';
import BuyPage from './pages/home/buy';
import TransferNftRecipient from './pages/home/nft-details/transfer-nft-recipient';
import TransferNftReview from './pages/home/nft-details/transfer-nft-review';
import ReceivePage from './pages/home/receive';
import AddressBookNavigation from './pages/home/home/dapp/dapps/AddressBook/AddressBookNavigation';
import CustomizeNavigation from './pages/home/home/dapp/dapps/Customize/CustomizeNavigation';
import TransferCoinAmountPage from './pages/home/transfer-coin-amount';
import TransferCoinRecipientPage from './pages/home/transfer-coin-recipient';
import TransferCoinReviewPage from './pages/home/transfer-coin-review';
import CompletePage from './pages/initialize/complete';
import LoggingInPage from './pages/initialize/hosted/logging-in';
import ImportPage from './pages/initialize/import';
import ConfirmImportPage from './pages/initialize/import/confirm';
import ImportPrivateKeyPage from './pages/initialize/import/key';
import ImportSeedPage from './pages/initialize/import/seed';
import PinPage from './pages/initialize/pin';
import SavePhrasePage from './pages/initialize/save-phrase';
import StylePage from './pages/initialize/style';
import OnboardingThemePage from './pages/initialize/theme';
import VerifyPhrasePage from './pages/initialize/verify-phrase';
import LockedPage from './pages/locked';
import PasswordPage from './pages/password';
import { AppType } from './redux/slices/app/AppType';
import { loadContactsStorage } from './redux/slices/contacts';
import HeartbeatProvider from './shared/HeartbeatProvider';
import { useAppDispatch, useAppSelector } from '_hooks';
import { DappTxApprovalPage } from '_pages/dapp-tx-approval';
import TokensPage from './pages/home/tokens';
import AppContainer, {
    HomePage,
    NFTDetailsPage,
    NftsPage,
    ReceiptPage,
    TicketsPage,
    TicketDetailsPage,
    TicketProjectDetailsPage,
    TransactionDetailsPage,
    TransactionsPage,
} from '_pages/home';
import InitializePage from '_pages/initialize';
import { loadAccountInformationFromStorage } from '_redux/slices/account';
import { ThemeProvider } from '_src/shared/utils/themeContext';
import { DappPreapprovalPage } from '_src/ui/app/pages/dapp-preapproval';
import CreatePasswordPage from '_src/ui/app/pages/initialize/create-password';
import HostedPage from '_src/ui/app/pages/initialize/hosted';
import SiteConnectPage from '_src/ui/app/pages/site-connect';
import WelcomePage from '_src/ui/app/pages/welcome';

const App = () => {
    const dispatch = useAppDispatch();
    useSizeWindow();

    useEffect(() => {
        dispatch(loadAccountInformationFromStorage());
        dispatch(loadContactsStorage());
    }, [dispatch]);

    const isPopup = useAppSelector(
        (state) => state.app.appType === AppType.popup
    );

    useEffect(() => {
        document.body.classList[isPopup ? 'add' : 'remove']('is-popup');
    }, [isPopup]);

    return (
        <ThemeProvider initialTheme={undefined}>
            <HeartbeatProvider>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/home" replace={true} />}
                    />
                    <Route path="/*" element={<AppContainer />}>
                        <Route path="home" element={<HomePage />} />
                        <Route
                            path="home/customize/*"
                            element={<CustomizeNavigation />}
                        />
                        <Route
                            path="home/address-book/*"
                            element={<AddressBookNavigation />}
                        />
                        <Route path="tokens" element={<TokensPage />} />
                        <Route path="nfts">
                            <Route path={'*'} element={<NftsPage />} />
                            <Route
                                path="details"
                                element={<NFTDetailsPage />}
                            />
                            <Route
                                path="transfer/recipient"
                                element={<TransferNftRecipient />}
                            />
                            <Route
                                path="transfer/review"
                                element={<TransferNftReview />}
                            />
                        </Route>
                        <Route path="tickets" element={<TicketsPage />} />
                        <Route path="my_tickets" element={<TicketsPage />} />
                        <Route path="ticket">
                            <Route
                                path="details"
                                element={<TicketDetailsPage />}
                            />
                        </Route>
                        <Route
                            path="ticket-project"
                            element={<TicketProjectDetailsPage />}
                        />
                        <Route path="transactions">
                            <Route path="*" element={<TransactionsPage />} />
                            <Route path="receipt" element={<ReceiptPage />} />
                        </Route>
                        <Route path="send">
                            <Route
                                path="recipient"
                                element={<TransferCoinRecipientPage />}
                            />
                            <Route
                                path="amount"
                                element={<TransferCoinAmountPage />}
                            />
                            <Route
                                path="review"
                                element={<TransferCoinReviewPage />}
                            />
                        </Route>
                        <Route path="receive" element={<ReceivePage />} />
                        <Route path="buy" element={<BuyPage />} />
                        <Route
                            path="tx/:txDigest"
                            element={<TransactionDetailsPage />}
                        />
                    </Route>
                    <Route path="welcome" element={<WelcomePage />} />
                    <Route path="initialize" element={<InitializePage />}>
                        <Route path="hosted">
                            <Route path="" element={<HostedPage />} />
                            <Route
                                path="logging-in"
                                element={<LoggingInPage />}
                            />
                        </Route>
                        <Route path="import">
                            <Route path="" element={<ImportPage />} />
                            <Route
                                path="key"
                                element={<ImportPrivateKeyPage />}
                            />
                            <Route path="seed" element={<ImportSeedPage />} />
                            <Route
                                path="confirm"
                                element={<ConfirmImportPage />}
                            />
                        </Route>
                        <Route
                            path="create-password"
                            element={<CreatePasswordPage />}
                        />
                        <Route
                            path="save-phrase"
                            element={<SavePhrasePage />}
                        />
                        <Route
                            path="verify-phrase"
                            element={<VerifyPhrasePage />}
                        />
                        <Route path="style" element={<StylePage />} />
                        <Route path="theme" element={<OnboardingThemePage />} />
                        <Route path="pin" element={<PinPage />} />
                        <Route path="complete" element={<CompletePage />} />
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
                        element={<Navigate to="/home" replace={true} />}
                    />
                </Routes>
            </HeartbeatProvider>
        </ThemeProvider>
    );
};

export default App;
