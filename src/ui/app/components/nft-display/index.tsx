// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import truncateString from '../../helpers/truncate-string';
import Body from '../../shared/typography/Body';
import { useNFTBasicData } from '_hooks';

import type { SuiObjectData } from '@mysten/sui.js/client';

export type NFTsProps = {
    nftobj: SuiObjectData;
    showlabel?: boolean;
    wideview?: boolean;
};

function NFTDisplayCard({ nftobj, showlabel, wideview }: NFTsProps) {
    const { filePath, nftFields, fileExtentionType } = useNFTBasicData(nftobj);

    const defaultSection = (
        <>
            {showlabel && nftFields?.name ? (
                <div>
                    <Body isSemibold>{nftFields?.name?.toString()}</Body>
                    <Body isTextColorMedium>
                        {nftFields?.description?.toString()}
                    </Body>
                </div>
            ) : null}
        </>
    );

    const wideviewSection = (
        <div>
            <Body isSemibold>{nftFields?.name?.toString()}</Body>
            <Body isTextColorMedium>
                {truncateString(nftFields?.description?.toString() ?? '', 30)}
            </Body>
        </div>
    );

    return (
        <div className={'flex flex-row items-center'}>
            {filePath && (
                <img
                    className={'object-cover w-[40px] h-[40px] mr-2 rounded-sm'}
                    src={filePath}
                    alt={fileExtentionType?.name || 'NFT'}
                />
            )}
            {wideview ? wideviewSection : defaultSection}
        </div>
    );
}

export default NFTDisplayCard;
