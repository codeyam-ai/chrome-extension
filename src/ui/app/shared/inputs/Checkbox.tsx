interface CheckboxProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string | React.ReactNode;
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
                className="rounded h-5 w-5 cursor-pointer bg-ethos-light-background-default dark:bg-ethos-dark-background-default border checked:bg-ethos-light-primary-light dark:checked:bg-ethos-dark-primary-dark checked:text-ethos-light-primary-light dark:checked:text-ethos-dark-primary-dark border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:dark:border-ethos-dark-primary-dark focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused"
                {...reactProps}
            />
            <label
                htmlFor={id}
                className="ml-2 cursor-pointer font-weight-ethos-body text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body"
                id={`${id}-description`}
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
