import classNames from 'classnames';
import { Link } from 'react-router-dom';

import BodyLarge from '../typography/BodyLarge';

import type { MouseEventHandler } from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    // Defaults to primary
    buttonStyle?: 'primary' | 'secondary';
    className?: string;
    wrapperClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    to?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    isInline?: boolean;
    removeContainerPadding?: boolean;
    isDanger?: boolean;
    forceLightTheme?: boolean;
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    const {
        buttonStyle,
        to,
        className,
        wrapperClassName,
        isInline,
        removeContainerPadding,
        isDanger,
        forceLightTheme,
        children,
        ...reactProps
    } = props;
    // Note - in order to override an existing class, prepend the name with "!"
    // ex) !py-2. This will only work if done from the component implementation
    // (not adding the "!") later in this file

    const buttonChildrenClassNames =
        'text-size-ethos-button-text inline-flex items-center justify-center gap-2';

    const baseButtonClassNames =
        'flex items-center place-content-center w-full py-[10px] px-4 min-h-[46px] border border-transparent rounded-[10px] disabled:opacity-50';

    const primaryButtonClassNames = classNames(
        baseButtonClassNames,
        // Create opacity in a roundabout way to fix tooltip stack context bug (where the tooltip looks like it's below the button when the button is disabled)
        reactProps.disabled
            ? 'text-ethos-light-background-default/50 bg-ethos-light-primary-light/50 disabled:!opacity-100'
            : 'text-ethos-light-background-default bg-ethos-light-primary-light'
    );

    const secondaryButtonClassNames = classNames(
        baseButtonClassNames,
        'bg-ethos-light-background-secondary text-ethos-light-primary-light',
        forceLightTheme
            ? ''
            : 'dark:bg-ethos-dark-background-secondary dark:text-ethos-dark-primary-dark'
    );

    const dangerPrimaryButtonClassNames =
        baseButtonClassNames +
        ' ' +
        'bg-ethos-light-red dark:bg-ethos-dark-red text-ethos-light-background-default';

    const dangerSecondaryButtonClassNames =
        baseButtonClassNames +
        ' ' +
        'bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary text-ethos-light-text-default dark:text-ethos-dark-text-default';

    let buttonWrapperClassNames = 'px-6 pb-6';
    if (isInline) {
        buttonWrapperClassNames = 'pb-6';
    }
    if (removeContainerPadding) {
        buttonWrapperClassNames = '';
    }
    buttonWrapperClassNames += ' ' + wrapperClassName;

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
            <BodyLarge
                as="span"
                isSemibold={true}
                className={buttonChildrenClassNames}
            >
                {children}
            </BodyLarge>
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
