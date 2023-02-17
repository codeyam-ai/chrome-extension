import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';

import type { AccountInfo } from '../../KeypairVault';

const WalletTo = ({
    addressTo,
    walletTo,
    noTo,
}: {
    addressTo?: string;
    walletTo?: AccountInfo;
    noTo?: boolean;
}) => {
    if (!walletTo)
        return (
            <>
                {!noTo ? 'To:' : ''} {truncateMiddle(addressTo)}
            </>
        );

    return (
        <div className="flex gap-1 items-center">
            {!noTo && <div className="mr-1">To:</div>}
            <WalletColorAndEmojiCircle
                color={walletTo.color}
                emoji={walletTo.emoji}
                circleSizeClasses="h-5 w-5"
                emojiSizeInPx={12}
            />
            <div>{walletTo.name || truncateMiddle(walletTo.address)}</div>
            {!!walletTo.name && (
                <div>({truncateMiddle(walletTo.address, 4)})</div>
            )}
        </div>
    );
};

export default WalletTo;
