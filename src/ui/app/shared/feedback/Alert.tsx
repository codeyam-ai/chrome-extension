import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { ReactNode } from 'react';

interface AlertProps {
    title: string;
    subtitle?: string | ReactNode;
    borderRadius?: number;
    forceLightMode?: boolean;
}

export const Alert = ({
    title,
    subtitle,
    borderRadius,
    forceLightMode,
}: AlertProps) => {
    return (
        <div
            className={`flex flex-row gap-2 py-4 px-4 bg-ethos-light-background-secondary ${
                forceLightMode ? '' : 'dark:bg-ethos-dark-background-secondary'
            }`}
            style={{ borderRadius: borderRadius ? borderRadius : 8 }}
        >
            <span>
                <ExclamationTriangleIcon
                    className={`h-6 w-6 text-ethos-light-primary-light ${
                        forceLightMode
                            ? ''
                            : 'dark:text-ethos-dark-primary-dark'
                    }`}
                />
            </span>
            <span className="flex flex-col gap-1 text-left">
                <BodyLarge
                    isSemibold
                    className={`text-ethos-light-primary-light ${
                        forceLightMode
                            ? ''
                            : 'dark:text-ethos-dark-primary-dark'
                    }`}
                >
                    {title}
                </BodyLarge>
                {subtitle && typeof subtitle === 'string' ? (
                    <Body>{subtitle}</Body>
                ) : (
                    subtitle
                )}
            </span>
        </div>
    );
};

export default Alert;
