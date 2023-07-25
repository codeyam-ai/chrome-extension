import { isValidSuiAddress } from '@mysten/sui.js';
import { useField } from 'formik';
import { useState, useCallback } from 'react';
import * as Yup from 'yup';

import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';
import ColorPickerMenu from '_src/ui/app/shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu from '_src/ui/app/shared/inputs/emojis/EmojiPickerMenu';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { SuiAddress } from '@mysten/sui.js';

export const addressValidation = Yup.string()
    .ensure()
    .required('Enter an address')
    .test({
        name: 'address-validity',
        test: (address: string) => {
            return isValidSuiAddress(address);
        },
        message: 'That address is not valid',
    });

export const nameValidation = Yup.string().required('Enter a name');

interface ContactFormProps {
    name?: string;
    address?: SuiAddress;
    emoji?: string;
    setEmoji: React.Dispatch<React.SetStateAction<string | undefined>>;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    formMode: 'Add' | 'Edit';
    disableAddressInput?: boolean;
}

const ContactForm = ({
    address,
    name,
    emoji,
    setEmoji,
    color,
    setColor,
    formMode,
    disableAddressInput,
}: ContactFormProps) => {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [addressField, addressMeta] = useField('address');
    const [nameField, nameMeta] = useField('name');

    const handleEmojiChange = useCallback(
        (emoji: string) => {
            setEmoji(emoji);
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
        <div className="relative flex flex-col place-content-center pt-6">
            <Input
                {...nameField}
                autoFocus
                label="Your Contact's Name"
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
                disabled={disableAddressInput}
            />

            <div className="flex flex-row justify-center mb-8">
                <div className="relative flex flex-col justify-center items-center m-1 ">
                    <BodyLarge isSemibold className="mb-2">
                        Choose a Color
                    </BodyLarge>
                    <div
                        onClick={openColorPickerMenu}
                        className="bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-lg px-14 py-6 cursor-pointer"
                    >
                        <div
                            className="w-10 h-10 mx-auto rounded-full outline outline-offset-4 outline-ethos-light-text-stroke dark:outline-ethos-dark-text-stroke"
                            style={{ backgroundColor: color }}
                        />
                    </div>
                    <ColorPickerMenu
                        isOpen={isColorPickerMenuOpen}
                        selectedColor={color}
                        setSelectedColor={_handleColorChange}
                        closeColorPickerMenu={closeColorPickerMenu}
                        leftAbsoluteClassNames="-left-[6px] -top-[20px]"
                    />
                </div>
                <div className="m-1">
                    <BodyLarge isSemibold className="mb-2">
                        Choose an Emoji
                    </BodyLarge>
                    <div
                        data-testid="emoji-picker"
                        // className="px-14 py-6 rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke place-content-center items-center cursor-pointer"
                        className="bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-lg px-12 py-5 cursor-pointer"
                        onClick={openEmojiPickerMenu}
                    >
                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                            <EmojiDisplay emoji={emoji} sizeInPx={28} />
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 z-50">
                        <EmojiPickerMenu
                            isOpen={emojiPickerOpen}
                            setSelectedEmoji={handleEmojiChange}
                            closeEmojiPickerMenu={closeEmojiPickerMenu}
                        />
                    </div>
                </div>
            </div>

            <Button
                buttonStyle="primary"
                type="submit"
                data-testid="submit"
                disabled={
                    !addressMeta.value ||
                    !!addressMeta.error ||
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
