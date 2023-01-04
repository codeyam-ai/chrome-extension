import { useCallback } from 'react';

import HeaderWithIcons from './HeaderWithIcons';
import EthosLogo from '_src/ui/app/components/logos/EthosLogo';

import type { SyntheticEvent } from 'react';

interface UserApproveHeaderWithSiteIconProps {
    iconSrc?: string;
    iconAlt?: string;
    title: string;
    description?: string;
}

const UserApproveHeaderWithSiteIcon = ({
    iconSrc,
    iconAlt,
    title,
    description,
}: UserApproveHeaderWithSiteIconProps) => {
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
        <HeaderWithIcons
            firstIcon={
                <img
                    src={iconSrc}
                    className="rounded-full w-full hidden relative"
                    alt={iconAlt}
                    onError={hideIcon}
                    onLoad={showIcon}
                />
            }
            secondIcon={<EthosLogo />}
            title={title}
            description={description}
        />
    );
};

export default UserApproveHeaderWithSiteIcon;
