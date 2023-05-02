import { type ReactNode } from 'react';

import BodyLarge from '../../typography/BodyLarge';
import Title from '../../typography/Title';

interface HeaderWithIconRowProps {
    firstIcon: ReactNode;
    secondIcon?: ReactNode;
    title?: string;
    description?: string;
}

const HeaderWithIcons = ({
    firstIcon,
    secondIcon,
    title,
    description,
}: HeaderWithIconRowProps) => {
    return (
        <div className="flex flex-col py-3 px-6 gap-3 items-center text-center">
            {secondIcon ? (
                <div className="flex -ml-2">
                    <span className="z-10 border-ethos-light-background-default dark:border-ethos-dark-background-default rounded-full">
                        {firstIcon}
                    </span>
                    <span className="-ml-2">{secondIcon}</span>
                </div>
            ) : (
                <span>{firstIcon}</span>
            )}

            {title && (
                <Title
                    as="h1"
                    className="text-ethos-light-text-default dark:text-ethos-dark-text-default"
                >
                    {title}
                </Title>
            )}
            {description && (
                <BodyLarge isTextColorMedium>{description}</BodyLarge>
            )}
        </div>
    );
};

export default HeaderWithIcons;
