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
                        'absolute -top-[8px] -right-[4px] p-1 rounded-full bg-ethos-light-background-default dark:bg-ethos-dark-background-default transition ease-in-out duration-200',
                        showArrowOnHover && !isLocal && isHovered
                            ? 'opacity-100'
                            : 'opacity-0'
                    )}
                >
                    <ArrowUpRightIcon className="w-4 h-4 text-ethos-light-primary-light dark:bg-ethos-dark-primary-dark" />
                </div>
            </div>
            <div className="relative mt-1 w-[60px] overflow-hidden">
                <p className="text-center text-xs text-clip" title={dapp.title}>
                    {dapp.title}
                </p>
                <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-r from-transparent via-transparent to-ethos-light-gray dark:to-ethos-dark-background-secondary" />
            </div>
        </div>
    );
};

export default DappListItem;
