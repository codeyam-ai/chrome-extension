import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const HideShowToggle = ({
    hide,
    onToggle,
    forceLightTheme,
}: {
    hide: boolean;
    onToggle: () => void;
    forceLightTheme?: boolean;
}) => {
    return (
        <div
            onClick={onToggle}
            className={`cursor-pointer ${
                hide
                    ? `bg-ethos-light-background-secondary ${
                          forceLightTheme
                              ? ''
                              : 'dark:bg-ethos-dark-background-secondary'
                      }`
                    : `bg-ethos-light-primary-light ${
                          forceLightTheme
                              ? ''
                              : 'dark:bg-ethos-dark-primary-dark'
                      }`
            } w-12 h-6 rounded-full flex items-center ${
                forceLightTheme
                    ? ''
                    : 'dark:border dark:border-ethos-dark-background-light-grey'
            }`}
        >
            <div
                className={`${
                    hide ? 'translate-x-6' : 'translate-x-0'
                } w-6 h-6 rounded-full bg-ethos-light-background-secondary  transform transition-transform flex justify-center items-center ${
                    forceLightTheme
                        ? ''
                        : 'dark:bg-ethos-dark-background-secondary dark:border dark:border-ethos-dark-background-light-grey'
                }`}
            >
                {hide ? (
                    <EyeSlashIcon
                        className={`w-3 h-3 text-ethos-light-text-default ${
                            forceLightTheme
                                ? ''
                                : 'dark:text-ethos-dark-text-default'
                        }`}
                    />
                ) : (
                    <EyeIcon
                        className={`w-3 h-3 text-ethos-light-text-default ${
                            forceLightTheme
                                ? ''
                                : 'dark:text-ethos-dark-text-default'
                        }`}
                    />
                )}
            </div>
        </div>
    );
};

export default HideShowToggle;
