import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDappUrl from '_src/ui/app/hooks/useDappUrl';

import type { DappData } from '_src/types/DappData';

interface ListItemProps {
    dapp: DappData;
    isCursorDefault?: boolean;
    dragMode?: boolean;
    showArrowOnHover?: boolean;
    dragged?: boolean;
}

const DappListItem: React.FC<ListItemProps> = ({
    dapp,
    isCursorDefault,
    dragMode,
    showArrowOnHover,
    dragged,
}) => {
    const { dappUrl, isLocal } = useDappUrl(dapp.urls);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // Add isHovered state

    const onClick = useCallback(() => {
        if (!dappUrl || dragMode || dragged) {
            return;
        }
        if (isLocal) {
            navigate(dappUrl);
        } else {
            window.open(dappUrl, '_blank');
        }
    }, [dappUrl, dragMode, isLocal, navigate, dragged]);

    const setIsHoveredTrue = useCallback(() => {
        setIsHovered(true);
    }, []);

    const setIsHoveredFalse = useCallback(() => {
        setIsHovered(false);
    }, []);

    const cancelNativeImgDrag = useCallback(
        (e: React.DragEvent<HTMLImageElement>) => {
            e.preventDefault();
        },
        []
    );

    return (
        <div
            className={classNames(
                'flex flex-col items-center relative',
                isCursorDefault ? '' : 'cursor-pointer'
            )}
            onMouseUp={onClick}
            onMouseEnter={setIsHoveredTrue}
            onMouseLeave={setIsHoveredFalse}
        >
            <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                    src={dapp.image}
                    alt={dapp.title}
                    className="object-cover w-full h-full"
                    onDragStart={cancelNativeImgDrag}
                />
                <div
                    className={classNames(
                        'absolute -top-[8px] -right-[6px] p-1 rounded-full bg-ethos-light-background-default dark:bg-ethos-dark-background-default transition ease-in-out duration-200',
                        showArrowOnHover && !isLocal && isHovered
                            ? 'opacity-100'
                            : 'opacity-0'
                    )}
                >
                    <ArrowUpRightIcon className="w-4 h-4 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                </div>
            </div>
            <p
                className="mt-1 text-center text-xs w-[66px] text-clip overflow-hidden"
                title={dapp.title}
                style={{
                    WebkitMaskImage:
                        'linear-gradient(to left, transparent, black 25%)',
                }}
            >
                {dapp.title}
            </p>
        </div>
    );
};

export default DappListItem;
