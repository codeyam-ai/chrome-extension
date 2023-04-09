import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type AccountInfo } from '_src/ui/app/KeypairVault';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateCurrentAccountInfo } from '_src/ui/app/hooks/useUpdateCurrentAccountInfo';
import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import Button from '_src/ui/app/shared/buttons/Button';
import EmojiPickerMenu, {
    type EmojiPickerResult,
} from '_src/ui/app/shared/inputs/emojis/EmojiPickerMenu';
import Title from '_src/ui/app/shared/typography/Title';

const ChangeEmoji: React.FC = () => {
    const [isEmojiPickerMenuOpen, setIsEmojiPickerMenuOpen] = useState(false);
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

    const openEmojiPickerMenu = useCallback(() => {
        setIsEmojiPickerMenuOpen(true);
    }, []);

    const closeEmojiPickerMenu = useCallback(() => {
        setIsEmojiPickerMenuOpen(false);
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
        navigate('/tokens/customize/color');
    }, [draftEmoji, navigate, updateCurrentAccountInfo]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center pt-6 px-6">
            <Title className="pb-6">Choose an emoji for your wallet</Title>
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
            <div className="flex mt-3 gap-3">
                <Button
                    removeContainerPadding
                    buttonStyle="secondary"
                    onClick={goBack}
                >
                    Back
                </Button>
                <Button removeContainerPadding onClick={handleOnContinue}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default ChangeEmoji;
