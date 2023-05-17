import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useCallback, useState } from 'react';

// Define the types for your props
interface SimpleToggleProps {
    onSwitchOn: () => void;
    onSwitchOff: () => void;
    value: boolean;
    ariaLabelOn: string;
    ariaLabelOff: string;
}

const SimpleToggle: React.FC<SimpleToggleProps> = ({
    onSwitchOn,
    onSwitchOff,
    value,
    ariaLabelOn,
    ariaLabelOff,
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
                    ? 'bg-ethos-light-primary-light dark:bg-ethos-dark-primary-dark'
                    : 'bg-ethos-light-medium-gray dark:bg-ethos-dark-medium-gray',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ethos-light-primary-light dark:focus:ring-ethos-dark-primary-dark focus:ring-offset-2'
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
