import { Formik, Form, useField } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import Button from '../buttons/Button';
import Input from '../inputs/Input';

import type { FormikValues } from 'formik';

type PassphraseFormProps = {
    onSubmit: (passphrase: string) => void;
};

const CustomFormikForm = () => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('password');
    const [confirmField, confirmMeta] = useField('confirmPassword');
    return (
        <>
            <Input
                {...field}
                label="Password"
                id="password"
                name="password"
                type="password"
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
            />
            <Input
                {...confirmField}
                label="Confirm password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={true}
                errorText={
                    confirmMeta.touched && confirmMeta.error
                        ? confirmMeta.error
                        : undefined
                }
            />

            <Button
                buttonStyle="primary"
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
        ({ password }: FormikValues) => {
            onSubmit(password);
        },
        [onSubmit]
    );
    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object({
                    password: Yup.string().required('Enter a password'),
                    confirmPassword: Yup.string()
                        .required('Confirm your password')
                        .oneOf(
                            [Yup.ref('password'), null],
                            'Passwords must match'
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
