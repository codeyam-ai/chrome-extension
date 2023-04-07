import { useField } from 'formik';
import { useState, useCallback } from 'react';

import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';
import ColorPickerMenu from '_src/ui/app/shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu from '_src/ui/app/shared/inputs/emojis/EmojiPickerMenu';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { SuiAddress } from '@mysten/sui.js';
import type { EmojiPickerResult } from '_src/ui/app/shared/inputs/emojis/EmojiPickerMenu';

interface ContactFormProps {
    name?: string;
    address?: SuiAddress;
    emoji?: string;
    setEmoji: React.Dispatch<React.SetStateAction<string | undefined>>;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    formMode: 'Add' | 'Edit';
}

const ContactForm = ({
    address,
    name,
    emoji,
    setEmoji,
    color,
    setColor,
    formMode,
}: ContactFormProps) => {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [addressField, addressMeta] = useField('address');
    const [nameField, nameMeta] = useField('name');

    const handleEmojiChange = useCallback(
        (emojiPickerResult: EmojiPickerResult) => {
            setEmoji(emojiPickerResult.shortcodes);
            setEmojiPickerOpen(false);
        },
        [setEmoji]
    );

    const openEmojiPickerMenu = useCallback(() => {
        setEmojiPickerOpen(true);
    }, []);

    const closeEmojiPickerMenu = useCallback(() => {
        setEmojiPickerOpen(false);
    }, []);

    const openColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(true);
    }, []);

    const closeColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(false);
    }, []);

    const _handleColorChange = useCallback(
        (color: string) => {
            setColor(color);
            setIsColorPickerMenuOpen(false);
        },
        [setColor]
    );

    return (
        <div className="flex flex-col place-content-center pt-6">
            <Title className="pb-6">{formMode}</Title>

            <Input
                autoFocus
                label="Name"
                {...nameField}
                placeholder="Type a name"
                id="name"
                data-testid="name"
                name="name"
                type="text"
                required={true}
                errorText={
                    nameMeta.touched && nameMeta.error
                        ? nameMeta.error
                        : undefined
                }
            />

            {formMode === 'Add' ? (
                <Input
                    {...addressField}
                    label="Address"
                    placeholder="Paste or type an address"
                    id="address"
                    data-testid="address"
                    name="address"
                    type="text"
                    required={true}
                    errorText={
                        addressMeta.touched && addressMeta.error
                            ? addressMeta.error
                            : undefined
                    }
                    autoComplete="off"
                />
            ) : (
                <div className="flex flex-col px-6 pb-6">
                    <BodyLarge isSemibold className="mb-2 text-left">
                        Address
                    </BodyLarge>
                    <BodyLarge isTextColorMedium className="w-full break-words">
                        {address}
                    </BodyLarge>
                </div>
            )}

            <div className="flex flex-row">
                <div className="relative">
                    <BodyLarge isSemibold className="mb-2">
                        Choose an Emoji
                    </BodyLarge>
                    <div
                        data-testid="emoji-picker"
                        className="flex h-20 w-20 px-6 mx-auto mb-6 rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke place-content-center items-center cursor-pointer"
                        onClick={openEmojiPickerMenu}
                    >
                        <EmojiDisplay emoji={emoji} sizeInPx={32} />
                    </div>
                    <div className="absolute top-0 z-50">
                        <EmojiPickerMenu
                            isOpen={emojiPickerOpen}
                            setSelectedEmoji={handleEmojiChange}
                            closeEmojiPickerMenu={closeEmojiPickerMenu}
                        />
                    </div>
                </div>

                <BodyLarge isSemibold className="mb-2">
                    Choose a Color
                </BodyLarge>
                <div
                    className="w-20 h-20 mx-auto mb-6 rounded-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={openColorPickerMenu}
                />
                <ColorPickerMenu
                    isOpen={isColorPickerMenuOpen}
                    selectedColor={color}
                    setSelectedColor={_handleColorChange}
                    closeColorPickerMenu={closeColorPickerMenu}
                />
            </div>

            <Button
                buttonStyle="primary"
                type="submit"
                data-testid="submit"
                disabled={
                    (formMode === 'Add' && !addressMeta.value) ||
                    (formMode === 'Add' && !!addressMeta.error) ||
                    !nameMeta.value ||
                    !!nameMeta.error
                }
            >
                Continue
            </Button>
        </div>
    );
};

export default ContactForm;
