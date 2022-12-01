// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import NavBarWithSettingsAndWalletPicker from '../../shared/navigation/nav-bar/NavBarWithSettingsAndWalletPicker';
import { useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { NFT_EXPERIMENT_LINK } from '_src/shared/constants';
import PlaceholderImage from '_src/ui/app/shared//svg/PlaceholderImage';
import NftGrid from '_src/ui/app/shared/content/rows-and-lists/NftGrid';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import PageScrollView from '_src/ui/app/shared/layouts/PageScrollView';

function NftsPage() {
    const nfts = useAppSelector(accountNftsSelector) || [];

    return (
        <div>
            <NavBarWithSettingsAndWalletPicker />
            {nfts.length <= 0 ? (
                <EmptyPageState
                    iconWithNoClasses={<PlaceholderImage />}
                    title="No NFTs here yet"
                    subtitle="This is where your created or purchased NFTs will appear..."
                    linkText="Explore NFTs on Ethos"
                    linkUrl={NFT_EXPERIMENT_LINK}
                />
            ) : (
                <>
                    <TextPageTitle title="NFTs" count={nfts.length} />
                    <PageScrollView>
                        <NftGrid nfts={nfts} />
                    </PageScrollView>
                </>
            )}
        </div>
    );
}

export default NftsPage;
