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
    return (
        <div
            className={`rounded-full flex items-center justify-center ${
                circleSizeClasses || ''
            }`}
            style={{
                backgroundColor: color || defaultColors[0],
            }}
        >
            <EmojiDisplay emoji={emoji} sizeInPx={emojiSizeInPx} />
        </div>
    );
};

export default WalletColorAndEmojiCircle;
