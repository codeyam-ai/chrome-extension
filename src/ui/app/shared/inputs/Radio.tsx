interface RadioProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string | React.ReactNode;
    id: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
}

const Radio = ({
    label,
    id,
    onChange,
    checked,
    className,
    ...reactProps
}: RadioProps) => {
    const inputClassNames = [
        'rounded-full',
        'cursor-pointer',

        'bg-none',
        'checked:bg-none',

        'checked:bg-ethos-light-primary-light',
        'dark:checked:bg-ethos-dark-primary-dark',

        'checked:focus:bg-ethos-light-primary-light',

        'focus:ring-0',
        'focus:border-2',
        'focus:border-ethos-light-primary-light',
        'focus:shadow-ethos-light-stroke-focused',
    ];

    return (
        <div className={`${className || ''} flex items-center text-left`}>
            <input
                data-testid={id}
                id={id}
                aria-describedby={`${id}-description`}
                name={id}
                type="radio"
                onChange={onChange}
                checked={checked}
                className={inputClassNames.join(' ')}
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

export default Radio;
