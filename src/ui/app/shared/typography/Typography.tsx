import { type ReactNode } from 'react';

export type TypographyProps = {
    as?: React.ElementType;
    isTextColorMedium?: boolean;
    className?: string;
    children: ReactNode;
};

const Typography = ({
    as: ComponentType = 'div',
    isTextColorMedium,
    className,
    children,
}: TypographyProps) => {
    let textColorClasses = '';
    if (isTextColorMedium) {
        textColorClasses =
            ' ' +
            'text-ethos-light-text-medium dark:text-ethos-dark-text-medium';
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
