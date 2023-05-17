import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import BodyLarge from '../../typography/BodyLarge';
import { useNFTBasicData } from '_src/ui/app/hooks';

import type { SuiObjectData } from '@mysten/sui.js';

interface NftGridItemProps {
    nft: SuiObjectData;
    type: 'link' | 'selectable';
    selected?: boolean;
    onSelect?: (id: string) => void;
}

const NftGridItem = ({ nft, type, selected, onSelect }: NftGridItemProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { filePath, nftFields } = useNFTBasicData(nft);
    const drilldownLink = `/nfts/details?${new URLSearchParams({
        objectId: nft.objectId,
    }).toString()}`;

    const emulateFocus = useCallback(
        (event: React.FocusEvent<HTMLDivElement, Element>) => {
            const notManuallyFocused = !event.relatedTarget;
            if (notManuallyFocused) {
                return;
            }
            setIsFocused(true);
        },
        []
    );

    const emulateBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleSelect = useCallback(() => {
        if (onSelect) {
            onSelect(nft.objectId);
        }
    }, [onSelect, nft.objectId]);

    if (nft.content && 'fields' in nft.content) {
        const gridItem = (
            <div
                className={classNames(
                    'relative rounded-2xl overflow-hidden',
                    selected
                        ? 'border-4 border-ethos-light-primary-light dark:border-ethos-dark-primary-dark'
                        : ''
                )}
                onFocus={emulateFocus}
                onBlur={emulateBlur}
            >
                {filePath && (
                    <img
                        data-testid={`${nft.content.fields.name}`}
                        className="object-cover h-36 w-36 shadow-sm rounded-2xl transition-opacity duration-200 ease-in-out"
                        src={filePath}
                        alt={nftFields?.name || 'NFT'}
                    />
                )}
                <div
                    className={classNames(
                        'absolute top-0 left-0 w-full h-full flex items-center justify-center text-center bg-black/50 backdrop-blur-sm transition-all duration-200 ease-in-out opacity-0 hover:opacity-100',
                        isFocused ? 'opacity-100' : ''
                    )}
                >
                    <BodyLarge className="text-white">
                        {nftFields?.name}
                    </BodyLarge>
                </div>
            </div>
        );

        if (type === 'selectable') {
            return <button onClick={handleSelect}>{gridItem}</button>;
        }

        return <Link to={drilldownLink}>{gridItem}</Link>;
    } else {
        return <></>;
    }
};

export default NftGridItem;
