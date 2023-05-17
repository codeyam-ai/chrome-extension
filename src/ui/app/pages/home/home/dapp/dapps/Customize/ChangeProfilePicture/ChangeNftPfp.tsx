import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';

import SelectableNftGrid from './SelectableNftGrid';
import { DASHBOARD_COLLECTIBLES } from '_src/shared/constants';
import Loading from '_src/ui/app/components/loading';
import { useAppSelector, useObjectsState } from '_src/ui/app/hooks';
import { accountNftsSelector } from '_src/ui/app/redux/slices/account';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

const ChangeNftPfp: React.FC = () => {
    const [selectedNftId, setSelectedNftId] = useState<string>();
    const { loading } = useObjectsState();

    const nfts = useAppSelector(accountNftsSelector) || [];

    const onSelectNft = useCallback((id: string) => {
        setSelectedNftId(id);
    }, []);

    return (
        <Loading loading={loading} big>
            <div className="flex flex-col gap-4">
                {nfts.length <= 0 ? (
                    <EmptyPageState
                        iconWithNoClasses={<Icon displayIcon={<PhotoIcon />} />}
                        title="No NFTs here yet"
                        subtitle="This is where your created or purchased NFTs will appear..."
                        linkText="Mint an NFT"
                        linkUrl={DASHBOARD_COLLECTIBLES}
                    />
                ) : (
                    <SelectableNftGrid
                        nfts={nfts}
                        onSelect={onSelectNft}
                        selectedNftId={selectedNftId}
                    />
                )}
            </div>
        </Loading>
    );
};

export default ChangeNftPfp;
