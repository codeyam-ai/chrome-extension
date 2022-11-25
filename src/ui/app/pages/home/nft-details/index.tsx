// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    getObjectId,
    hasPublicTransfer,
    JsonRpcProvider,
} from '@mysten/sui.js';
import { useMemo, useState, useCallback } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import TransferNFTCard from './transfer-nft';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import Loading from '_components/loading';
import { useAppSelector, useNFTBasicData } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import LinkListWithIcon from '_src/ui/app/shared/content/rows-and-lists/LinkListWithIcon';
import NFTTransactionRows from '_src/ui/app/shared/content/rows-and-lists/NFTTransactionRows';
import { BlurredImage } from '_src/ui/app/shared/images/BlurredBgImage';
import PageScrollView from '_src/ui/app/shared/layouts/PageScrollView';
import CircleElipsis from '_src/ui/app/shared/svg/CircleElipsis';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';
import Typography from '_src/ui/app/shared/typography/Typography';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import type { SuiObject } from '@mysten/sui.js';
import type { ButtonHTMLAttributes } from 'react';

function NFTdetailsContent({
    nft,
    onClick,
}: {
    nft: SuiObject;
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
    const { filePath, nftObjectID, nftFields, fileExtentionType } =
        useNFTBasicData(nft);

    /*

    Could not get the example working for getEventsByTransaction
    Error: Said method was not avaialable => possibly a devnet issue?

    const provider = new JsonRpcProvider();
    const txEvents = await provider.getEventsByTransaction(
        '6mn5W1CczLwitHCO9OIUbqirNrQ0cuKdyxaNe16SAME='
    );

    console.log('not working => ', txEvents);
    
    */

    return (
        <>
            <div>
                <PageScrollView>
                    <div className="text-center w-full p-6">
                        <BlurredImage
                            imgSrc={filePath || ''}
                            fileExt={fileExtentionType?.name || 'NFT'}
                        />
                        <div className="mb-4 py-6">
                            <div
                                className={
                                    'flex flex-row justify-between mb-2 items-center'
                                }
                            >
                                <Title>{nftFields?.name}</Title>
                                <div>
                                    <CircleElipsis />
                                </div>
                            </div>
                            <Typography
                                className={
                                    'text-left text-ethos-light-text-medium font-weight-normal mb-6 text-size-ethos-subheader leading-line-height-ethos-subheader'
                                }
                            >
                                SuiGod Collection
                            </Typography>
                            <ExplorerLink
                                type={ExplorerLinkType.object}
                                objectID={nftObjectID}
                                className={'w-full'}
                            >
                                <Button
                                    isInline
                                    buttonStyle="primary"
                                    className={
                                        'text-ethos-dark-text-default w-full mb-6'
                                    }
                                >
                                    View NFT
                                </Button>
                            </ExplorerLink>

                            {hasPublicTransfer(nft) && (
                                <Button
                                    isInline
                                    buttonStyle="primary"
                                    className="-mt-[15px]"
                                    onClick={onClick}
                                >
                                    Send
                                </Button>
                            )}
                            <div className={'w-full text-left'}>
                                <BodyLarge isSemibold className={'mb-3'}>
                                    Activity
                                </BodyLarge>
                                <NFTTransactionRows />
                                <BodyLarge isSemibold className={'mb-3'}>
                                    Creator
                                </BodyLarge>
                                <KeyValueList
                                    keyNamesAndValues={[
                                        {
                                            keyName: 'Wallet Address',
                                            value: '0xb8dc...ac1c',
                                        },
                                        {
                                            keyName: 'Royalty',
                                            value: '2.5%',
                                        },
                                    ]}
                                />
                                <BodyLarge isSemibold className={'mb-3'}>
                                    Details
                                </BodyLarge>
                                <KeyValueList
                                    keyNamesAndValues={[
                                        {
                                            keyName: 'Contract Address',
                                            value: '0xb8dc...ac1c',
                                        },
                                        {
                                            keyName: 'Object ID',
                                            value: '#1750',
                                        },
                                    ]}
                                />
                            </div>
                            <div
                                className={
                                    'border-t-1 border-t-solid border-ethos-light-text-medium pt-8'
                                }
                            >
                                <div
                                    className={'flex flex-row justify-between'}
                                >
                                    <BodyLarge>
                                        <ExplorerLink
                                            type={ExplorerLinkType.transaction}
                                            transactionID={
                                                nft.previousTransaction
                                            }
                                            title="View on Sui Explorer"
                                            showIcon={true}
                                        >
                                            View on Sui Explorer
                                        </ExplorerLink>
                                    </BodyLarge>
                                    <div
                                        className={
                                            'text-ethos-light-text-medium'
                                        }
                                    >
                                        <ArrowUpRightIcon
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                </div>
                                {/*
                                
                                Add these buttons in when fully integrated with Keepsake and Clutchy
                                Currently no way to determine that the NFTs are located on either. 
                                
                                <LinkListWithIcon
                                    textAndLinks={[
                                        {
                                            text: 'View on Keepsake',
                                            link: {
                                                type: LinkType.External,
                                                to: 'https://ethoswallet.xyz/dev',
                                                children: 'Learn how →',
                                            },
                                        },
                                        {
                                            text: 'View on Clutchy',
                                            link: {
                                                type: LinkType.External,
                                                to: 'https://ethoswallet.xyz/dev',
                                                children: 'Learn how →',
                                            },
                                        },
                                    ]}
                                />
                                */}
                            </div>
                        </div>
                    </div>
                </PageScrollView>
            </div>
        </>
    );
}

function NFTDetailsPage() {
    const [searchParams] = useSearchParams();
    const [startNFTTransfer, setStartNFTTransfer] = useState<boolean>(false);
    const [selectedNFT, setSelectedNFT] = useState<SuiObject | null>(null);
    const objectId = useMemo(
        () => searchParams.get('objectId'),
        [searchParams]
    );

    const nftCollections = useAppSelector(accountNftsSelector);

    const activeNFT = useMemo(() => {
        const selectedNFT = nftCollections.filter(
            (nftItem) => getObjectId(nftItem.reference) === objectId
        )[0];
        setSelectedNFT(selectedNFT);
        return selectedNFT;
    }, [nftCollections, objectId]);

    const loadingBalance = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );

    const startNFTTransferHandler = useCallback(() => {
        setStartNFTTransfer(true);
    }, []);

    if (!objectId || (!loadingBalance && !selectedNFT && !startNFTTransfer)) {
        return <Navigate to="/nfts" replace={true} />;
    }

    return (
        <div className="">
            <Loading loading={loadingBalance} big={true}>
                {objectId && startNFTTransfer ? (
                    <TransferNFTCard objectId={objectId} />
                ) : (
                    <NFTdetailsContent
                        nft={activeNFT}
                        onClick={startNFTTransferHandler}
                    />
                )}
            </Loading>
        </div>
    );
}

export default NFTDetailsPage;
