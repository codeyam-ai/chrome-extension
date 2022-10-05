import { type ReactNode } from 'react';
import { TextColor } from '_src/enums/TypographyEnums';

export type TypographyProps = {
    as?: React.ElementType;
    textColor?: TextColor;
    className?: string;
    children: ReactNode;
};

const Typography = ({
    as: ComponentType = 'div',
    textColor = TextColor.Default,
    className,
    children,
}: TypographyProps) => {
    let textColorClasses = '';
    if (textColor === TextColor.Medium) {
        textColorClasses =
            ' ' +
            'text-ethos-light-text-medium dark:text-ethos-dark-text-medium';
    }
    return (
        <ComponentType className={className + textColorClasses}>
            {children}
        </ComponentType>
    );
};

export default Typography;
