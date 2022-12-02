// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import Body from '../../shared/typography/Body';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { useNFTBasicData } from '_hooks';

import type { SuiObject as SuiObjectType } from '@mysten/sui.js';
import truncateString from '../../helpers/truncate-string';

export type NFTsProps = {
    nftobj: SuiObjectType;
    showlabel?: boolean;
    size?: 'small' | 'medium' | 'large';
    expandable?: boolean;
    wideview?: boolean;
};

function NFTDisplayCard({
    nftobj,
    showlabel,
    expandable,
    wideview,
}: NFTsProps) {
    const { filePath, nftObjectID, nftFields, fileExtentionType } =
        useNFTBasicData(nftobj);

    const wideviewSection = (
        <div>
            <Body isSemibold>{nftFields?.name}</Body>
            <Body isTextColorMedium>
                {truncateString(nftFields?.description, 30)}
            </Body>
        </div>
    );

    const defaultSection = (
        <>
            {expandable ? (
                <div className="flex items-center content-center mt-3">
                    <ExplorerLink
                        type={ExplorerLinkType.object}
                        objectID={nftObjectID}
                        showIcon={false}
                        className="text-purple-700 hover:text-purple-800 dark:text-violet-400 dark:hover:text-violet-300"
                    >
                        View On Sui Explorer →
                    </ExplorerLink>
                </div>
            ) : null}
            {showlabel && nftFields?.name ? (
                <div>
                    <Body isSemibold>{nftFields.name}</Body>
                    <Body isTextColorMedium>{nftFields.description}</Body>
                </div>
            ) : null}
        </>
    );

    return (
        <div className={'flex flex-row items-center'}>
            {filePath && (
                <img
                    className={'w-[40px] h-[40px] mr-2'}
                    src={filePath}
                    alt={fileExtentionType?.name || 'NFT'}
                />
            )}
            {wideview ? wideviewSection : defaultSection}
        </div>
    );
}

export default NFTDisplayCard;
