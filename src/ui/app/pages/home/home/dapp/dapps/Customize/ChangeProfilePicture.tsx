import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type AccountInfo } from '_src/ui/app/KeypairVault';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateCurrentAccountInfo } from '_src/ui/app/hooks/useUpdateCurrentAccountInfo';
import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import Button from '_src/ui/app/shared/buttons/Button';
import ColorPickerMenu from '_src/ui/app/shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu, {
    type EmojiPickerResult,
} from '_src/ui/app/shared/inputs/emojis/EmojiPickerMenu';
import Title from '_src/ui/app/shared/typography/Title';

const ChangeProfilePicture: React.FC = () => {
    const [isEmojiPickerMenuOpen, setIsEmojiPickerMenuOpen] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    const { updateCurrentAccountInfo } = useUpdateCurrentAccountInfo();
    const navigate = useNavigate();

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const [draftEmoji, setDraftEmoji] = useState<string>(
        accountInfo?.emoji || getNextEmoji(0)
    );
    const [draftColor, setDraftColor] = useState<string>(
        accountInfo?.color || getNextWalletColor(0)
    );

    const openEmojiPickerMenu = useCallback(() => {
        setIsEmojiPickerMenuOpen(true);
    }, []);

    const closeEmojiPickerMenu = useCallback(() => {
        setIsEmojiPickerMenuOpen(false);
    }, []);

    const openColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(true);
    }, []);

    const closeColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(false);
    }, []);

    const _handleColorChange = useCallback((color: string) => {
        setDraftColor(color);
        setIsColorPickerMenuOpen(false);
    }, []);

    const _handleEmojiChange = useCallback(
        (emojiPickerResult: EmojiPickerResult) => {
            setDraftEmoji(emojiPickerResult.shortcodes);
            setIsEmojiPickerMenuOpen(false);
        },
        []
    );

    const handleOnContinue = useCallback(() => {
        updateCurrentAccountInfo({ emoji: draftEmoji });
        navigate('/home/customize/theme');
    }, [draftEmoji, navigate, updateCurrentAccountInfo]);

    return (
        <div className="flex flex-col items-center pt-6 px-6">
            <Title className="pb-6">
                Choose your wallet&apos;s profile picture
            </Title>
            <div className="flex gap-6">
                <div
                    data-testid="emoji-picker"
                    className="flex w-20 h-20 rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke place-content-center items-center cursor-pointer"
                    onClick={openEmojiPickerMenu}
                >
                    <EmojiDisplay emoji={draftEmoji} sizeInPx={46} />
                </div>
                <EmojiPickerMenu
                    isOpen={isEmojiPickerMenuOpen}
                    setSelectedEmoji={_handleEmojiChange}
                    closeEmojiPickerMenu={closeEmojiPickerMenu}
                />
                <div
                    className="w-20 h-20 rounded-md cursor-pointer"
                    style={{ backgroundColor: draftColor }}
                    onClick={openColorPickerMenu}
                />
                <ColorPickerMenu
                    isOpen={isColorPickerMenuOpen}
                    selectedColor={draftColor}
                    setSelectedColor={_handleColorChange}
                    closeColorPickerMenu={closeColorPickerMenu}
                    leftAbsoluteClassNames="left-[24px] top-[180px]"
                />
            </div>
            <Button
                onClick={handleOnContinue}
                wrapperClassName="w-full mt-6"
                isInline
            >
                Next
            </Button>
        </div>
    );
};

export default ChangeProfilePicture;
