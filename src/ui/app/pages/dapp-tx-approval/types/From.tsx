import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppSelector } from '_src/ui/app/hooks';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import Body from '_src/ui/app/shared/typography/Body';
import CardRow from './CardRow';

const From = () => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo) => (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const shortenedName = truncateString(accountInfo?.name || 'Wallet', 8);

    return (
        <CardRow>
            <Body>From</Body>
            <div className="flex items-center gap-2">
                <WalletColorAndEmojiCircle
                    color={accountInfo?.color}
                    emoji={accountInfo?.emoji}
                    circleSizeClasses="h-6 w-6"
                    emojiSizeInPx={12}
                />
                <Body isSemibold>{shortenedName}</Body>
            </div>
        </CardRow>
    );
};

export default From;
