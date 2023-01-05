import { type ReactNode } from 'react';

import BodyLarge from '../../typography/BodyLarge';
import Title from '../../typography/Title';

interface HeaderWithIconRowProps {
    firstIcon: ReactNode;
    secondIcon?: ReactNode;
    title: string;
    description?: string;
}

const HeaderWithIcons = ({
    firstIcon,
    secondIcon,
    title,
    description,
}: HeaderWithIconRowProps) => {
    return (
        <div className="flex flex-col py-8 px-6 gap-3 place-content-center place-items-center text-center">
            {secondIcon ? (
                <div className="flex ml-2">
                    <span className="h-14 w-14 z-10 border-ethos-light-background-default dark:border-ethos-dark-background-default rounded-full">
                        {firstIcon}
                    </span>
                    <span className="h-14 w-14 -ml-2">{secondIcon}</span>
                </div>
            ) : (
                <span className="h-14 w-14">{firstIcon}</span>
            )}

            <Title as="h1">{title}</Title>
            <BodyLarge isTextColorMedium>{description}</BodyLarge>
        </div>
    );
};

export default HeaderWithIcons;
