import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useFormatCoin } from '_hooks';
import { useDependencies } from '_shared/utils/dependenciesContext';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Header from '_src/ui/app/shared/typography/Header';
import JumboTitle from '_src/ui/app/shared/typography/JumboTitle';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

interface WalletBalanceAndIconHomeViewProps {
    accountInfo?: AccountInfo;
    mistBalance: bigint | undefined;
}

const WalletBalanceAndIconHomeView = ({
    accountInfo,
    mistBalance,
}: WalletBalanceAndIconHomeViewProps) => {
    const { featureFlags } = useDependencies();

    const [balanceFormatted, symbol, usdAmount] = useFormatCoin(
        mistBalance,
        SUI_TYPE_ARG,
        6
    );
    const formatted = usdAmount.endsWith('.00')
        ? usdAmount.slice(0, -3)
        : usdAmount;

    return (
        <div
            className="flex flex-col gap-3 place-items-center"
            data-testid="wallet-and-balance"
        >
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
                {featureFlags.showUsd ? (
                    <JumboTitle>{formatted}</JumboTitle>
                ) : (
                    <span className="flex gap-1 place-content-center items-baseline">
                        <JumboTitle>{balanceFormatted}</JumboTitle>
                        <Header>{symbol}</Header>
                    </span>
                )}
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;
