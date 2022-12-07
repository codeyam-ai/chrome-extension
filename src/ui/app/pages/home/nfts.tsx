// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { PhotoIcon } from '@heroicons/react/24/solid';

import { Icon } from '../../shared/icons/Icon';
import { useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { NFT_EXPERIMENT_LINK } from '_src/shared/constants';
import NftGrid from '_src/ui/app/shared/content/rows-and-lists/NftGrid';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

function NftsPage() {
    const nfts = useAppSelector(accountNftsSelector) || [];

    return (
        <div>
            {nfts.length <= 0 ? (
                <EmptyPageState
                    iconWithNoClasses={<Icon displayIcon={<PhotoIcon />} />}
                    title="No NFTs here yet"
                    subtitle="This is where your created or purchased NFTs will appear..."
                    linkText="Explore NFTs on Ethos"
                    linkUrl={NFT_EXPERIMENT_LINK}
                />
            ) : (
                <>
                    <TextPageTitle title="NFTs" count={nfts.length} />
                    <NftGrid nfts={nfts} />
                </>
            )}
        </div>
    );
}

export default NftsPage;
