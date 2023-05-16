import classNames from 'classnames';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useCallback, useRef, useState } from 'react';

export interface InputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label?: string;
    id?: string;
    description?: string;
    errorText?: string;
    isTextAlignRight?: boolean;
    forceLightTheme?: boolean;
    showHideToggle?: boolean;
}

const Input = ({
    label,
    id,
    description,
    errorText,
    isTextAlignRight,
    forceLightTheme,
    className,
    showHideToggle,
    ...reactProps
}: InputProps) => {
    const [passwordMode, setPasswordMode] = useState(showHideToggle);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputClasses =
        // the addition of focus:py-[15px] focus:px-[19px] is to compensate for the 1px border that gets added on focus, so the element doesn't change sizes
        'flex flex-row w-full py-[16px] px-[20px] focus:py-[15px] focus:px-[19px] resize-none shadow-sm rounded-[16px] bg-ethos-light-background-secondary font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large border border-ethos-light-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:shadow-ethos-light-stroke-focused' +
        ' ' +
        (isTextAlignRight ? 'text-right' : '') +
        ' ' +
        (forceLightTheme
            ? ''
            : 'dark:bg-ethos-dark-background-secondary dark:bg-ethos-dark-background-default dark:border-ethos-dark-text-stroke focus:dark:border-ethos-dark-primary-dark dark:focus:shadow-ethos-dark-stroke-focused');

    const togglePasswordMode = useCallback(() => {
        setPasswordMode((prev) => !prev);
        moveCursorToEndOfInput(inputRef.current);
    }, []);

    return (
        <div
            className={`${
                className || ''
            } flex flex-col gap-2 px-6 pb-6 text-left`}
        >
            {label && (
                <label htmlFor={id}>
                    <BodyLarge isSemibold={true}>{label}</BodyLarge>
                </label>
            )}
            <div className="relative">
                <input
                    ref={inputRef}
                    id={id}
                    name={id}
                    className={classNames(
                        inputClasses,
                        showHideToggle ? ' pr-12' : ''
                    )}
                    {...reactProps}
                    type={reactProps.type || passwordMode ? 'password' : 'text'}
                />
                {showHideToggle && (
                    <div
                        className="absolute p-4 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer rounded-r-[16px] hover:bg-black/5 hover:dark:bg-white/10"
                        onClick={togglePasswordMode}
                    >
                        {passwordMode ? (
                            <EyeIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                        ) : (
                            <EyeSlashIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                        )}
                    </div>
                )}
            </div>
            {description && <Body isTextColorMedium>{description}</Body>}
            {errorText && (
                <span className="text-ethos-light-red dark:text-ethos-dark-red">
                    {errorText}
                </span>
            )}
        </div>
    );
};

const moveCursorToEndOfInput = (inputElement: HTMLInputElement | null) => {
    if (inputElement) {
        const length = inputElement.value.length;
        inputElement.focus();
        setTimeout(() => {
            inputElement.setSelectionRange(length, length);
        }, 0);
    }
};

export default Input;
