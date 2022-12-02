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

    return (
        <em-emoji
            shortcodes={emoji || defaultEmojis[0]}
            size={`${sizeInPx}px`}
        ></em-emoji>
    );
};

export default EmojiDisplay;
