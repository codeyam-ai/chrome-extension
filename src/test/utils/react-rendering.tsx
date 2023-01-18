import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { queryClient } from '_app/helpers/queryClient';
import { AppType } from '_redux/slices/app/AppType';
import { WindowContext } from '_src/shared/utils/windowContext';
import { createStore } from '_store';

import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import type { RootState } from '_redux/RootReducer';
import type { AppStore } from '_store';
import type React from 'react';
import type { PropsWithChildren } from 'react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
    initialRoute?: string;
    testWindow?: Window;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = createStore({ app: { appType: AppType.fullscreen } }),
        initialRoute,
        testWindow = new JSDOM().window as unknown as Window,
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
                            <WindowContext.Provider value={testWindow}>
                                {children}
                            </WindowContext.Provider>
                        </QueryClientProvider>
                    </IntlProvider>
                </Provider>
            </MemoryRouter>
        );
    }

    const options = { wrapper: Wrapper, ...renderOptions };
    return { store, ...render(ui, options) };
}
