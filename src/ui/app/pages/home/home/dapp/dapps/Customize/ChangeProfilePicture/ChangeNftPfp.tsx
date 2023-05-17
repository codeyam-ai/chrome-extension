import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SelectableNftGrid from './SelectableNftGrid';
import { DASHBOARD_COLLECTIBLES } from '_src/shared/constants';
import Loading from '_src/ui/app/components/loading';
import { useAppSelector, useObjectsState } from '_src/ui/app/hooks';
import { useUpdateCurrentAccountInfo } from '_src/ui/app/hooks/useUpdateCurrentAccountInfo';
import { accountNftsSelector } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

const ChangeNftPfp: React.FC = () => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const [selectedNftId, setSelectedNftId] = useState<string>(
        accountInfo?.nftPfpId || ''
    );
    const [selectedNftUrl, setSelectedNftUrl] = useState<string>();

    const { loading } = useObjectsState();
    const navigate = useNavigate();
    const { updateCurrentAccountInfo } = useUpdateCurrentAccountInfo();

    const nfts = useAppSelector(accountNftsSelector) || [];

    const onSelectNft = useCallback((id: string, url: string) => {
        setSelectedNftId(id);
        setSelectedNftUrl(url);
    }, []);

    const handleOnContinue = useCallback(() => {
        updateCurrentAccountInfo({
            nftPfpId: selectedNftId,
            nftPfpUrl: selectedNftUrl,
        });
        navigate('/home/customize/theme');
    }, [navigate, selectedNftId, selectedNftUrl, updateCurrentAccountInfo]);

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
                    <div className="flex flex-col">
                        <Button
                            onClick={handleOnContinue}
                            disabled={!selectedNftId}
                            isInline
                        >
                            Continue
                        </Button>
                        <SelectableNftGrid
                            nfts={nfts}
                            onSelect={onSelectNft}
                            selectedNftId={selectedNftId}
                        />
                    </div>
                )}
            </div>
        </Loading>
    );
};

export default ChangeNftPfp;
