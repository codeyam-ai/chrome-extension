import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { memo, useCallback, useContext } from 'react';

import { ThemeContext } from '_src/shared/utils/themeContext';

const DarkModeToggle = memo(() => {
    const { theme, setTheme } = useContext(ThemeContext);

    const updateTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    const iconClasses =
        'h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium';

    return (
        <div className="flex flex-col">
            <label className="inline-flex items-center gap-2 cursor-pointer dark:text-white">
                <SunIcon className={iconClasses} />
                <span className="relative">
                    <span className="block w-10 h-6 bg-ethos-light-text-stroke dark:bg-ethos-dark-primary-light rounded-full"></span>
                    <span
                        className={`${
                            theme === 'dark' ? 'transform translate-x-full' : ''
                        } absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow-sm inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-white`}
                    >
                        <input
                            onClick={updateTheme}
                            className="absolute opacity-0 w-0 h-0"
                        />
                    </span>
                </span>
                <MoonIcon className={iconClasses} />
            </label>
        </div>
    );
});

// To fix linting error
DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
