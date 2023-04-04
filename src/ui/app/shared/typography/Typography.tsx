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
    let defaultTextColorClasses = '';
    if (isTextColorMedium) {
        defaultTextColorClasses =
            ' ' +
            `text-ethos-light-text-medium ${
                forceLightMode ? '' : 'dark:text-ethos-dark-text-medium'
            }`;
    }

    return (
        <ComponentType
            className={`${
                className || ''
            } ${defaultTextColorClasses} antialiased`}
        >
            {children}
        </ComponentType>
    );
};
export default Typography;
