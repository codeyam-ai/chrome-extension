import NftGridItem from './NftGridItem';

import type { SuiObjectData } from '@mysten/sui.js';

interface NftGridProps {
    nfts: SuiObjectData[];
    edit?: boolean;
}

const NftGrid = ({ nfts, edit }: NftGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 px-6 pb-6">
            {(nfts || []).map((nft) => (
                <NftGridItem
                    nft={nft}
                    key={`nft-${nft.objectId}`}
                    type="link"
                    edit={edit}
                />
            ))}
        </div>
    );
};

export default NftGrid;
