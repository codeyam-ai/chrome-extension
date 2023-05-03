import classNames from 'classnames';

import type { ReactNode } from 'react';

interface ActionIconProps {
    className?: string;
    paddingOverride?: string;
    style?: React.CSSProperties;
    children: ReactNode;
}

const ActionIcon: React.FC<ActionIconProps> = ({
    className = '',
    paddingOverride,
    style,
    children,
}) => {
    return (
        <div
            className={classNames(
                'flex items-center h-10 w-10 rounded-full text-white bg-ethos-light-primary-light dark:bg-ethos-dark-primary-light',
                className,
                paddingOverride ? paddingOverride : 'p-3'
            )}
            style={style}
        >
            {children}
        </div>
    );
};

export default ActionIcon;
