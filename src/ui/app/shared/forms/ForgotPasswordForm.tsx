import { Formik, Form, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import Button from '../buttons/Button';
import HideShowToggle from '../buttons/HideShowToggle';
import Input from '../inputs/Input';

import type { FormikValues } from 'formik';
import Body from '../typography/Body';
import EthosLink from '../typography/EthosLink';

type PassphraseFormProps = {
    onSubmit: (passphrase: string) => void;
    isPasswordIncorrect?: boolean;
};

const CustomFormikForm = ({
    isPasswordIncorrect = false,
}: {
    isPasswordIncorrect: boolean;
}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('mnemonic');
    const [passwordMode, setPasswordMode] = useState(true);

    const togglePasswordMode = useCallback(() => {
        setPasswordMode((prev) => !prev);
    }, []);

    return (
        <div className="flex flex-col h-full justify-between">
            FORGOT PASSWORD
            <Input
                {...field}
                label="Seed Phrase"
                id="mnemonic"
                data-testid="mnemonic"
                name="mnemonic"
                type={passwordMode ? 'password' : 'text'}
                required={true}
                autoFocus
                errorText={
                    isPasswordIncorrect
                        ? 'Seed Phrase is incorrect'
                        : meta.touched && meta.error
                        ? meta.error
                        : undefined
                }
            />
            <div className={'mb-6'}>
                <HideShowToggle
                    name="Seed Phrase"
                    hide={passwordMode}
                    onToggle={togglePasswordMode}
                />
            </div>
            <Button
                buttonStyle="primary"
                data-testid="submit"
                type="submit"
                disabled={!meta.value || !!meta.error}
            >
                Reset Password
            </Button>
        </div>
    );
};

const ForgotPasswordForm = ({
    onSubmit,
    isPasswordIncorrect = false,
}: PassphraseFormProps) => {
    const _onSubmit = useCallback(
        ({ mnemonic }: FormikValues) => {
            onSubmit(mnemonic);
        },
        [onSubmit]
    );
    return (
        <div className="h-full">
            <Formik
                initialValues={{
                    mnemonic: '',
                }}
                validationSchema={Yup.object({
                    mnemonic: Yup.string().required('Enter your seed phrase'),
                })}
                onSubmit={_onSubmit}
            >
                <Form className="h-full">
                    <CustomFormikForm
                        isPasswordIncorrect={isPasswordIncorrect}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default ForgotPasswordForm;
