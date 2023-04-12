import { createContext, useState, useEffect, useCallback } from 'react';

import { removeLocal, setLocal, getLocal } from '../storagex/store';

import type { ReactNode } from 'react';

type ThemeName = 'system' | 'light' | 'dark';
type ThemeContextType = {
    theme: ThemeName;
    setTheme: (name: ThemeName) => void;
};

async function getTheme(): Promise<ThemeName> {
    let localTheme = await getLocal('theme');
    if (!localTheme) {
        localTheme = localStorage.theme;
        if (localTheme) {
            setLocal({ theme: localTheme.toString() });
        }
    }

    if (localTheme === 'dark') {
        // user has manually selected dark mode
        document.documentElement.classList.add('dark');
        return 'dark';
    } else if (localTheme === 'light') {
        // user has manually selected light mode
        document.documentElement.classList.remove('dark');
        return 'light';
    } else {
        // user has not manually selected dark or light
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // user's system is in dark mode
            document.documentElement.classList.add('dark');
        } else {
            // user's system is in light mode or does not exist
            document.documentElement.classList.remove('dark');
        }
        return 'system';
    }
}

function rawSetTheme(theme: ThemeName) {
    if (theme === 'dark') {
        localStorage.theme = 'dark';
        setLocal({ theme: 'dark' });
    } else if (theme === 'light') {
        localStorage.theme = 'light';
        setLocal({ theme: 'light' });
    } else {
        localStorage.removeItem('theme');
        removeLocal('theme');
    }
}

export const ThemeContext = createContext<ThemeContextType>(
    {} as ThemeContextType
);

export const ThemeProvider = ({
    initialTheme,
    children,
}: {
    initialTheme: ThemeName | undefined;
    children: ReactNode;
}) => {
    const [theme, setTheme] = useState<ThemeName>('system');

    const externalSetTheme = useCallback((theme: ThemeName) => {
        setTheme(theme);
        rawSetTheme(theme);
        getTheme();
    }, []);

    if (initialTheme) {
        rawSetTheme(initialTheme);
    }

    useEffect(() => {
        getTheme().then((theme) => {
            setTheme(theme);
        });
    }, []);

    useEffect(() => {
        rawSetTheme(theme);
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                getTheme();
            });
        return function cleanup() {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', (e) => {
                    getTheme();
                });
        };
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme: externalSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
