import { useCallback } from 'react';

import EmojiDisplay from '../../EmojiDisplay';
import emojiOptions from '_src/shared/emojiOptions';

import type { Emoji } from '_src/shared/emojiOptions';

interface EmojiButtonProps {
    emoji: Emoji;
    selectedEmoji: string;
    setSelectedEmoji: (emoji: Emoji) => void;
}

const EmojiButton = ({
    emoji,
    selectedEmoji,
    setSelectedEmoji,
}: EmojiButtonProps) => {
    const selectThisEmoji = useCallback(() => {
        setSelectedEmoji(emoji);
    }, [emoji, setSelectedEmoji]);
    return (
        <div
            className={`flex h-12 w-12 rounded-[10px] items-center place-content-center cursor-pointer ${
                emoji === selectedEmoji && 'border-2 border-black/[.3]'
            }`}
            onClick={selectThisEmoji}
        >
            <EmojiDisplay emoji={emoji} className="h-10 w-10" />
        </div>
    );
};

interface EmojiRowProps {
    selectedEmoji: string;
    setSelectedEmoji: (emoji: Emoji) => void;
}

const EmojiRow = ({ selectedEmoji, setSelectedEmoji }: EmojiRowProps) => {
    return (
        <div className="grid grid-cols-5 gap-2">
            {emojiOptions.map((emoji, key) => {
                return (
                    <EmojiButton
                        emoji={emoji}
                        selectedEmoji={selectedEmoji}
                        setSelectedEmoji={setSelectedEmoji}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

export default EmojiRow;
