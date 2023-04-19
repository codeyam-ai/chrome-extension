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
    pre,
    header,
    subheader,
    emoji,
    fullHeader,
}: {
    color?: string;
    pre?: string;
    header?: string;
    subheader?: string;
    emoji?: string;
    fullHeader?: string;
}) => (
    <div className={'flex items-center gap-3'}>
        <WalletColorAndEmojiCircle
            emojiSizeInPx={20}
            circleSizeClasses={'w-[40px] h-[40px] auto'}
            color={color || '#7E23CA'}
            emoji={emoji}
        />
        <div className={'flex flex-col items-start'}>
            <div className="flex gap-1 items-center">
                {!fullHeader && (
                    <BodyLarge isSemibold>{pre ? `${pre}:` : ''}</BodyLarge>
                )}
                {(fullHeader ?? header ?? '').length > 24 ? (
                    <CopyBody
                        txt={fullHeader ?? header ?? ''}
                        large
                        isSemibold
                        className={'text-left'}
                    >
                        {truncateMiddle(fullHeader ?? header)}
                    </CopyBody>
                ) : (
                    <BodyLarge isSemibold className={'text-left'}>
                        {fullHeader ?? header}
                    </BodyLarge>
                )}
            </div>

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
    pre,
    fullHeader,
    address,
}: {
    pre: string;
    fullHeader?: string;
    address: SuiAddress;
}) => {
    const wallet = useWalletOrContact(address);
    const { activeAccountIndex, accountInfos } = useAppSelector(
        ({ account }) => account
    );
    const activeAccount = accountInfos[activeAccountIndex];

    if (address === activeAccount.address) {
        return <AvatarItem fullHeader={`${pre}: You`} {...activeAccount} />;
    } else {
        return (
            <AvatarItem
                color={wallet?.color ?? '#6D28D9'}
                fullHeader={fullHeader}
                pre={fullHeader ? undefined : pre}
                header={fullHeader ? undefined : wallet?.name ?? address}
                subheader={address}
                emoji={wallet?.emoji ?? ''}
            />
        );
    }
};

const PrimaryInteraction = ({ from, important }: AnalyzedTransaction) => {
    let toAddress;

    let fromHeader;
    if (important.faucet) {
        fromHeader = 'From: Sui Faucet';
    }

    if (important.sending) {
        toAddress = important.sending[0].recipient;
    }

    return (
        <div className={'py-3 flex flex-col gap-3'}>
            {from && (
                <WalletAvatarItem
                    pre="From"
                    fullHeader={fromHeader}
                    address={from}
                />
            )}
            {toAddress && (
                <>
                    <div className="pl-[30px] text-ethos-light-text-medium">
                        <ChevronDoubleDownIcon width={25} height={23} />
                    </div>
                    <WalletAvatarItem pre="To" address={toAddress} />
                </>
            )}
        </div>
    );
};

export default PrimaryInteraction;
