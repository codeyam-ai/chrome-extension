import classNames from 'classnames';
import { useCallback } from 'react';

import type { DappData } from '_src/types/DappData';
import useDappUrl from '_src/ui/app/hooks/useDappUrl';
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
    dapp: DappData;
    cursorDefault?: boolean;
}

const DappListItem: React.FC<ListItemProps> = ({ dapp, cursorDefault }) => {
    const dappUrl = useDappUrl(dapp.urls);
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        if (!dappUrl) {
            return;
        }
        if (dapp.isLocal) {
            navigate(dappUrl);
        } else {
            window.open(dappUrl, '_blank');
        }
    }, [dapp.isLocal, dappUrl, navigate]);

    return (
        <div
            className={classNames(
                'flex flex-col items-center mx-2',
                cursorDefault ? '' : 'cursor-pointer'
            )}
            onClick={onClick}
        >
            <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                    src={dapp.image}
                    alt={dapp.title}
                    className="object-cover w-full h-full"
                />
            </div>
            <p
                className="mt-1 text-center text-xs w-20 text-clip overflow-hidden"
                title={dapp.title}
            >
                {dapp.title}
            </p>
        </div>
    );
};

export default DappListItem;
