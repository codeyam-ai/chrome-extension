import { useCallback } from 'react';

import type { DappData } from '_src/types/DappData';
import classNames from 'classnames';

interface ListItemProps {
    item: DappData;
    onClick?: (dapp: DappData) => void;
    cursorDefault?: boolean;
}

const DappListItem: React.FC<ListItemProps> = ({
    item,
    onClick,
    cursorDefault,
}) => {
    const handleClick = useCallback(() => {
        onClick && onClick(item);
    }, [onClick, item]);

    return (
        <div
            className={classNames(
                'flex flex-col items-center mx-2',
                cursorDefault ? '' : 'cursor-pointer'
            )}
            onClick={handleClick}
        >
            <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                />
            </div>
            <p
                className="mt-1 text-center text-xs w-20 text-clip overflow-hidden"
                title={item.name}
            >
                {item.name}
            </p>
        </div>
    );
};

export default DappListItem;
