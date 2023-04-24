import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { DappWrapper } from './DappWrapper';
import { useAppSelector } from '_src/ui/app/hooks';

import type { DappData } from '_src/types/DappData';
import { useFavoriteDapps } from '_src/ui/app/hooks/useFavoriteDapps';

interface DappViewProps {
    dapp: DappData | null;
    onClose: () => void;
}

const DappView: React.FC<DappViewProps> = ({ dapp, onClose }) => {
    const { favoriteDapps } = useFavoriteDapps();
    const address = useAppSelector(({ account: { address } }) => address);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const isFavorite = useMemo(() => {
        return favoriteDapps.some((fav) => fav.name === dapp?.name);
    }, [dapp?.name, favoriteDapps]);

    const closeDapp = useCallback(() => {
        onClose();
    }, [onClose]);

    const extensionMessageListener = useCallback(
        (event: MessageEvent) => {
            if (event.data.type === 'IFRAME_READY' && dapp?.url) {
                const targetOrigin = new URL(dapp?.url).origin;

                iframeRef.current?.contentWindow?.postMessage(
                    address,
                    targetOrigin
                );
            }
        },
        [dapp, address]
    );

    useEffect(() => {
        window.addEventListener('message', extensionMessageListener);

        return () => {
            window.removeEventListener('message', extensionMessageListener);
        };
    }, [dapp, extensionMessageListener]);

    return (
        <div
            className={classNames(
                'absolute h-[471px] flex flex-col w-full overflow-y-auto z-10 transition-transform duration-300 ease-in-out transform origin-top bg-ethos-light-background-default dark:bg-ethos-dark-background-default',
                dapp ? 'scale-y-100' : 'scale-y-0'
            )}
        >
            {dapp?.url ? (
                <DappWrapper
                    dappTitle={dapp.name}
                    isFavorite={isFavorite}
                    closeDapp={closeDapp}
                >
                    <iframe
                        ref={iframeRef}
                        src={dapp?.url ?? 'about:blank'}
                        title="Content"
                        height={400}
                    />
                </DappWrapper>
            ) : dapp?.component ? (
                <dapp.component />
            ) : (
                <></>
            )}
        </div>
    );
};

export default DappView;
