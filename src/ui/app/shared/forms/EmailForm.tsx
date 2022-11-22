import { Formik, Form, useField } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import LoadingIndicator from '../../components/loading/LoadingIndicator';
import Button from '../buttons/Button';
import Input from '../inputs/Input';

import type { FormikValues } from 'formik';

type EmailFormProps = {
    onSubmit: (email: string) => void;
    loading: boolean;
};

const CustomFormikForm = ({ loading }: { loading: boolean }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('email');
    return (
        <>
            <Input
                {...field}
                label="Email address"
                id="email"
                name="email"
                type="email"
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
            />

            {loading ? (
                <div className="flex justify-center items-center p-6 text-xl">
                    <LoadingIndicator />
                </div>
            ) : (
                <Button
                    buttonStyle="primary"
                    type="submit"
                    disabled={!meta.value || meta.error ? true : false}
                >
                    Sign in
                </Button>
            )}
        </>
    );
};

const EmailForm = ({ onSubmit, loading }: EmailFormProps) => {
    const _onSubmit = useCallback(
        ({ email }: FormikValues) => {
            onSubmit(email);
        },
        [onSubmit]
    );
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                })}
                onSubmit={_onSubmit}
            >
                <Form>
                    <CustomFormikForm loading={loading} />
                </Form>
            </Formik>
        </div>
    );
};

export default EmailForm;
