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
    let defaultTextColorClasses = `text-black ${
        forceLightMode ? '' : 'dark:text-white'
    }`;
    if (isTextColorMedium) {
        defaultTextColorClasses =
            ' ' +
            `text-ethos-light-text-medium ${
                forceLightMode ? '' : 'dark:text-ethos-dark-text-medium'
            }`;
    }

    // Prioritize the text color specified in the className prop
    const textColorClasses = className?.includes('text-')
        ? ''
        : defaultTextColorClasses;

    return (
        <ComponentType
            className={`${className || ''} ${textColorClasses} antialiased`}
        >
            {children}
        </ComponentType>
    );
};
export default Typography;
