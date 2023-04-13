import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

import ContactForm, { addressValidation, nameValidation } from './ContactForm';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';

import type { FormikValues } from 'formik';

const Add: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { addContact } = useUpdateContacts();
    const [emoji, setEmoji] = useState<string | undefined>(undefined);
    const [color, setColor] = useState<string>(getNextWalletColor(0));

    const onSubmit = useCallback(
        ({ address, name }: FormikValues) => {
            addContact({ address, name, emoji, color: color });
            navigate(-1);
        },
        [addContact, emoji, color, navigate]
    );

    return (
        <Formik
            initialValues={{
                address: searchParams.has('newContactAddress')
                    ? searchParams.get('newContactAddress')
                    : '',
                name: '',
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
                    emoji={emoji}
                    setEmoji={setEmoji}
                    color={color}
                    setColor={setColor}
                    formMode="Add"
                    disableAddressInput={searchParams.has('newContactAddress')}
                />
            </Form>
        </Formik>
    );
};

export default Add;
