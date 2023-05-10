import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import ContactForm, { addressValidation, nameValidation } from './ContactForm';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';

import type { FormikValues } from 'formik';

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const { editContact, removeContact, addContact } = useUpdateContacts();
    const { address } = useParams();
    const contact = useAppSelector(({ contacts }) =>
        contacts.contacts.find((contact) => contact.address === address)
    );
    const [draftEmoji, setDraftEmoji] = useState<string | undefined>(
        contact?.emoji
    );
    const [draftColor, setDraftColor] = useState<string>(
        contact?.color || getNextWalletColor(0)
    );

    const onSubmit = useCallback(
        async ({ name, address: newAddress }: FormikValues) => {
            if (!contact?.address) {
                return;
            }

            if (contact.address !== newAddress) {
                // Remove the contact with the old address
                const updatedContacts = await removeContact(contact.address);

                // Add a new contact with the updated information
                await addContact(
                    {
                        address: newAddress,
                        color: draftColor,
                        emoji: draftEmoji,
                        name,
                    },
                    updatedContacts
                );
                // Replacing the route allows the back button go back to the address book
                navigate(`/home/address-book`, {
                    replace: true,
                });
                navigate(`/home/address-book/contact/${newAddress}`);
            } else {
                // Update the existing contact if the address hasn't changed
                await editContact(contact.address, {
                    color: draftColor,
                    emoji: draftEmoji,
                    name,
                });
                navigate(-1);
            }
        },
        [
            contact?.address,
            addContact,
            removeContact,
            editContact,
            draftColor,
            draftEmoji,
            navigate,
        ]
    );

    if (!contact) {
        return <div>Not found</div>;
    }

    return (
        <Formik
            initialValues={{
                name: contact.name,
                address: contact.address,
                termsOfService: false,
            }}
            validationSchema={Yup.object({
                name: nameValidation,
                address: addressValidation,
            })}
            onSubmit={onSubmit}
        >
            <Form>
                <ContactForm
                    formMode="Edit"
                    name={contact.name}
                    address={contact.address}
                    emoji={draftEmoji}
                    setEmoji={setDraftEmoji}
                    color={draftColor}
                    setColor={setDraftColor}
                />
            </Form>
        </Formik>
    );
};

export default Edit;
