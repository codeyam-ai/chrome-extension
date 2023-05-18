import { useCallback, useState } from 'react';

import ChangeEmojiAndColor from './ChangeEmojiAndColor';
import ChangeNftPfp from './ChangeNftPfp';
import { useAppSelector } from '_src/ui/app/hooks';
import Radio from '_src/ui/app/shared/inputs/Radio';
import Title from '_src/ui/app/shared/typography/Title';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

const ChangeProfilePicture: React.FC = () => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const [pfpType, setPfpType] = useState<'emoji' | 'nft'>(
        accountInfo?.nftPfpUrl ? 'nft' : 'emoji'
    );

    const onRadioChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPfpType(event.target.name as 'emoji' | 'nft');
        },
        []
    );

    return (
        <div className="flex flex-col items-center pt-6 px-6">
            <Title>Choose your wallet&apos;s profile picture</Title>
            <div className="flex gap-4 py-4">
                <Radio
                    label="Emoji"
                    id="emoji"
                    onChange={onRadioChange}
                    checked={pfpType === 'emoji'}
                />
                <Radio
                    label="NFT"
                    id="nft"
                    onChange={onRadioChange}
                    checked={pfpType === 'nft'}
                />
            </div>
            <hr className="w-full text-ethos-light-text-stroke dark:text-ethos-dark-text-stroke pb-4" />
            {pfpType === 'emoji' ? <ChangeEmojiAndColor /> : <ChangeNftPfp />}
        </div>
    );
};

export default ChangeProfilePicture;
