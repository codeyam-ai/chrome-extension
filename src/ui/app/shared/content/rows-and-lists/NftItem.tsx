import { Link } from 'react-router-dom';

import { useNFTBasicData } from '_src/ui/app/hooks';

import type { SuiObject } from '@mysten/sui.js';

interface NftItemProps {
    nft: SuiObject;
}

const NftItem = ({ nft }: NftItemProps) => {
    const { filePath, fileExtentionType } = useNFTBasicData(nft);
    const drilldownLink = `/nft-details?${new URLSearchParams({
        objectId: nft.reference.objectId,
    }).toString()}`;

    return (
        <Link to={drilldownLink}>
            {filePath && (
                <img
                    className="h-36 w-36 shadow-sm rounded-2xl"
                    src={filePath}
                    alt={fileExtentionType?.name || 'NFT'}
                />
            )}
        </Link>
    );
};

export default NftItem;
