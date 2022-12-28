import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import StylePreviewCard from '../../components/onboarding/StylePreviewCard';
import getNextEmoji from '../../helpers/getNextEmoji';
import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    saveAccountInfos,
    saveActiveAccountIndex,
    setAccountInfos,
} from '../../redux/slices/account';
import EmojiDisplay from '../../shared/EmojiDisplay';
import Button from '../../shared/buttons/Button';
import ColorPickerMenu from '../../shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu from '../../shared/inputs/emojis/EmojiPickerMenu';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import BodyLarge from '../../shared/typography/BodyLarge';
import Authentication from '_src/background/Authentication';
import { getEncrypted } from '_src/shared/storagex/store';

import type { AccountInfo } from '../../KeypairVault';
import type { EmojiPickerResult } from '../../shared/inputs/emojis/EmojiPickerMenu';

const StylePage = () => {
    const [isHostedWallet, setIsHostedWallet] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    const [isEmojiPickerMenuOpen, setIsEmojiPickerMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const _accountInfos = useAppSelector(({ account }) => account.accountInfos);

    const address = useAppSelector(({ account }) => account.address);

    const draftAccountInfos = useRef<AccountInfo[]>(_accountInfos);

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

    const _saveAccountInfos = useCallback(async () => {
        if (isHostedWallet) {
            await Authentication.updateAccountInfos(draftAccountInfos.current);
            await dispatch(setAccountInfos(draftAccountInfos.current));
            await Authentication.getAccountInfos(true);
        } else {
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            await dispatch(
                saveActiveAccountIndex(draftAccountInfos.current.length - 1)
            );
        }

        navigate('/initialize/theme');
    }, [isHostedWallet, dispatch, navigate]);

    const _handleChange = useCallback(
        ({
            name,
            color,
            emoji,
        }: {
            name?: string;
            color?: string;
            emoji?: string;
        }) => {
            draftAccountInfos.current = draftAccountInfos.current.map(
                (accountInfo: AccountInfo) => {
                    if (accountInfo.index === 0) {
                        return {
                            ...accountInfo,
                            color: color || accountInfo.color,
                            emoji: emoji || accountInfo.emoji,
                        };
                    } else {
                        return accountInfo;
                    }
                }
            );
        },
        []
    );

    const _handleColorChange = useCallback(
        (color: string) => {
            setDraftColor(color);
            _handleChange({ color });
            setIsColorPickerMenuOpen(false);
        },
        [_handleChange]
    );

    const _handleEmojiChange = useCallback(
        (emojiPickerResult: EmojiPickerResult) => {
            setDraftEmoji(emojiPickerResult.shortcodes);
            _handleChange({ emoji: emojiPickerResult.shortcodes });
            setIsEmojiPickerMenuOpen(false);
        },
        [_handleChange]
    );

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted('authentication');
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
                <Button onClick={_saveAccountInfos} removeContainerPadding>
                    Continue
                </Button>
                <Link to={'/initialize/complete'}>
                    <BodyLarge isSemibold isTextColorMedium>
                        Skip
                    </BodyLarge>
                </Link>
            </div>
        </OnboardingCard>
    );
};

export default StylePage;
