// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { SparklesIcon } from '@heroicons/react/24/outline';

import { useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { NFT_EXPERIMENT_LINK } from '_src/shared/constants';
import NftGrid from '_src/ui/app/shared/content/rows-and-lists/NftGrid';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import PageScrollView from '_src/ui/app/shared/layouts/PageScrollView';

function NftsPage() {
    const nfts = useAppSelector(accountNftsSelector) || [];

    // console.log('nfts :>> ', nfts);

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
                        <NftGrid nfts={nfts} />
                    </PageScrollView>
                </>
            )}
        </div>
    );
}

export default NftsPage;
