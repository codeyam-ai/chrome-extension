import type { ReactNode } from 'react';

const ActionIcon = ({
    className = '',
    style,
    children,
}: {
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
}) => {
    return (
        <div
            className={`${className} flex items-center h-10 w-10 rounded-full p-3 text-white bg-ethos-light-primary-light dark:bg-ethos-dark-primary-light`}
            style={style}
        >
            {children}
        </div>
    );
};

export default ActionIcon;
