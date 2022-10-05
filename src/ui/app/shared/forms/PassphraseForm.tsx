import { Formik, Form, useField } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import Button, { ButtonStyle } from '../buttons/Button';
import Input from '../inputs/Input';

import type { FormikValues } from 'formik';

type PassphraseFormProps = {
    onSubmit: (passphrase: string) => void;
};

const CustomFormikForm = () => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('passphrase');
    const [confirmField, confirmMeta] = useField('confirmPassphrase');
    return (
        <>
            <Input
                {...field}
                label="Passphrase"
                id="passphrase"
                name="passphrase"
                type="password"
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
                className="!pb-2"
            />
            <Input
                {...confirmField}
                label="Confirm passphrase"
                id="confirmPassphrase"
                name="confirmPassphrase"
                type="password"
                required={true}
                errorText={
                    confirmMeta.touched && confirmMeta.error
                        ? confirmMeta.error
                        : undefined
                }
            />

            <Button
                buttonStyle={ButtonStyle.PRIMARY}
                type="submit"
                disabled={
                    !meta.value ||
                    !confirmMeta.value ||
                    meta.error ||
                    confirmMeta.error
                        ? true
                        : false
                }
            >
                Save
            </Button>
        </>
    );
};

const PassphraseForm = ({ onSubmit }: PassphraseFormProps) => {
    const _onSubmit = useCallback(
        ({ passphrase }: FormikValues) => {
            onSubmit(passphrase);
        },
        [onSubmit]
    );
    return (
        <div>
            <Formik
                initialValues={{
                    passphrase: '',
                    confirmPassphrase: '',
                }}
                validationSchema={Yup.object({
                    passphrase: Yup.string().required('Enter a passphrase'),
                    confirmPassphrase: Yup.string()
                        .required('Confirm your passphrase')
                        .oneOf(
                            [Yup.ref('passphrase'), null],
                            'Passphrases must match'
                        ),
                })}
                onSubmit={_onSubmit}
            >
                <Form>
                    <CustomFormikForm />
                </Form>
            </Formik>
        </div>
    );
};

export default PassphraseForm;
