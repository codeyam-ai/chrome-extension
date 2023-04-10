import { useCallback } from 'react';

import type { DappData } from './dappData';

interface ListItemProps {
    item: DappData;
    onClick: (dapp: DappData) => void;
}

const DappListItem: React.FC<ListItemProps> = ({ item, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(item);
    }, [onClick, item]);

    return (
        <div
            className="flex flex-col items-center cursor-pointer mx-2"
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
