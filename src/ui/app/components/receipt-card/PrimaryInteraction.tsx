import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';

import truncateMiddle from '../../helpers/truncate-middle';
import { useAppSelector } from '../../hooks';
import useWalletOrContact from '../../hooks/useWalletOrContact';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import BodyLarge from '../../shared/typography/BodyLarge';
import CopyBody from '../../shared/typography/CopyBody';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';
import type { SuiAddress } from '@mysten/sui.js';

const AvatarItem = ({
    color,
    header,
    subheader,
    emoji,
}: {
    color?: string;
    header?: string;
    subheader?: string;
    emoji?: string;
}) => (
    <div className={'flex flex-row space-around items-center gap-6'}>
        <WalletColorAndEmojiCircle
            emojiSizeInPx={20}
            circleSizeClasses={'w-[40px] h-[40px] auto'}
            color={color || '#7E23CA'}
            emoji={emoji}
        />
        <div className={'flex flex-col items-left'}>
            {(header || '').length > 15 ? (
                <CopyBody
                    txt={header || ''}
                    large
                    isSemibold
                    className={'text-left'}
                >
                    {truncateMiddle(header)}
                </CopyBody>
            ) : (
                <BodyLarge isSemibold className={'text-left'}>
                    {header}
                </BodyLarge>
            )}

            <CopyBody
                txt={subheader || ''}
                className={'text-ethos-light-text-medium text-left'}
            >
                {truncateMiddle(subheader)}
            </CopyBody>
        </div>
    </div>
);

const WalletAvatarItem = ({
    header,
    address,
}: {
    header: string;
    address: SuiAddress;
}) => {
    const wallet = useWalletOrContact(address);
    const { activeAccountIndex, accountInfos } = useAppSelector(
        ({ account }) => account
    );
    const activeAccount = accountInfos[activeAccountIndex];

    if (address === activeAccount.address) {
        return <AvatarItem header={`${header}: You`} {...activeAccount} />;
    } else {
        return (
            <AvatarItem
                color={wallet?.color ?? '#6D28D9'}
                header={`${header}: ${wallet?.name}`}
                subheader={wallet?.address ?? ''}
                emoji={wallet?.emoji ?? ''}
            />
        );
    }
};

const PrimaryInteraction = ({ from, important }: AnalyzedTransaction) => {
    let toAddress;
    if (important.sending) {
        toAddress = important.sending[0].recipient;
    }

    return (
        <div className={'py-3 flex flex-col gap-3'}>
            {from && <WalletAvatarItem header="From" address={from} />}
            {toAddress && (
                <>
                    <div className="pl-[36px] text-ethos-light-text-medium">
                        <ChevronDoubleDownIcon width={25} height={23} />
                    </div>
                    <WalletAvatarItem header="To" address={toAddress} />
                </>
            )}
        </div>
    );
};

export default PrimaryInteraction;
