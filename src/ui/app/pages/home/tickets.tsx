// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { PhotoIcon } from '@heroicons/react/24/solid';

import { Icon } from '../../shared/icons/Icon';
import { useAppSelector } from '_hooks';
import { ticketsNftsSelector } from '_redux/slices/account';
import { NFT_EXPERIMENT_LINK } from '_src/shared/constants';
import NftGrid from '_src/ui/app/shared/content/rows-and-lists/NftGrid';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

function TicketsPage() {
    const tickets = useAppSelector(ticketsNftsSelector) || [];

    return (
        <div>
            {tickets.length <= 0 ? (
                <EmptyPageState
                    iconWithNoClasses={<Icon displayIcon={<PhotoIcon />} />}
                    title="No Tickets here yet"
                    subtitle="This is where your created or purchased NFTs will appear..."
                    linkText="Explore Tickets on Ethos"
                    linkUrl={NFT_EXPERIMENT_LINK}
                />
            ) : (
                <>
                    <TextPageTitle title="Tickets" count={tickets.length} />
                    <NftGrid nfts={tickets} />
                </>
            )}
        </div>
    );
}

export default TicketsPage;
