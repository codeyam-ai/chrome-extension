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
}

const Input = ({
    label,
    id,
    description,
    errorText,
    className,
    ...reactProps
}: InputProps) => {
    const inputClasses =
        // the addition of focus:py-[15px] focus:px-[19px] is to compensate for the 1px border that gets added on focus, so the element doesn't change sizes
        'flex flex-row w-full py-[16px] px-[20px] focus:py-[15px] focus:px-[19px] resize-none shadow-sm rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:dark:border-ethos-dark-primary-dark focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused';
    return (
        <div
            className={`${
                className || ''
            } flex flex-col gap-2 text-left px-6 pb-6`}
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
