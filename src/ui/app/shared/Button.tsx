import { Link } from 'react-router-dom';

import type { MouseEventHandler } from 'react';

export enum ButtonStyle {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    buttonStyle: ButtonStyle;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    to?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    children?: React.ReactNode;
}

const primaryButtonClassNames =
    'w-full inline-flex items-center justify-center w-full px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 disabled:text-gray-500 disabled:bg-gray-100 disabled:hover:bg-gray-100 dark:bg-violet-600 dark:hover:bg-violet-700 dark:disabled:bg-gray-800 dark:disabled:hover:bg-gray-800 dark:disabled:text-gray-500 dark:disabled:border-gray-500 dark:disabled-border-[1px]';
const secondaryButtonClassNames =
    'w-full inline-flex items-center justify-center w-full px-3 py-2 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 disabled:text-gray-500 disabled:bg-gray-100 disabled:hover:bg-gray-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:hover:bg-gray-800 dark:disabled:text-gray-500 dark:disabled:border-gray-500 dark:disabled-border-[1px]';

const Button = (props: ButtonProps) => {
    const { buttonStyle, to, className, children, ...reactProps } = props;
    // Note - in order to override an existing class, prepend the name with "1"
    // ex) !py-2. This will only work if done from the component implementation
    // (not adding the "!") later in this file
    const classes =
        (className ? className : '') +
        ' ' +
        (buttonStyle === ButtonStyle.PRIMARY
            ? primaryButtonClassNames
            : secondaryButtonClassNames);

    const buttonElement = (
        <button className={classes} {...reactProps}>
            {children}
        </button>
    );

    if (to) {
        return <Link to={to}>{buttonElement}</Link>;
    } else {
        return buttonElement;
    }
};

export default Button;
