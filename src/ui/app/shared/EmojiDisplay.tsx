import Controller from '_src/ui/assets/emojis/Controller';
import CrystalBall from '_src/ui/assets/emojis/CrystalBall';
import DefaultEmoji from '_src/ui/assets/emojis/DefaultEmoji';
import Flower from '_src/ui/assets/emojis/Flower';
import Monster from '_src/ui/assets/emojis/Monster';
import Music from '_src/ui/assets/emojis/Music';
import Palette from '_src/ui/assets/emojis/Palette';
import PartyPopper from '_src/ui/assets/emojis/PartyPopper';
import Rocket from '_src/ui/assets/emojis/Rocket';
import Sparkles from '_src/ui/assets/emojis/Sparkles';
import Tools from '_src/ui/assets/emojis/Tools';

import type { Emoji } from '_src/shared/emojiOptions';

interface EmojiDisplayProps {
    emoji?: Emoji;
    className?: string;
}

const EmojiDisplay = ({ emoji, className }: EmojiDisplayProps) => {
    let baseEmoji = <Sparkles />;
    if (emoji === 'Rocket') baseEmoji = <Rocket />;
    if (emoji === 'Controller') baseEmoji = <Controller />;
    if (emoji === 'CrystalBall') baseEmoji = <CrystalBall />;
    if (emoji === 'Flower') baseEmoji = <Flower />;
    if (emoji === 'Monster') baseEmoji = <Monster />;
    if (emoji === 'Music') baseEmoji = <Music />;
    if (emoji === 'Palette') baseEmoji = <Palette />;
    if (emoji === 'PartyPopper') baseEmoji = <PartyPopper />;
    if (emoji === 'Sparkles') baseEmoji = <Sparkles />;
    if (emoji === 'Tools') baseEmoji = <Tools />;

    return <div className={className || ''}>{baseEmoji}</div>;
};

export default EmojiDisplay;
