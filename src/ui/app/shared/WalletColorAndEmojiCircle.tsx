import EmojiDisplay from './EmojiDisplay';
import defaultColors from '_src/shared/defaultColorOptions';

interface WalletColorAndEmojiCircleProps {
    color?: string;
    emoji?: string;
    circleSizeClasses?: string;
    emojiSizeInPx?: number;
}

const WalletColorAndEmojiCircle = ({
    color,
    emoji,
    circleSizeClasses,
    emojiSizeInPx,
}: WalletColorAndEmojiCircleProps) => {
    const backgroundColor = color || defaultColors[0];
    return (
        <div
            data-testid={`color-${backgroundColor}`}
            className={`rounded-full flex items-center justify-center ${
                circleSizeClasses || ''
            }`}
            style={{ backgroundColor }}
        >
            <EmojiDisplay emoji={emoji} sizeInPx={emojiSizeInPx} />
        </div>
    );
};

export default WalletColorAndEmojiCircle;
