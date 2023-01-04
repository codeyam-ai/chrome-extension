import { useCallback } from 'react';

import HeaderWithIcons from './HeaderWithIcons';
import EthosLogo from '_src/ui/app/components/logos/EthosLogo';

import type { SyntheticEvent } from 'react';

interface UserApproveHeaderWithSiteIconProps {
    iconSrc?: string;
    iconAlt?: string;
    isConnectingToEthosDashboard?: boolean;
    title: string;
    description?: string;
}

const UserApproveHeaderWithSiteIcon = ({
    iconSrc,
    iconAlt,
    isConnectingToEthosDashboard,
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
                isConnectingToEthosDashboard ? (
                    <EthosLogo />
                ) : (
                    <img
                        src={iconSrc}
                        className="rounded-full hidden"
                        alt={iconAlt}
                        onError={hideIcon}
                        onLoad={showIcon}
                    />
                )
            }
            secondIcon={isConnectingToEthosDashboard ? null : <EthosLogo />}
            title={title}
            description={description}
        />
    );
};

export default UserApproveHeaderWithSiteIcon;
