import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

interface WalletBalanceAndIconHomeViewProps {
    accountInfo?: AccountInfo;
    dollarValue: number;
}

const WalletBalanceAndIconHomeView = ({
    accountInfo,
    dollarValue,
}: WalletBalanceAndIconHomeViewProps) => {
    const dollarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let formattedDollarValue = dollarFormatter.format(dollarValue);
    if (formattedDollarValue.endsWith('.00')) {
        formattedDollarValue = formattedDollarValue.slice(0, -3);
    }
    return (
        <div className="flex flex-col gap-6 py-8 px-6 place-items-center">
            <WalletColorAndEmojiCircle
                color={accountInfo?.color}
                emoji={accountInfo?.emoji}
                circleSizeClasses="h-[104px] w-[104px]"
                emojiSizeClasses="h-14 w-14"
            />
            <div className="flex flex-col gap-1">
                <BodyLarge isSemibold isTextColorMedium>
                    Wallet Balance
                </BodyLarge>
                <Title>{formattedDollarValue}</Title>
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;
