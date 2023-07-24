import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useCallback } from 'react';

export type EmojiPickerResult = {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string;
    aliases: string[];
};

interface EmojiPickerMenuProps {
    isOpen: boolean;
    setSelectedEmoji: (emojiPickerResult: EmojiPickerResult) => void;
    closeEmojiPickerMenu: () => void;
    forceLightMode?: boolean;
}

const EmojiPickerMenu = ({
    isOpen,
    setSelectedEmoji,
    closeEmojiPickerMenu,
    forceLightMode,
}: EmojiPickerMenuProps) => {
    const onEmojiSelect = useCallback(
        (emoji: EmojiPickerResult) => {
            console.log('emoji :>> ', emoji);
            console.log('emoji.shortcodes :>> ', emoji.shortcodes);
            console.log('emoji.native :>> ', emoji.native);
            setSelectedEmoji(emoji);
        },
        [setSelectedEmoji]
    );

    if (isOpen) {
        return (
            <>
                {/* Backdrop */}
                <div
                    data-testid="emoji-picker"
                    className="fixed top-0 left-0 w-screen h-screen bg-black/30"
                    onClick={closeEmojiPickerMenu}
                />

                <div className="absolute">
                    <Picker
                        data={data}
                        onEmojiSelect={onEmojiSelect}
                        theme={forceLightMode ? 'light' : 'auto'}
                    />
                </div>
            </>
        );
    }
    return <></>;
};

export default EmojiPickerMenu;
