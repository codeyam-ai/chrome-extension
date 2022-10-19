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
import EmptyPageState from '_src/ui/app/shared/content/EmptyPageState';
import PageScrollView from '_src/ui/app/shared/content/PageScrollView';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import st from './NFTPage.module.scss';

function NftsPage() {
    const nfts = useAppSelector(accountNftsSelector) || [];

    return (
        <div>
            {nfts.length <= 0 ? (
                <EmptyPageState
                    iconWithNoClasses={<SparklesIcon />}
                    title="No NFTs yet"
                    subtitle="Create your own digital assets."
                    linkText="Learn more"
                    linkUrl={NFT_EXPERIMENT_LINK}
                />
            ) : (
                <>
                    <TextPageTitle title="NFTs" />
                    <PageScrollView>
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
                                                            nft.reference
                                                                .objectId,
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
                    </PageScrollView>
                </>
            )}
        </div>
    );
}

export default NftsPage;
