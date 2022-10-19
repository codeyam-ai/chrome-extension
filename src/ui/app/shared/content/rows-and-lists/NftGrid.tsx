import { hasPublicTransfer } from '@mysten/sui.js';

import NftGridItem from './NftGridItem';

import type { SuiObject } from '@mysten/sui.js';

interface NftGridProps {
    nfts: SuiObject[];
}

const NftGrid = ({ nfts }: NftGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-6 px-6 pb-6">
            {nfts
                .filter((nft) => hasPublicTransfer(nft))
                .map((nft, key) => (
                    <div key={key}>
                        <NftGridItem nft={nft} />
                    </div>
                ))}
        </div>
    );
};

export default NftGrid;
