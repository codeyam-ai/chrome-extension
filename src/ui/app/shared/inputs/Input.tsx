import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

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
}

const Input = ({
    label,
    id,
    description,
    errorText,
    isTextAlignRight,
    forceLightTheme,
    className,
    ...reactProps
}: InputProps) => {
    const inputClasses =
        // the addition of focus:py-[15px] focus:px-[19px] is to compensate for the 1px border that gets added on focus, so the element doesn't change sizes
        'flex flex-row w-full py-[16px] px-[20px] focus:py-[15px] focus:px-[19px] resize-none shadow-sm rounded-[16px] bg-ethos-light-background-secondary font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large bg-ethos-light-background-default border border-ethos-light-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:shadow-ethos-light-stroke-focused' +
        ' ' +
        (isTextAlignRight ? 'text-right' : '') +
        ' ' +
        (forceLightTheme
            ? ''
            : 'dark:bg-ethos-dark-background-secondary dark:bg-ethos-dark-background-default dark:border-ethos-dark-text-stroke focus:dark:border-ethos-dark-primary-dark dark:focus:shadow-ethos-dark-stroke-focused');

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
            <input id={id} className={inputClasses} {...reactProps} />
            {description && <Body isTextColorMedium>{description}</Body>}
            {errorText && (
                <span className="text-ethos-light-red dark:text-ethos-dark-red">
                    {errorText}
                </span>
            )}
        </div>
    );
};

export default Input;
