import { isValidSuiAddress } from '@mysten/sui.js';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import ContactForm from './ContactForm';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';

import type { FormikValues } from 'formik';

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

const Add: React.FC = () => {
    const navigate = useNavigate();
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
                address: '',
                name: '',
                termsOfService: false,
            }}
            validationSchema={Yup.object({
                address: addressValidation,
                name: nameValidation,
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
                />
            </Form>
        </Formik>
    );
};

export default Add;
