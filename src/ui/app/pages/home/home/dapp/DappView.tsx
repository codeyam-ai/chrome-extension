import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { DappWrapper } from './DappWrapper';
import { useAppSelector } from '_src/ui/app/hooks';
import useDappUrl from '_src/ui/app/hooks/useDappUrl';
import { useFavoriteDapps } from '_src/ui/app/hooks/useFavoriteDapps';

import type { DappData } from '_src/types/DappData';

interface DappViewProps {
    dapp: DappData | null;
    onClose: () => void;
}

const DappView: React.FC<DappViewProps> = ({ dapp, onClose }) => {
    const { isLocal } = useDappUrl(dapp?.urls);
    const { allFavorites } = useFavoriteDapps();
    const address = useAppSelector(({ account: { address } }) => address);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const isFavorite = useMemo(() => {
        return (allFavorites ?? []).some((fav) => fav.id === dapp?.id);
    }, [dapp?.id, allFavorites]);

    const closeDapp = useCallback(() => {
        onClose();
    }, [onClose]);

    const extensionMessageListener = useCallback(
        (event: MessageEvent) => {
            if (event.data.type === 'IFRAME_READY' && dapp?.urls[0]) {
                const targetOrigin = new URL(dapp?.urls[0]).origin;

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
                'absolute h-[494px] flex flex-col w-full overflow-y-auto z-10 transition-transform duration-300 ease-in-out transform origin-top bg-ethos-light-background-default dark:bg-ethos-dark-background-default',
                dapp ? 'scale-y-100' : 'scale-y-0'
            )}
        >
            {isLocal ? (
                <div>SHOW DAPP COMPONENT</div>
            ) : (
                <DappWrapper
                    dappTitle={dapp?.title ?? ''}
                    isFavorite={isFavorite}
                    closeDapp={closeDapp}
                >
                    <iframe
                        ref={iframeRef}
                        src={dapp?.urls[0] ?? 'about:blank'}
                        title="Content"
                        height={400}
                    />
                </DappWrapper>
            )}
        </div>
    );
};

export default DappView;
