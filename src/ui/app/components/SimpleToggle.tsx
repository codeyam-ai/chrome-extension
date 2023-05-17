import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useCallback } from 'react';

interface SimpleToggleProps {
    onSwitchOn: () => void;
    onSwitchOff: () => void;
    value: boolean;
    ariaLabelOn: string;
    ariaLabelOff: string;
    forceLightTheme?: boolean;
}

const SimpleToggle: React.FC<SimpleToggleProps> = ({
    onSwitchOn,
    onSwitchOff,
    value,
    ariaLabelOn,
    ariaLabelOff,
    forceLightTheme,
}) => {
    const handleSwitch = useCallback(
        (checked: boolean) => {
            checked ? onSwitchOn() : onSwitchOff();
        },
        [onSwitchOff, onSwitchOn]
    );

    return (
        <Switch
            checked={value}
            onChange={handleSwitch}
            className={classNames(
                value
                    ? classNames(
                          'bg-ethos-light-primary-light',
                          forceLightTheme
                              ? ''
                              : 'dark:bg-ethos-dark-primary-dark'
                      )
                    : classNames(
                          'bg-ethos-light-medium-gray',
                          forceLightTheme
                              ? ''
                              : 'dark:bg-ethos-dark-medium-gray'
                      ),
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ethos-light-primary-light focus:ring-offset-2',
                forceLightTheme ? '' : 'dark:focus:ring-ethos-dark-primary-dark'
            )}
        >
            <span className="sr-only">
                {value ? ariaLabelOn : ariaLabelOff}
            </span>
            <span
                aria-hidden="true"
                className={classNames(
                    value ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    );
};

export default SimpleToggle;
