import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import JumboTitle from '_src/ui/app/shared/typography/JumboTitle';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

interface WalletBalanceAndIconHomeViewProps {
    accountInfo?: AccountInfo;
    dollarValue: string;
}

const WalletBalanceAndIconHomeView = ({
    accountInfo,
    dollarValue,
}: WalletBalanceAndIconHomeViewProps) => {
    if (dollarValue.endsWith('.00')) {
        dollarValue = dollarValue.slice(0, -3);
    }
    return (
        <div className="flex flex-col gap-3 place-items-center">
            <div className="p-3">
                <WalletColorAndEmojiCircle
                    color={accountInfo?.color}
                    emoji={accountInfo?.emoji}
                    circleSizeClasses="h-[90px] w-[90px]"
                    emojiSizeInPx={45}
                />
            </div>
            <div className="flex flex-col gap-1">
                <BodyLarge isSemibold isTextColorMedium>
                    Wallet Balance
                </BodyLarge>
                <JumboTitle>{dollarValue}</JumboTitle>
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;
