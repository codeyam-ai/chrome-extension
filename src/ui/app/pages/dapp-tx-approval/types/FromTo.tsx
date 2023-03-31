import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppSelector } from '_src/ui/app/hooks';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import Body from '_src/ui/app/shared/typography/Body';

const FromTo = ({ to }: { to: string }) => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo) => (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const shortenedName = truncateString(accountInfo?.name || 'Wallet', 8);

    return (
        <div className="p-6">
            <div className="bg-[#F8F5FF] border border-[#F0EBFE] rounded-xl overflow-hidden flex flex-col">
                <div className="flex flex-row justify-between items-center border-b border-[#F0EBFE] p-3">
                    <Body>From</Body>
                    <div className="flex items-center gap-1">
                        <WalletColorAndEmojiCircle
                            color={accountInfo?.color}
                            emoji={accountInfo?.emoji}
                            circleSizeClasses="h-5 w-5"
                            emojiSizeInPx={9}
                        />
                        <Body isSemibold>{shortenedName}</Body>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-3">
                    <Body>To</Body>
                    <Body isSemibold={true}>{truncateMiddle(to)}</Body>
                </div>
            </div>
        </div>
    );
};

export default FromTo;
