import EmojiDisplay from './EmojiDisplay';
import defaultColors from '_src/shared/defaultColorOptions';
import { type Emoji } from '_src/shared/emojiOptions';

interface WalletColorAndEmojiCircleProps {
    color?: string;
    emoji?: Emoji;
    circleSizeClasses?: string;
    emojiSizeClasses?: string;
}

const WalletColorAndEmojiCircle = ({
    color,
    emoji,
    circleSizeClasses,
    emojiSizeClasses,
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
            <EmojiDisplay emoji={emoji} className={emojiSizeClasses} />
        </div>
    );
};

export default WalletColorAndEmojiCircle;
