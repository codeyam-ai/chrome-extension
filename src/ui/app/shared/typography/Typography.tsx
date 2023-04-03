import { type ReactNode } from 'react';

export type TypographyProps = {
    as?: React.ElementType;
    isTextColorMedium?: boolean;
    className?: string;
    forceLightMode?: boolean;
    children: ReactNode;
};

const Typography = ({
    as: ComponentType = 'div',
    isTextColorMedium,
    className,
    forceLightMode,
    children,
}: TypographyProps) => {
    let textColorClasses = 'text-black dark:text-white';
    if (isTextColorMedium) {
        textColorClasses =
            ' ' +
            `text-ethos-light-text-medium ${
                forceLightMode ? '' : 'dark:text-ethos-dark-text-medium'
            }`;
    }
    return (
        <ComponentType
            className={`${className || ''} ${textColorClasses} antialiased`}
        >
            {children}
        </ComponentType>
    );
};

export default Typography;
