// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getObjectId } from '@mysten/sui.js';
import { useMemo, useState, useCallback } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import TransferNFTCard from './transfer-nft';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import Loading from '_components/loading';
import { useAppSelector, useMiddleEllipsis, useNFTBasicData } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import NavBarWithBackAndTitle from '_src/ui/app/shared/navigation/nav-bar/NavBarWithBackAndTitle';
import Body from '_src/ui/app/shared/typography/Body';

import type { SuiObject } from '@mysten/sui.js';
import type { ButtonHTMLAttributes } from 'react';

import st from './NFTDetails.module.scss';

const TRUNCATE_MAX_LENGTH = 10;
const TRUNCATE_PREFIX_LENGTH = 6;
function NFTdetailsContent({
    nft,
    onClick,
}: {
    nft: SuiObject;
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
    const { filePath, nftObjectID, nftFields, fileExtentionType } =
        useNFTBasicData(nft);

    const shortenedObjectId = useMiddleEllipsis(
        nftObjectID,
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    // const NFTDetails = (
    //     <div className="mt-5 p-5 rounded-md dark:bg-gray-700">
    //         <div className="flex flex-row items-center justify-between">
    //             <div className={st.label}>Object ID</div>
    //             <div className={st.value}>
    //                 <ExplorerLink
    //                     type={ExplorerLinkType.object}
    //                     objectID={nftObjectID}
    //                     title="View on Sui Explorer"
    //                     className={st.explorerLink}
    //                     showIcon={false}
    //                 >
    //                     {shortenedObjectId}
    //                 </ExplorerLink>
    //             </div>
    //         </div>

    //         {fileExtentionType.name !== '' && (
    //             <div className={st.nftItemDetail}>
    //                 <div className={st.label}>Media Type</div>
    //                 <div className={st.value}>
    //                     {fileExtentionType?.name} {fileExtentionType.type}
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );

    return (
        <>
            <div className={st.container}>
                <NavBarWithBackAndTitle
                    // title={nftFields?.name}
                    backLink="/nfts"
                />
                <div className="text-center w-full">
                    <Body className="pb-2">{nftFields?.name}</Body>
                    <img
                        className="mx-auto h-36 w-36 mb-4 shadow-sm rounded-2xl"
                        src={filePath || ''}
                        alt={fileExtentionType?.name || 'NFT'}
                    />
                    <div className="mb-4">
                        <ExplorerLink
                            type={ExplorerLinkType.object}
                            objectID={nftObjectID}
                        >
                            View On Sui Explorer →
                        </ExplorerLink>
                    </div>
                    <KeyValueList
                        keyNamesAndValues={[
                            {
                                keyName: 'Object ID',
                                value: shortenedObjectId,
                            },
                        ]}
                    />
                </div>
                {/* This margin top is a temporary fix - we need to figure out if the page should scroll */}
                <Button
                    buttonStyle="primary"
                    className="-mt-[15px]"
                    onClick={onClick}
                >
                    Send
                </Button>
                {/* <BottomMenuLayout>
                    <Content>
                        <section className={st.nftDetail}>
                            <NFTDisplayCard
                                nftobj={nft}
                                size="large"
                                expandable={true}
                            />
                            {NFTDetails}
                        </section>
                    </Content>
                    <Menu stuckClass={st.shadow} className={st.shadow}>
                        <Button
                            buttonStyle={ButtonStyle.PRIMARY}
                            onClick={onClick}
                            className="mt-2"
                        >
                            <Icon
                                className="mr-2 text-xs"
                                icon={SuiIcons.Send}
                            />
                            Send
                        </Button>
                    </Menu>
                </BottomMenuLayout> */}
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
