import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useFormatCoin } from '_hooks';
import { useDependencies } from '_shared/utils/dependenciesContext';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import Body from '_src/ui/app/shared/typography/Body';
import JumboTitle from '_src/ui/app/shared/typography/JumboTitle';
import Subheader from '_src/ui/app/shared/typography/Subheader';

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
            className="flex flex-col place-items-center"
            data-testid="wallet-and-balance"
        >
            <div className="pb-2">
                <WalletColorAndEmojiCircle
                    color={accountInfo?.color}
                    emoji={accountInfo?.emoji}
                    circleSizeClasses="h-[60px] w-[60px]"
                    emojiSizeInPx={32}
                />
            </div>
            <div className="flex flex-col">
                <Body>My Balance</Body>
                {featureFlags.showUsd ? (
                    <JumboTitle>{formatted}</JumboTitle>
                ) : (
                    <span className="flex gap-2 place-content-center items-baseline">
                        <JumboTitle>{balanceFormatted}</JumboTitle>
                        <Subheader>{symbol}</Subheader>
                    </span>
                )}
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;
