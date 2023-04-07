import { type SuiAddress, isValidSuiAddress } from '@mysten/sui.js';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import ContactForm from './ContactForm';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';

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
                    <ContactForm
                        emoji={emoji}
                        setEmoji={setEmoji}
                        color={color}
                        setColor={setColor}
                        formMode="Add"
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default AddContactForm;
