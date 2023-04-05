import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import StylePreviewCard from '../../components/onboarding/StylePreviewCard';
import getNextEmoji from '../../helpers/getNextEmoji';
import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppSelector } from '../../hooks';
import { useUpdateCurrentAccountInfo } from '../../hooks/useUpdateCurrentAccountInfo';
import EmojiDisplay from '../../shared/EmojiDisplay';
import Button from '../../shared/buttons/Button';
import ColorPickerMenu from '../../shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu from '../../shared/inputs/emojis/EmojiPickerMenu';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import BodyLarge from '../../shared/typography/BodyLarge';
import { getEncrypted } from '_src/shared/storagex/store';

import type { AccountInfo } from '../../KeypairVault';
import type { EmojiPickerResult } from '../../shared/inputs/emojis/EmojiPickerMenu';

const StylePage = () => {
    const [isHostedWallet, setIsHostedWallet] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
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

    const address = useAppSelector(({ account }) => account.address);

    const [draftColor, setDraftColor] = useState<string>(
        accountInfo?.color || getNextWalletColor(0)
    );

    const [draftEmoji, setDraftEmoji] = useState<string>(
        accountInfo?.emoji || getNextEmoji(0)
    );

    const openColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(true);
    }, []);

    const closeColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(false);
    }, []);

    const openEmojiPickerMenu = useCallback(() => {
        setIsEmojiPickerMenuOpen(true);
    }, []);

    const closeEmojiPickerMenu = useCallback(() => {
        setIsEmojiPickerMenuOpen(false);
    }, []);

    const onContinue = useCallback(() => {
        updateCurrentAccountInfo({ emoji: draftEmoji, color: draftColor });
        navigate('/initialize/theme');
    }, [draftEmoji, draftColor, navigate, updateCurrentAccountInfo]);

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

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted({
                key: 'authentication',
                session: true,
            });
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    return (
        <OnboardingCard
            title="Style Your Wallet"
            subtitle="Pick a color and emoji for your wallet profile."
            accentColor="blue-green"
            icon="emoji-and-color"
            hideBackButton
            progressCompleted={isHostedWallet ? 1 : 3}
            progressTotal={isHostedWallet ? 3 : 5}
            customRightCard={
                <StylePreviewCard
                    address={address || ''}
                    color={draftColor}
                    emoji={draftEmoji}
                    forceLightMode
                />
            }
        >
            <div className="relative flex gap-6 px-10 pb-[144px]">
                <div className="flex flex-col w-full text-center place-items-center place-content-center gap-3 py-6 px-3 bg-ethos-light-background-secondary rounded-2xl">
                    <div
                        data-testid="emoji-picker"
                        className="flex w-12 h-12 rounded-sm place-content-center items-center cursor-pointer"
                        onClick={openEmojiPickerMenu}
                    >
                        <EmojiDisplay emoji={draftEmoji} sizeInPx={46} />
                    </div>
                    <BodyLarge isSemibold>Choose Emoji</BodyLarge>
                    <div className="absolute -top-[30px] left-0 sm:top-[120px] sm:left-[55px]">
                        <EmojiPickerMenu
                            isOpen={isEmojiPickerMenuOpen}
                            setSelectedEmoji={_handleEmojiChange}
                            closeEmojiPickerMenu={closeEmojiPickerMenu}
                            forceLightMode
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full text-center place-items-center place-content-center gap-3 py-6 px-3 bg-ethos-light-background-secondary rounded-2xl">
                    <div
                        className="w-12 h-12 rounded-md cursor-pointer"
                        style={{ backgroundColor: draftColor }}
                        onClick={openColorPickerMenu}
                    />
                    <BodyLarge isSemibold>Choose Color</BodyLarge>
                    <div className="absolute top-[110px] -left-[60px]">
                        <ColorPickerMenu
                            isOpen={isColorPickerMenuOpen}
                            selectedColor={draftColor}
                            setSelectedColor={_handleColorChange}
                            closeColorPickerMenu={closeColorPickerMenu}
                            forceLightMode
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-center gap-4 px-6 sm:px-10 pb-6 sm:pb-10">
                <Button onClick={onContinue} removeContainerPadding>
                    Continue
                </Button>
                <Link to={'/initialize/complete'}>
                    <BodyLarge isSemibold isTextColorMedium forceLightMode>
                        Skip
                    </BodyLarge>
                </Link>
            </div>
        </OnboardingCard>
    );
};

export default StylePage;
