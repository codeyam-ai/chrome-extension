import { useCallback, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useWalletName from '../../hooks/useWalletName';
import { saveAccountInfos, setAccountInfos } from '../../redux/slices/account';
import { thunkExtras } from '../../redux/store/thunk-extras';
import EmojiDisplay from '../../shared/EmojiDisplay';
import Button from '../../shared/buttons/Button';
import BasicSectionHeader from '../../shared/headers/section-headers/BasicSectionHeader';
import Input from '../../shared/inputs/Input';
import ColorPickerMenu from '../../shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu from '../../shared/inputs/emojis/EmojiPickerMenu';
import BodyLarge from '../../shared/typography/BodyLarge';
import { useSuiLedgerClient } from '../ledger/SuiLedgerClientProvider';
import Loading from '../loading';
import Authentication from '_src/background/Authentication';
import saveCustomizations from '_src/shared/utils/customizationsSync/saveCustomizations';
import useJwt from '_src/shared/utils/customizationsSync/useJwt';

import type { AccountInfo } from '../../KeypairVault';
import type { EmojiPickerResult } from '../../shared/inputs/emojis/EmojiPickerMenu';
import { useDependencies } from '_src/shared/utils/dependenciesContext';

interface EditWalletProps {
    setIsWalletEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditWallet = ({ setIsWalletEditing }: EditWalletProps) => {
    const [loading, setLoading] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    const [isEmojiPickerMenuOpen, setIsEmojiPickerMenuOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const { featureFlags } = useDependencies();
    const { getCachedJwt } = useJwt();

    const { accountInfos: _accountInfos, authentication } = useAppSelector(
        ({ account }) => account
    );

    let walletIndex = 0;
    const indexFromParam = searchParams.get('index');
    if (indexFromParam !== null) {
        walletIndex = +indexFromParam;
    }
    const currentAccountInfo =
        _accountInfos.find(
            (accountInfo) => accountInfo.index === walletIndex
        ) ?? _accountInfos[0];
    const draftAccountInfos = useRef<AccountInfo[]>(_accountInfos);

    const name = useWalletName(currentAccountInfo);
    const [draftName, setDraftName] = useState<string>(name);

    const [draftColor, setDraftColor] = useState<string>(
        currentAccountInfo.color || getNextWalletColor(0)
    );

    const [draftEmoji, setDraftEmoji] = useState<string | undefined>(
        currentAccountInfo.emoji
    );

    const keypairVault = thunkExtras.keypairVault;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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

    const getAccountInfos = useCallback(async () => {
        if (authentication) return;

        if (draftAccountInfos.current.length === 0) {
            draftAccountInfos.current = [
                {
                    index: 0,
                    address: keypairVault.getAddress(0) || '',
                },
            ];
        }
    }, [authentication, keypairVault]);

    const handleSaveCustomization = useCallback(
        async (
            _address: string,
            _accountInfos: AccountInfo[],
            accountIndex: number
        ) => {
            const jwt = await getCachedJwt(_address, accountIndex);
            try {
                await saveCustomizations(jwt, _accountInfos[accountIndex]);
            } catch (error) {
                console.error('Failed saving customizations to server:', error);
            }
        },
        [getCachedJwt]
    );

    const _saveAccountInfos = useCallback(async () => {
        setLoading(true);
        if (authentication) {
            await Authentication.updateAccountInfos(draftAccountInfos.current);
            await dispatch(setAccountInfos(draftAccountInfos.current));
            await Authentication.getAccountInfos(true);
        } else {
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            getAccountInfos();
        }

        setLoading(false);
        setIsWalletEditing(true);
        navigate(-1);
    }, [
        authentication,
        dispatch,
        getAccountInfos,
        navigate,
        setIsWalletEditing,
    ]);

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
                    if (accountInfo.index === currentAccountInfo.index) {
                        return {
                            ...accountInfo,
                            name: name || accountInfo.name,
                            color: color || accountInfo.color,
                            emoji: emoji || accountInfo.emoji,
                        };
                    } else {
                        return accountInfo;
                    }
                }
            );
        },
        [currentAccountInfo.index]
    );

    const onClickDone = useCallback(async () => {
        await _saveAccountInfos();
        if (featureFlags.showWipFeatures) {
            await handleSaveCustomization(
                currentAccountInfo.address,
                draftAccountInfos.current,
                walletIndex
            );
        }
    }, [
        _saveAccountInfos,
        currentAccountInfo.address,
        featureFlags.showWipFeatures,
        handleSaveCustomization,
        walletIndex,
    ]);

    const _handleNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newName = e.target.value;
            setDraftName(newName);
            _handleChange({ name: newName });
        },
        [_handleChange]
    );

    const _handleColorChange = useCallback(
        (colorResult: string) => {
            const color = colorResult;
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

    return (
        <>
            <BasicSectionHeader text="Edit Wallet"></BasicSectionHeader>
            <div className="flex flex-col">
                <Input value={draftName} onChange={_handleNameChange} />
                <div className="flex justify-between items-center px-6 pb-6 ">
                    <BodyLarge isSemibold>Choose a Color</BodyLarge>
                    <div className="p-1 rounded-md border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                        <div
                            data-testid="color-picker"
                            className="w-12 h-12 rounded-sm cursor-pointer"
                            style={{ backgroundColor: draftColor }}
                            onClick={openColorPickerMenu}
                        />
                    </div>
                </div>
                <div className="relative -mt-4 mx-6">
                    <ColorPickerMenu
                        isOpen={isColorPickerMenuOpen}
                        selectedColor={draftColor}
                        setSelectedColor={_handleColorChange}
                        closeColorPickerMenu={closeColorPickerMenu}
                        leftAbsoluteClassNames="-left-[6px] -top-[20px]"
                    />
                </div>
                <div className="flex justify-between items-center px-6 pb-6">
                    <BodyLarge isSemibold>Choose an Emoji</BodyLarge>
                    <div
                        data-testid="emoji-picker"
                        className="p-1 rounded-md cursor-pointer border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke"
                        onClick={openEmojiPickerMenu}
                    >
                        <div className="flex w-12 h-12 rounded-sm place-content-center items-center">
                            <EmojiDisplay emoji={draftEmoji} sizeInPx={48} />
                        </div>
                    </div>
                </div>
                <div className="absolute left-1">
                    <EmojiPickerMenu
                        isOpen={isEmojiPickerMenuOpen}
                        setSelectedEmoji={_handleEmojiChange}
                        closeEmojiPickerMenu={closeEmojiPickerMenu}
                    />
                </div>
                <div className="relative mx-6"></div>
                <Button buttonStyle="primary" onClick={onClickDone}>
                    <Loading loading={loading}>Done</Loading>
                </Button>
            </div>
        </>
    );
};

export default EditWallet;
