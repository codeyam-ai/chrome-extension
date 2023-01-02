import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { useMiddleEllipsis } from '../../hooks';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import Header from '../../shared/typography/Header';
import JumboTitle from '../../shared/typography/JumboTitle';
import Title from '../../shared/typography/Title';

interface StylePreviewCardProps {
    address: string;
    color: string;
    emoji: string;
    forceLightMode?: boolean;
}

const StylePreviewCard = ({
    address,
    color,
    emoji,
    forceLightMode,
}: StylePreviewCardProps) => {
    const shortenAddress = useMiddleEllipsis(address || '', 9, 5);

    return (
        <div
            className={`absolute bottom-0 flex flex-col w-[400px] h-[500px] rounded-tl-[20px] rounded-br-2xl shadow-ethos-box-shadow overflow-hidden bg-ethos-light-background-default ${
                forceLightMode
                    ? ''
                    : 'dark:bg-ethos-dark-background-default dark:text-ethos-dark-text-default'
            }`}
        >
            <div
                className={`flex items-center p-8 border-b border-b-ethos-light-text-stroke ${
                    forceLightMode ? '' : 'dark:border-b-ethos-dark-text-stroke'
                }`}
            >
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <WalletColorAndEmojiCircle
                            color={color}
                            emoji={emoji}
                            circleSizeClasses="h-[34px] w-[34px]"
                            emojiSizeInPx={20}
                        />
                        <Title>Wallet</Title>

                        <ChevronDownIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    </div>
                    <Header
                        isTextColorMedium
                        className={`!font-weight-ethos-body ${
                            forceLightMode
                                ? '!text-ethos-light-text-medium'
                                : ''
                        }
                        `}
                    >
                        {shortenAddress}
                    </Header>
                </div>
            </div>
            <div className="mt-11 ml-20">
                <div className="flex flex-col gap-8 p-4 place-items-center">
                    <WalletColorAndEmojiCircle
                        color={color}
                        emoji={emoji}
                        circleSizeClasses="h-[144px] w-[144px]"
                        emojiSizeInPx={80}
                    />
                    <div className="flex flex-col gap-1 text-center">
                        <Header
                            isTextColorMedium
                            className={
                                forceLightMode
                                    ? '!text-ethos-light-text-medium'
                                    : ''
                            }
                        >
                            Wallet Balance
                        </Header>
                        <JumboTitle className="text-size-ethos-ultra-jumbo leading-line-height-ethos-ultra-jumbo">
                            $10,000
                        </JumboTitle>
                    </div>
                    <div className="flex gap-3 pl-[40px] mt-[40px]">
                        <div className="h-[78px] w-[210px] rounded-[20px] bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                        <div className="h-[78px] w-[210px] rounded-[20px] bg-ethos-light-primary-light dark:bg-ethos-dark-primary-light" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StylePreviewCard;
