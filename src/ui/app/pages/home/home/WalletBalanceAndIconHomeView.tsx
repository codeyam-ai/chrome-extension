import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useFormatCoin } from '_hooks';
import { useDependencies } from '_src/shared/utils/dependenciesContext';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import JumboTitle from '_src/ui/app/shared/typography/JumboTitle';
import Title from '_src/ui/app/shared/typography/Title';
import Typography from '_src/ui/app/shared/typography/Typography';

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
    const [balanceFormatted, symbol, usdAmount, , , , , hasConversion] =
        useFormatCoin(mistBalance, SUI_TYPE_ARG, 6);

    const formatted = usdAmount.endsWith('.00')
        ? usdAmount.slice(0, -3)
        : usdAmount;

    return (
        <div
            className="flex flex-col place-items-center"
            data-testid="wallet-and-balance"
        >
            <div className="pb-3">
                <WalletColorAndEmojiCircle
                    color={accountInfo?.color}
                    emoji={accountInfo?.emoji}
                    nftPfpUrl={accountInfo?.nftPfpUrl}
                    circleSizeClasses="h-[90px] w-[90px]"
                    emojiSizeInPx={45}
                />
            </div>
            <div className="flex flex-col">
                {featureFlags.showUsd && hasConversion ? (
                    <div className="flex flex-col place-content-center items-center">
                        <Title>
                            {balanceFormatted} {symbol}
                        </Title>
                        {formatted && (
                            <Typography className={'font-[14px]'}>
                                SUI Balance ≈ {formatted} USD
                            </Typography>
                        )}
                    </div>
                ) : (
                    <JumboTitle>
                        {balanceFormatted} {symbol}
                    </JumboTitle>
                )}
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;
