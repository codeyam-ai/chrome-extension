import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { queryClient } from '_app/helpers/queryClient';
import { AppType } from '_redux/slices/app/AppType';
import { DependenciesContext } from '_shared/utils/dependenciesContext';
import { createStore } from '_store';

import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import type { RootState } from '_redux/RootReducer';
import type { Dependencies } from '_shared/utils/dependenciesContext';
import type { AppStore } from '_store';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import App from "_app/index";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
    initialRoute?: string;
    dependencies?: Dependencies;
}

export function renderApp(
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = createStore({app: {appType: AppType.fullscreen}}),
        initialRoute,
        dependencies = {
            closeWindow: jest.fn(),
        },
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
        return (
            <MemoryRouter
                initialEntries={initialRoute ? [initialRoute] : undefined}
            >
                <Provider store={store}>
                    <IntlProvider locale={'pt'}>
                        <QueryClientProvider client={queryClient}>
                            <DependenciesContext.Provider value={dependencies}>
                                {children}
                            </DependenciesContext.Provider>
                        </QueryClientProvider>
                    </IntlProvider>
                </Provider>
            </MemoryRouter>
        );
    }

    const options = { wrapper: Wrapper, ...renderOptions };
    return { store, ...render(<App/>, options) };
}
