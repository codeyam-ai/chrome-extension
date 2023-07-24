import data from '@emoji-mart/data';
import { init } from 'emoji-mart';
import { useEffect } from 'react';

import defaultEmojis from '_src/shared/emojiOptions';

interface EmojiDisplayProps {
    emoji?: string;
    sizeInPx?: number;
}

const EmojiDisplay = ({ emoji, sizeInPx }: EmojiDisplayProps) => {
    useEffect(() => {
        init({ data });
    }, []);

    if (emoji && isEmojiNative(emoji)) {
        return <p style={{ fontSize: `${sizeInPx}px` }}>{emoji}</p>;
    }

    return (
        <em-emoji
            shortcodes={emoji || defaultEmojis[0]}
            size={`${sizeInPx}px`}
        ></em-emoji>
    );
};

export default EmojiDisplay;

const isEmojiNative = (emoji: string): boolean => {
    const emojiPattern = /\p{Emoji}/u;
    if (emojiPattern.test(emoji)) {
        return true;
    }
    return false;
};
