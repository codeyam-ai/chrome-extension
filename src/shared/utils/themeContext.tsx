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

export function useTheme(initialTheme?: ThemeName) {
    const [theme, setTheme] = useState<ThemeName>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
        'light'
    );

    const updateResolvedTheme = useCallback((currentTheme: ThemeName) => {
        if (currentTheme === 'dark') {
            setResolvedTheme('dark');
        } else if (currentTheme === 'light') {
            setResolvedTheme('light');
        } else {
            const isDark = document.documentElement.classList.contains('dark');
            setResolvedTheme(isDark ? 'dark' : 'light');
        }
    }, []);

    const externalSetTheme = useCallback(
        (theme: ThemeName) => {
            setTheme(theme);
            rawSetTheme(theme);
            getTheme().then((newTheme) => {
                updateResolvedTheme(newTheme);
            });
        },
        [updateResolvedTheme]
    );

    if (initialTheme) {
        rawSetTheme(initialTheme);
    }

    useEffect(() => {
        getTheme().then((theme) => {
            setTheme(theme);
            updateResolvedTheme(theme);
        });
    }, [updateResolvedTheme]);

    useEffect(() => {
        rawSetTheme(theme);
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                getTheme().then((newTheme) => {
                    updateResolvedTheme(newTheme);
                });
            });
        return function cleanup() {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', (e) => {
                    getTheme();
                });
        };
    }, [theme, updateResolvedTheme]);

    return { theme, setTheme: externalSetTheme, resolvedTheme };
}

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
