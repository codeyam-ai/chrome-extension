import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export type EmojiPickerResult = {
    shortcodes: string;
};

interface EmojiPickerMenuProps {
    isOpen: boolean;
    setSelectedEmoji: (emojiPickerResult: EmojiPickerResult) => void;
    closeEmojiPickerMenu: () => void;
}

const EmojiPickerMenu = ({
    isOpen,
    setSelectedEmoji,
    closeEmojiPickerMenu,
}: EmojiPickerMenuProps) => {
    if (isOpen) {
        return (
            <>
                {/* Backdrop */}
                <div
                    data-testid="emoji-picker"
                    className="fixed top-0 left-0 w-screen h-screen"
                    onClick={closeEmojiPickerMenu}
                />

                <div className="absolute">
                    <Picker data={data} onEmojiSelect={setSelectedEmoji} />
                </div>
            </>
        );
    }
    return <></>;
};

export default EmojiPickerMenu;
