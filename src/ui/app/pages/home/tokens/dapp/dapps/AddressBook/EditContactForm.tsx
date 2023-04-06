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
import Title from '_src/ui/app/shared/typography/Title';

import type { Contact } from './AddContactForm';
import type { FormikValues } from 'formik';

type EditContactFormProps = {
    onSubmit: (contact: Contact) => void;
    contact: Contact;
};

interface CustomFormikFormProps {
    name: string;
    address: SuiAddress;
    emoji?: string;
    setEmoji: React.Dispatch<React.SetStateAction<string | undefined>>;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

const CustomFormikForm = ({
    name,
    address,
    emoji,
    setEmoji,
    color,
    setColor,
}: CustomFormikFormProps) => {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
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
            <Title className="pb-6">Edit</Title>
            <div className="flex flex-col px-6 pb-6">
                <BodyLarge isSemibold className="mb-2 text-left">
                    Address
                </BodyLarge>
                <BodyLarge isTextColorMedium className="w-full break-words">
                    {address}
                </BodyLarge>
            </div>

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
                disabled={!nameMeta.value || !!nameMeta.error}
            >
                Continue
            </Button>
        </div>
    );
};

const nameValidation = Yup.string().required('Enter a name');

const EditContactForm = ({ onSubmit, contact }: EditContactFormProps) => {
    const [draftEmoji, setDraftEmoji] = useState<string | undefined>(
        contact.emoji
    );
    const [draftColor, setDraftColor] = useState<string>(contact.color);

    const _onSubmit = useCallback(
        ({ address, name }: FormikValues) => {
            onSubmit({ address, name, emoji: draftEmoji, color: draftColor });
        },
        [onSubmit, draftEmoji, draftColor]
    );

    return (
        <div>
            <Formik
                initialValues={{
                    name: contact.name,
                    termsOfService: false,
                }}
                validationSchema={Yup.object({
                    name: nameValidation,
                })}
                onSubmit={_onSubmit}
            >
                <Form>
                    <CustomFormikForm
                        name={contact.name}
                        address={contact.address}
                        emoji={draftEmoji}
                        setEmoji={setDraftEmoji}
                        color={draftColor}
                        setColor={setDraftColor}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default EditContactForm;
