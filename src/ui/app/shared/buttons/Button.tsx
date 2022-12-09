import { Link } from 'react-router-dom';

import Body from '../typography/Body';

import type { MouseEventHandler } from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    // Defaults to primary
    buttonStyle?: 'primary' | 'secondary';
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    to?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    isInline?: boolean;
    isDanger?: boolean;
    children?: React.ReactNode;
}

const buttonChildrenClassNames =
    'inline-flex items-center justify-center gap-2';

const baseButtonClassNames =
    'w-full py-4 px-5 mb-6 border border-transparent rounded-[16px] disabled:opacity-50';

const primaryButtonClassNames =
    baseButtonClassNames +
    ' ' +
    'text-ethos-light-background-default bg-ethos-light-primary-light';

const secondaryButtonClassNames =
    baseButtonClassNames +
    ' ' +
    'bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary text-ethos-light-primary-light dark:text-ethos-dark-primary-dark';

const dangerPrimaryButtonClassNames =
    baseButtonClassNames +
    ' ' +
    'bg-ethos-light-red dark:bg-ethos-dark-red text-ethos-light-background-default';

const dangerSecondaryButtonClassNames =
    baseButtonClassNames +
    ' ' +
    'bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary text-ethos-light-text-default dark:ethos-dark-text-default';

const Button = (props: ButtonProps) => {
    const {
        buttonStyle,
        to,
        className,
        isInline,
        isDanger,
        children,
        ...reactProps
    } = props;
    // Note - in order to override an existing class, prepend the name with "!"
    // ex) !py-2. This will only work if done from the component implementation
    // (not adding the "!") later in this file

    const buttonWrapperClassNames = isInline ? '' : 'px-6';

    let classes = className ? className + ' ' : '';
    if (buttonStyle === 'secondary' && isDanger) {
        classes += dangerSecondaryButtonClassNames;
    } else if (buttonStyle === 'secondary' && !isDanger) {
        classes += secondaryButtonClassNames;
    } else if (buttonStyle === 'primary' && isDanger) {
        classes += dangerPrimaryButtonClassNames;
    } else {
        classes += primaryButtonClassNames;
    }

    const buttonElement = (
        <button className={classes} {...reactProps}>
            <Body
                as="span"
                isSemibold={true}
                className={buttonChildrenClassNames}
            >
                {children}
            </Body>
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
