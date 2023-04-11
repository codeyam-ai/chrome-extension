import { Square2StackIcon } from '@heroicons/react/24/outline';

import CopyToClipboard from '_src/ui/app/components/copy-to-clipboard';
import useMiddleEllipsis from '_src/ui/app/hooks/useMiddleEllipsis';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import Body from '_src/ui/app/shared/typography/Body';
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

    const addressWithEllipsis = useMiddleEllipsis(
        accountInfo?.address || '',
        9,
        5
    );

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
