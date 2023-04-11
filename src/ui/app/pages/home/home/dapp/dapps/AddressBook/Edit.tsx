import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import ContactForm from './ContactForm';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';

import type { FormikValues } from 'formik';

const nameValidation = Yup.string().required('Enter a name');

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const { editContact } = useUpdateContacts();
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
        ({ name }: FormikValues) => {
            if (!contact?.address) {
                return;
            }
            editContact(contact.address, {
                color: draftColor,
                emoji: draftEmoji,
                name,
            });
            navigate(-1);
        },
        [contact?.address, editContact, draftColor, draftEmoji, navigate]
    );

    if (!contact) {
        return <div>Not found</div>;
    }

    return (
        <Formik
            initialValues={{
                name: contact.name,
                termsOfService: false,
            }}
            validationSchema={Yup.object({
                name: nameValidation,
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
