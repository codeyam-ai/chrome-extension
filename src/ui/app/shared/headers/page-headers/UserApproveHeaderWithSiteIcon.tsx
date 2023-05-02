import { useCallback } from 'react';

import HeaderWithIcons from './HeaderWithIcons';
import EthosLogo from '_src/ui/app/components/logos/EthosLogo';

import type { SyntheticEvent } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface UserApproveHeaderWithSiteIconProps {
    iconSrc?: string;
    iconAlt?: string;
    isConnectingToEthosDashboard?: boolean;
    title?: string;
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
                    <EthosLogo className="h-10 w-10" />
                ) : iconSrc ? (
                    <img
                        src={iconSrc}
                        className="w-10 aspect-square rounded-full hidden relative"
                        alt={iconAlt}
                        onError={hideIcon}
                        onLoad={showIcon}
                    />
                ) : (
                    <div className="rounded-full p-2 h-10 w-10 border-[0.5px] border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                        <GlobeAltIcon className="h-full w-full text-ethos-light-text-default dark:text-ethos-dark-text-default" />
                    </div>
                )
            }
            secondIcon={
                isConnectingToEthosDashboard ? null : (
                    <div className="rounded-full p-1 h-10 w-10 border-[0.5px] border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                        <EthosLogo className="h-full w-full" />
                    </div>
                )
            }
            title={title}
            description={description}
        />
    );
};

export default UserApproveHeaderWithSiteIcon;
