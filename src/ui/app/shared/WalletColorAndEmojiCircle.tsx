import EmojiDisplay from './EmojiDisplay';
import defaultColors from '_src/shared/defaultColorOptions';

interface WalletColorAndEmojiCircleProps {
    color?: string;
    emoji?: string;
    nftPfpUrl?: string;
    circleSizeClasses?: string;
    emojiSizeInPx?: number;
    hideEmoji?: boolean;
}

const WalletColorAndEmojiCircle = ({
    color,
    emoji,
    nftPfpUrl,
    circleSizeClasses,
    emojiSizeInPx,
    hideEmoji,
}: WalletColorAndEmojiCircleProps) => {
    const backgroundColor = color || defaultColors[0];

    if (nftPfpUrl) {
        return (
            <img
                src={nftPfpUrl}
                alt="NFT Profile"
                className={`rounded-full flex items-center justify-center object-cover ${
                    circleSizeClasses || ''
                }`}
            />
        );
    }

    return (
        <div
            data-testid={`color-${backgroundColor}`}
            className={`rounded-full flex items-center justify-center ${
                circleSizeClasses || ''
            }`}
            style={{ backgroundColor }}
        >
            {!hideEmoji && (
                <EmojiDisplay emoji={emoji} sizeInPx={emojiSizeInPx} />
            )}
        </div>
    );
};

export default WalletColorAndEmojiCircle;
