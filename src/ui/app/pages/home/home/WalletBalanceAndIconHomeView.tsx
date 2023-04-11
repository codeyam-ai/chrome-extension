import { Square2StackIcon } from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useFormatCoin } from '_hooks';
import { useDependencies } from '_shared/utils/dependenciesContext';
import CopyToClipboard from '_src/ui/app/components/copy-to-clipboard';
import useMiddleEllipsis from '_src/ui/app/hooks/useMiddleEllipsis';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
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
    const addressWithEllipsis = useMiddleEllipsis(
        accountInfo?.address || '',
        9,
        5
    );

    const { featureFlags } = useDependencies();

    const [balanceFormatted, symbol, usdAmount] = useFormatCoin(
        mistBalance,
        SUI_TYPE_ARG
    );

    const formatted = usdAmount.endsWith('.00')
        ? usdAmount.slice(0, -3)
        : usdAmount;

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
                <JumboTitle>
                    {featureFlags.showUsd
                        ? formatted
                        : `${balanceFormatted} ${symbol}`}
                </JumboTitle>

                {addressWithEllipsis && (
                    <div className="pb-4">
                        <CopyToClipboard txt={accountInfo?.address || ''}>
                            <Body>{addressWithEllipsis}</Body>
                            <div className="p-2">
                                <Square2StackIcon
                                    className="text-ethos-light-primary-light"
                                    width={14}
                                    height={14}
                                />
                            </div>
                        </CopyToClipboard>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;
