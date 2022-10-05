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

const buttonWrapperClassNames = 'px-6';

const baseButtonClassNames =
    'w-full inline-flex items-center justify-center w-full p-3 mb-6 border border-transparent font-semibold text-sm rounded-lg';

const primaryButtonClassNames =
    baseButtonClassNames +
    ' ' +
    'text-ethos-light-background-light bg-ethos-light-primary disabled:opacity-50';

const secondaryButtonClassNames =
    baseButtonClassNames +
    ' ' +
    'text-ethos-light-primary bg-ethos-light-background-accent dark:text-ethos-dark-text-default dark:bg-ethos-dark-background-accent';

const Button = (props: ButtonProps) => {
    const { buttonStyle, to, className, children, ...reactProps } = props;
    // Note - in order to override an existing class, prepend the name with "!"
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
        return (
            // tabIndex of -1 will make the <Link> element not tabbable, because the button inside it already is
            <div className={buttonWrapperClassNames}>
                <Link to={to} tabIndex={-1}>
                    {buttonElement}
                </Link>
            </div>
        );
    } else {
        return <div className={buttonWrapperClassNames}>{buttonElement}</div>;
    }
};

export default Button;
