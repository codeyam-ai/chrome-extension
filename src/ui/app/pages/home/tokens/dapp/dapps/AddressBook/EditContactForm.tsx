import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import ContactForm from './ContactForm';

import type { Contact } from './AddContactForm';
import type { FormikValues } from 'formik';

type EditContactFormProps = {
    onSubmit: (contact: Contact) => void;
    contact: Contact;
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
        </div>
    );
};

export default EditContactForm;
