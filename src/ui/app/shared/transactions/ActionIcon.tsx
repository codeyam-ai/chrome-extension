import classNames from 'classnames';

import type { ReactNode } from 'react';

interface ActionIconProps {
    className?: string;
    paddingOverride?: string;
    isSui?: boolean;
    style?: React.CSSProperties;
    children: ReactNode;
}

const ActionIcon: React.FC<ActionIconProps> = ({
    className = '',
    paddingOverride,
    isSui,
    style,
    children,
}) => {
    return (
        <div
            className={classNames(
                'flex items-center h-10 w-10 rounded-full text-white',
                className,
                isSui
                    ? ''
                    : 'bg-ethos-light-primary-light dark:bg-ethos-dark-primary-light',
                paddingOverride ? paddingOverride : 'p-3'
            )}
            style={style}
        >
            {children}
        </div>
    );
};

export default ActionIcon;
