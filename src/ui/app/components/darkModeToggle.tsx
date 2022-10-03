import { memo, useCallback, useContext } from 'react';

import { ThemeContext } from '_src/shared/utils/themeContext';

const sunIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
    </svg>
);

const moonIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
    </svg>
);

const DarkModeToggle = memo(() => {
    const { theme, setTheme } = useContext(ThemeContext);

    const updateTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    return (
        <div className="flex flex-col">
            <label className="inline-flex items-center gap-2 cursor-pointer dark:text-white">
                {sunIcon}
                <span className="relative">
                    <span className="block w-10 h-6 bg-white border-gray-700 dark:bg-gray-400  border-[1px] rounded-full shadow-inner"></span>
                    <span
                        className={`${
                            theme === 'dark'
                                ? 'bg-violet-500 transform translate-x-full border-gray-700 border-[1px]'
                                : 'bg-purple-700 border-gray-400 border-[1px]'
                        } absolute block w-4 h-4 mt-1 ml-1  rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`}
                    >
                        <input
                            onClick={updateTheme}
                            className="absolute opacity-0 w-0 h-0"
                        />
                    </span>
                </span>
                {moonIcon}
            </label>
        </div>
    );
});

// To fix linting error
DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
