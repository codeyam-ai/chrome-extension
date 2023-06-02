import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo, useState } from 'react';

import Loading from '../../components/loading';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { fetchMoreObjects } from '../../redux/slices/sui-objects';
import Button from '../../shared/buttons/Button';
import SubpageHeader from '../../shared/headers/SubpageHeader';
import { Icon } from '../../shared/icons/Icon';
import { useAppDispatch, useAppSelector, useObjectsState } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { DASHBOARD_COLLECTIBLES } from '_src/shared/constants';
import NftGrid from '_src/ui/app/shared/content/rows-and-lists/NftGrid';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

function NftsPage() {
    const dispatch = useAppDispatch();
    const { loading, loadingMore } = useObjectsState();
    const [showAll, setShowAll] = useState(false);

    const nfts = useAppSelector(accountNftsSelector);
    const { kiosksPending, cursor } = useAppSelector(
        ({ suiObjects }) => suiObjects
    );
    const { invalidPackages } = useAppSelector(({ valid }) => valid);

    const validNfts = useMemo(() => {
        if (!nfts) return [];
        if (showAll) return nfts;

        return nfts.filter(
            (nft) => !invalidPackages.includes(nft.type?.split('::')[0] ?? '')
        );
    }, [showAll, nfts, invalidPackages]);

    const toggleShowAll = useCallback(() => {
        setShowAll((prev) => !prev);
    }, []);

    const edit = useMemo(() => {
        return (
            <div
                onClick={toggleShowAll}
                className={`cursor-pointer ${
                    showAll
                        ? 'text-ethos-light-primary-light'
                        : 'text-ethos-light-text-medium'
                }`}
            >
                <AdjustmentsHorizontalIcon width={24} />
            </div>
        );
    }, [showAll, toggleShowAll]);

    const loadMore = useCallback(() => {
        if (loadingMore) return;
        dispatch(fetchMoreObjects());
    }, [dispatch, loadingMore]);

    return (
        <Loading loading={loading} big>
            <div className="flex flex-col gap-4">
                <SubpageHeader title="My Collectibles" action={edit} />
                {nfts.length <= 0 ? (
                    <EmptyPageState
                        iconWithNoClasses={<Icon displayIcon={<PhotoIcon />} />}
                        title="No NFTs here yet"
                        subtitle="This is where your created or purchased NFTs will appear..."
                        linkText="Mint an NFT"
                        linkUrl={DASHBOARD_COLLECTIBLES}
                    />
                ) : (
                    <NftGrid nfts={validNfts} edit={showAll} />
                )}
                {(kiosksPending || !!cursor) && (
                    <div className="p-6">
                        <Button onClick={loadMore}>
                            {loadingMore ? (
                                <LoadingIndicator />
                            ) : (
                                <>Load More</>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </Loading>
    );
}

export default NftsPage;
