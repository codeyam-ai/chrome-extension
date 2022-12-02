import React from 'react';

interface EmojiComponentProps {
    shortcodes: string;
    size: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'em-emoji': EmojiComponentProps;
        }
    }
}
