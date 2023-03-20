import { Link } from 'react-router-dom';

import { useNFTBasicData } from '_src/ui/app/hooks';

import type { SuiObjectData } from '@mysten/sui.js';

interface NftGridItemProps {
    nft: SuiObjectData;
}

const NftGridItem = ({ nft }: NftGridItemProps) => {
    const { filePath, fileExtentionType } = useNFTBasicData(nft);
    const drilldownLink = `/nfts/details?${new URLSearchParams({
        objectId: nft.objectId,
    }).toString()}`;

    if (nft.content && 'fields' in nft.content) {
        return (
            <Link to={drilldownLink}>
                {filePath && (
                    <img
                        data-testid={`${nft.content.fields.name}`}
                        className="object-cover h-36 w-36 shadow-sm rounded-2xl"
                        src={filePath}
                        alt={fileExtentionType?.name || 'NFT'}
                    />
                )}
            </Link>
        );
    } else {
        return <></>;
    }
};

export default NftGridItem;
