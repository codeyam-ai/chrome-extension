// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { SparklesIcon } from '@heroicons/react/24/outline';
import { hasPublicTransfer } from '@mysten/sui.js';
import { Link } from 'react-router-dom';

import { Content } from '_app/shared/bottom-menu-layout';
import PageTitle from '_app/shared/page-title';
import NFTdisplay from '_components/nft-display';
import { useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { LinkType } from '_src/enums/LinkType';
import { NFT_EXPERIMENT_LINK } from '_src/shared/constants';
import Icon, { SuiIcons } from '_src/ui/app/components/icon';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import st from './NFTPage.module.scss';

function NftsPage() {
    const nfts = useAppSelector(accountNftsSelector) || [];

    return (
        <div>
            {nfts.length <= 0 ? (
                <div className="pt-24 text-center flex flex-col gap-2">
                    <SparklesIcon className="h-6 w-6 mx-auto" />
                    <Subheader as="h3">No NFTs yet</Subheader>
                    <Body>
                        <EthosLink
                            to={NFT_EXPERIMENT_LINK}
                            type={LinkType.External}
                        >
                            Explore creating your own digital asset →
                        </EthosLink>
                    </Body>
                </div>
            ) : (
                <>
                    <PageTitle
                        title="NFTs"
                        // stats={`${nfts.length}`}
                        className={st.pageTitle}
                    />
                    <Content>
                        <section className={st.nftGalleryContainer}>
                            <section className={st.nftGallery}>
                                {nfts
                                    .filter((nft) => hasPublicTransfer(nft))
                                    .map((nft, index) => (
                                        <Link
                                            to={`/nft-details?${new URLSearchParams(
                                                {
                                                    objectId:
                                                        nft.reference.objectId,
                                                }
                                            ).toString()}`}
                                            key={index}
                                        >
                                            <NFTdisplay
                                                nftobj={nft}
                                                showlabel={true}
                                            />
                                        </Link>
                                    ))}
                            </section>
                        </section>
                    </Content>
                </>
            )}
        </div>
    );
}

export default NftsPage;
