interface CheckboxProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    id: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
}

const Checkbox = ({
    label,
    id,
    onChange,
    checked,
    className,
    ...reactProps
}: CheckboxProps) => {
    return (
        <div
            className={`${
                className || ''
            } flex items-center text-left mx-6 mb-6`}
        >
            <input
                id={id}
                aria-describedby={`${id}-description`}
                name={id}
                type="checkbox"
                onChange={onChange}
                checked={checked}
                className="rounded h-5 w-5 bg-ethos-light-background-default dark:bg-ethos-dark-background-default border checked:bg-ethos-light-primary dark:checked:bg-ethos-dark-primary border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary focus:dark:border-ethos-dark-primary focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused"
                {...reactProps}
            />
            <label
                htmlFor={id}
                className="ml-2 font-weight-ethos-body text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body"
                id={`${id}-description`}
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
