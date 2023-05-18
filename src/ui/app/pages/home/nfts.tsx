import { PhotoIcon } from '@heroicons/react/24/solid';

import Loading from '../../components/loading';
import SubpageHeader from '../../shared/headers/SubpageHeader';
import { Icon } from '../../shared/icons/Icon';
import { useAppSelector, useObjectsState } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { DASHBOARD_COLLECTIBLES } from '_src/shared/constants';
import NftGrid from '_src/ui/app/shared/content/rows-and-lists/NftGrid';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

function NftsPage() {
    const { loading } = useObjectsState();

    const nfts = useAppSelector(accountNftsSelector) || [];
    return (
        <Loading loading={loading} big>
            <div className="flex flex-col gap-4">
                <SubpageHeader title="My Collectibles" />
                {nfts.length <= 0 ? (
                    <EmptyPageState
                        iconWithNoClasses={<Icon displayIcon={<PhotoIcon />} />}
                        title="No NFTs here yet"
                        subtitle="This is where your created or purchased NFTs will appear..."
                        linkText="Mint an NFT"
                        linkUrl={DASHBOARD_COLLECTIBLES}
                    />
                ) : (
                    <NftGrid nfts={nfts} />
                )}
            </div>
        </Loading>
    );
}

export default NftsPage;
