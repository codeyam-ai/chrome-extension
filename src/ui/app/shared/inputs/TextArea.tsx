interface TextAreaProps
    extends React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {
    label: string;
    id: string;
}

const TextArea = ({ label, id, className, ...reactProps }: TextAreaProps) => {
    // focus:p-[11px] is to compensate for the larger border, so the element doesn't change sizes
    const textAreaClasses =
        'flex flex-row items-start w-full p-3 mt-2 resize-none shadow-sm rounded-lg font-weight-ethos-body text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary focus:dark:border-ethos-dark-primary focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused focus:p-[11px]';
    const test = (
        <div className="outline-none border-2 p3 shadow-ethos-stroke-focused bg-compensate-for-2px-border"></div>
    );
    return (
        <div className={`${className || ''} text-left mx-6 mb-6`}>
            <label htmlFor={id}>{label}</label>
            <textarea id={id} className={textAreaClasses} {...reactProps} />
        </div>
    );
};

export default TextArea;
