interface CheckboxProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string | React.ReactNode;
    id: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    forceLightMode?: boolean;
}

const Checkbox = ({
    label,
    id,
    onChange,
    checked,
    className,
    forceLightMode = false,
    ...reactProps
}: CheckboxProps) => {
    const inputClassName = `rounded h-5 w-5 cursor-pointer bg-ethos-light-background-default border checked:bg-ethos-light-primary-light checked:text-ethos-light-primary-light border-ethos-light-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:shadow-ethos-light-stroke-focused${
        !forceLightMode
            ? ' dark:bg-ethos-dark-background-default dark:checked:bg-ethos-dark-primary-dark dark:checked:text-ethos-dark-primary-dark dark:border-ethos-dark-text-stroke dark:focus:border-ethos-dark-primary-dark dark:focus:shadow-ethos-dark-stroke-focused'
            : ''
    }`;

    return (
        <div
            className={`${
                className || ''
            } flex items-center text-left mx-6 mb-6`}
        >
            <input
                data-testid={id}
                id={id}
                aria-describedby={`${id}-description`}
                name={id}
                type="checkbox"
                onChange={onChange}
                checked={checked}
                className={inputClassName}
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
