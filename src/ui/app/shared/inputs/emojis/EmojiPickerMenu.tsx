import EmojiRow from './EmojiRow';

import type { Emoji } from '_src/shared/emojiOptions';

interface ColorPickerMenuProps {
    selectedEmoji: Emoji;
    setSelectedEmoji: (emoji: Emoji) => void;
}

const EmojiPickerMenu = ({
    selectedEmoji,
    setSelectedEmoji,
}: ColorPickerMenuProps) => {
    return (
        <div className="flex flex-col gap-3 w-full -mt-2 p-6 rounded-[20px] shadow-ethos-hovering-element-box-shadow bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            <EmojiRow
                selectedEmoji={selectedEmoji}
                setSelectedEmoji={setSelectedEmoji}
            />
        </div>
    );
};

export default EmojiPickerMenu;
