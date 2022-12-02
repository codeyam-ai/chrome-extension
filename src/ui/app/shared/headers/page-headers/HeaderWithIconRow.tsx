import { useCallback } from 'react';

import Subheader from '../../typography/Subheader';
import Title from '../../typography/Title';
import EthosLogo from '_src/ui/app/components/EthosLogo';

import type { SyntheticEvent } from 'react';

interface HeaderWithIconRowProps {
    iconSrc?: string;
    iconAlt?: string;
    title: string;
    description?: string;
}

/**
 * This component encompasses the following design components:
 * Header with icon and description, Header with icon row and description.
 * If you don't want the icon row, don't pass in an iconSrc or iconAlt.
 */
const HeaderWithIconRow = ({
    iconSrc,
    iconAlt,
    title,
    description,
}: HeaderWithIconRowProps) => {
    const hasIcon = iconSrc && iconSrc.length;

    const showIcon = useCallback(
        (e: SyntheticEvent<HTMLImageElement, Event>) => {
            const img = e.target as HTMLImageElement;
            img.classList.remove('hidden');
        },
        []
    );

    const hideIcon = useCallback(
        (e: SyntheticEvent<HTMLImageElement, Event>) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
        },
        []
    );

    return (
        <div className="flex flex-col py-8 px-6 gap-3 place-content-center place-items-center text-center">
            <div className="flex ml-2">
                {hasIcon && (
                    <img
                        src={iconSrc}
                        className="z-10 h-14 border-ethos-light-background-default dark:border-ethos-dark-background-default border-[4px] rounded-full hidden"
                        alt={iconAlt}
                        onError={hideIcon}
                        onLoad={showIcon}
                    />
                )}
                <div
                    className={
                        hasIcon ? 'h-14 w-14 -ml-2' : 'h-[104px] w-[104px]'
                    }
                >
                    <EthosLogo />
                </div>
            </div>
            <Title as="h1">{title}</Title>
            <Subheader isTextColorMedium>{description}</Subheader>
        </div>
    );
};

export default HeaderWithIconRow;
