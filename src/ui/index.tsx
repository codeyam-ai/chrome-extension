// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type Root, createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app';
import { SuiLedgerClientProvider } from './app/components/ledger/SuiLedgerClientProvider';
import Loading from './app/components/loading';
import { queryConfig } from '_app/helpers/queryConfig';
import { initAppType, initNetworkFromStorage } from '_redux/slices/app';
import { getFromLocationSearch } from '_redux/slices/app/AppType';
import { DependenciesContext } from '_shared/utils/dependenciesContext';
import { ThemeProvider } from '_src/shared/utils/themeContext';
import store from '_store';
import { thunkExtras } from '_store/thunk-extras';

import type {
    Dependencies,
    Heartbeat,
} from '_shared/utils/dependenciesContext';

import './styles/global.scss';
import './styles/tailwind.css';
import './styles/toastify.css';
import '_font-icons/output/sui-icons.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';
import 'react-loading-skeleton/dist/skeleton.css';

function isDevMode() {
    return process.env.NODE_ENV === 'development';
}

async function init(queryClient: QueryClient) {
    if (isDevMode()) {
        Object.defineProperty(window, 'store', { value: store });
    }
    store.dispatch(initAppType(getFromLocationSearch(window.location.search)));
    await store.dispatch(initNetworkFromStorage(queryClient)).unwrap();
    await thunkExtras.background.init(store.dispatch);
}

function makeHeartbeat() {
    let heartbeatCallback: () => void;
    const heartbeat: Heartbeat = {
        onBeat: (callback: () => void) => {
            heartbeatCallback = callback;
        },
    };
    setInterval(() => {
        if (heartbeatCallback) {
            heartbeatCallback();
        }
    }, 5000);
    return heartbeat;
}

function renderTemp() {
    const rootDom = document.getElementById('root');
    if (!rootDom) {
        throw new Error('Root element not found');
    }
    const root = createRoot(rootDom);
    root.render(
        <ThemeProvider initialTheme={undefined}>
            <Loading
                loading={true}
                big
                className="w-[360px] h-[420px] flex justify-center items-center"
            >
                Loading
            </Loading>
        </ThemeProvider>
    );
    return root;
}

function renderApp(root: Root, queryClient: QueryClient) {
    const rootDom = document.getElementById('root');
    if (!rootDom) {
        throw new Error('Root element not found');
    }

    const appDependencies: Dependencies = {
        closeWindow: () => {
            window.close();
        },
        heartbeat: makeHeartbeat(),
        featureFlags: {
            showUsd: true,
            showWipFeatures: isDevMode(),
        },
    };

    root.render(
        <DependenciesContext.Provider value={appDependencies}>
            <SuiLedgerClientProvider>
                <HashRouter>
                    <Provider store={store}>
                        <IntlProvider locale={navigator.language}>
                            <QueryClientProvider client={queryClient}>
                                <App />
                            </QueryClientProvider>
                        </IntlProvider>
                    </Provider>
                </HashRouter>
            </SuiLedgerClientProvider>
        </DependenciesContext.Provider>
    );
}

(async () => {
    const root = renderTemp();
    const queryClient = new QueryClient(queryConfig);
    await init(queryClient);
    renderApp(root, queryClient);
})();
