export interface TextAreaProps
    extends React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {
    label: string;
    id: string;
    errorText?: string;
}

const TextArea = ({
    label,
    id,
    errorText,
    className,
    ...reactProps
}: TextAreaProps) => {
    // focus:p-[11px] is to compensate for the larger border, so the element doesn't change sizes
    const textAreaClasses =
        'flex flex-row items-start w-full p-3 resize-none shadow-sm rounded-lg font-weight-ethos-body text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:dark:border-ethos-dark-primary-dark focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused focus:p-[11px]';
    return (
        <div
            className={`${
                className || ''
            } flex flex-col gap-2 text-left mx-6 mb-6`}
        >
            <label htmlFor={id}>{label}</label>
            <textarea id={id} className={textAreaClasses} {...reactProps} />
            {errorText && (
                <span className="text-ethos-light-red dark:text-ethos-dark-red">
                    {errorText}
                </span>
            )}
        </div>
    );
};

export default TextArea;
