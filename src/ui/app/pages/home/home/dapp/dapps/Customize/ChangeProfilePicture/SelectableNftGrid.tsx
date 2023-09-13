import NftGridItem from '_src/ui/app/shared/content/rows-and-lists/NftGridItem';

import type { SuiObjectData } from '@mysten/sui.js/client';

interface SelectableNftGridProps {
    nfts: SuiObjectData[];
    selectedNftId?: string;
    onSelect: (id: string, url: string) => void;
}

const SelectableNftGrid = ({
    nfts,
    selectedNftId,
    onSelect,
}: SelectableNftGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 pb-6">
            {(nfts || []).map((nft) => (
                <NftGridItem
                    nft={nft}
                    key={`nft-${nft.objectId}`}
                    type="selectable"
                    selected={selectedNftId === nft.objectId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default SelectableNftGrid;
