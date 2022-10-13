import Body from '../typography/Body';

export interface InputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    id: string;
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
    // focus:py-[7px] focus:px-[11px] is to compensate for the larger border, so the element doesn't change sizes
    const inputClasses =
        'flex flex-row items-start w-full py-2 px-3 resize-none shadow-sm rounded-lg font-weight-ethos-body text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:dark:border-ethos-dark-primary-dark focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused focus:py-[7px] focus:px-[11px]';
    return (
        <div
            className={`${
                className || ''
            } flex flex-col gap-2 text-left px-6 pb-6`}
        >
            <label htmlFor={id}>
                <Body isSemibold={true}>{label}</Body>
            </label>
            <input id={id} className={inputClasses} {...reactProps} />
            {description && (
                <span className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium">
                    {description}
                </span>
            )}
            {errorText && (
                <span className="text-ethos-light-red dark:text-ethos-dark-red">
                    {errorText}
                </span>
            )}
        </div>
    );
};

export default Input;
