import { type SuiAddress, isValidSuiAddress } from '@mysten/sui.js';
import { Form, Formik, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';
import ColorPickerMenu from '_src/ui/app/shared/inputs/colors/ColorPickerMenu';
import EmojiPickerMenu, {
    type EmojiPickerResult,
} from '_src/ui/app/shared/inputs/emojis/EmojiPickerMenu';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { FormikValues } from 'formik';

export interface Contact {
    address: SuiAddress;
    name: string;
    emoji?: string;
    color: string;
}

type AddContactFormProps = {
    onSubmit: (contact: Contact) => void;
};

interface CustomFormikFormProps {
    emoji?: string;
    setEmoji: React.Dispatch<React.SetStateAction<string | undefined>>;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

const CustomFormikForm = ({
    emoji,
    setEmoji,
    color,
    setColor,
}: CustomFormikFormProps) => {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('address');
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
            <Input
                {...field}
                label="Address"
                placeholder="Paste or type an address"
                id="address"
                data-testid="address"
                name="address"
                type="text"
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
                autoFocus
                autoComplete="off"
            />

            <Input
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

            <div className="relative">
                <BodyLarge isSemibold className="mb-2">
                    Emoji
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
                Color
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

            <Button
                buttonStyle="primary"
                type="submit"
                data-testid="submit"
                disabled={
                    !meta.value ||
                    !!meta.error ||
                    !nameMeta.value ||
                    !!nameMeta.error
                }
            >
                Continue
            </Button>
        </div>
    );
};

const addressValidation = Yup.string()
    .ensure()
    .required('Enter an address')
    .test({
        name: 'address-validity',
        test: (address: string) => {
            return isValidSuiAddress(address);
        },
        message: 'That address is not valid',
    });

const nameValidation = Yup.string().required('Enter a name');

const AddContactForm = ({ onSubmit }: AddContactFormProps) => {
    const [emoji, setEmoji] = useState<string | undefined>(undefined);
    const [color, setColor] = useState<string>(getNextWalletColor(0));

    const _onSubmit = useCallback(
        ({ address, name }: FormikValues) => {
            onSubmit({ address, name, emoji, color: color });
        },
        [onSubmit, emoji, color]
    );

    return (
        <div>
            <Formik
                initialValues={{
                    address: '',
                    name: '',
                    termsOfService: false,
                }}
                validationSchema={Yup.object({
                    address: addressValidation,
                    name: nameValidation,
                })}
                onSubmit={_onSubmit}
            >
                <Form>
                    <CustomFormikForm
                        emoji={emoji}
                        setEmoji={setEmoji}
                        color={color}
                        setColor={setColor}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default AddContactForm;
