import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import {
    useAppDispatch,
    useAppSelector,
    useNFTBasicData,
} from '_src/ui/app/hooks';
import {
    addInvalidPackage,
    removeInvalidPackage,
} from '_src/ui/app/redux/slices/valid';

import type { SuiObjectData } from '@mysten/sui.js/client';

interface NftGridItemProps {
    nft: SuiObjectData;
    type: 'link' | 'selectable';
    edit?: boolean;
    selected?: boolean;
    onSelect?: (id: string, url: string) => void;
}

const NftGridItem = ({
    nft,
    type,
    edit,
    selected,
    onSelect,
}: NftGridItemProps) => {
    const dispatch = useAppDispatch();
    const { invalidPackages } = useAppSelector(({ valid }) => valid);
    const [isFocused, setIsFocused] = useState(false);
    const { filePath, nftFields } = useNFTBasicData(nft);
    const drilldownLink = `/nfts/details?${new URLSearchParams({
        objectId: nft.objectId,
    }).toString()}`;

    const hidden = useMemo(
        () => invalidPackages.includes(nft.type?.split('::')[0] ?? ''),
        [invalidPackages, nft]
    );

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
            onSelect(nft.objectId, filePath || '');
        }
    }, [onSelect, nft.objectId, filePath]);

    const toggleDisplay = useCallback(async () => {
        if (!nft?.type) return;

        const packageId = nft.type.split('::')[0];
        if (hidden) {
            await dispatch(removeInvalidPackage(packageId));
        } else {
            await dispatch(addInvalidPackage(packageId));
        }
    }, [dispatch, hidden, nft]);

    if (hidden && !edit) return <></>;

    if (nft.content && 'fields' in nft.content) {
        const gridItem = (
            <div
                className={`${
                    edit
                        ? 'bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-lg'
                        : ''
                }`}
            >
                <div
                    className={classNames(
                        'relative rounded-2xl overflow-hidden',
                        selected
                            ? // negative Y-padding to offset the extra border width
                              'border-4 -my-[4px] border-ethos-light-primary-light dark:border-ethos-dark-primary-dark'
                            : '',
                        hidden ? 'opacity-20' : ''
                    )}
                    onFocus={emulateFocus}
                    onBlur={emulateBlur}
                >
                    {filePath && (
                        <img
                            data-testid={`${
                                'name' in nft.content.fields
                                    ? nft.content.fields.name
                                    : ''
                            }`}
                            className="object-cover h-36 w-36 shadow-sm rounded-2xl transition-opacity duration-200 ease-in-out"
                            src={filePath}
                            alt={nftFields?.name?.toString() || 'NFT'}
                        />
                    )}
                    <div
                        className={classNames(
                            'absolute top-0 left-0 w-full h-full flex items-center justify-center text-center bg-black/50 backdrop-blur-sm transition-all duration-200 ease-in-out opacity-0 hover:opacity-100',
                            isFocused ? 'opacity-100' : ''
                        )}
                    >
                        <BodyLarge className="text-white">
                            {nftFields?.name?.toString()}
                        </BodyLarge>
                    </div>
                </div>
                {edit && (
                    <div
                        className="p-3 cursor-pointer flex gap-1 items-center justify-center"
                        onClick={toggleDisplay}
                    >
                        <Body>{hidden ? 'Hidden' : 'Displayed'}:</Body>
                        <Body className="underline text-ethos-light-primary-light dark:text-ethos-dark-primary-dark">
                            {hidden ? 'Show' : 'Hide'}
                        </Body>
                    </div>
                )}
            </div>
        );

        if (edit) return gridItem;

        if (type === 'selectable') {
            return <button onClick={handleSelect}>{gridItem}</button>;
        }

        return <Link to={drilldownLink}>{gridItem}</Link>;
    } else {
        return <></>;
    }
};

export default NftGridItem;
