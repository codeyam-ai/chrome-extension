import { Formik, Form, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import Button from '../buttons/Button';
import Input from '../inputs/Input';

import type { FormikValues } from 'formik';
import Checkbox from '../inputs/Checkbox';
import { BASE_URL } from '_src/shared/constants';

type CreatePasswordFormProps = {
    onSubmit: (passphrase: string) => void;
};

const CustomFormikForm = () => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [checked, setChecked] = useState(false);
    const [field, meta] = useField('password');
    const [confirmField, confirmMeta] = useField('confirmPassword');

    return (
        <>
            <Input
                {...field}
                placeholder="Enter your password"
                id="password"
                data-testid="password"
                name="password"
                type="password"
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
                className="!px-6 sm:!px-10"
                forceLightTheme
                autoFocus
            />

            <Input
                {...confirmField}
                placeholder="Re-enter your password"
                id="confirmPassword"
                data-testid="confirmPassword"
                name="confirmPassword"
                type="password"
                required={true}
                errorText={
                    confirmMeta.touched && confirmMeta.error
                        ? confirmMeta.error
                        : undefined
                }
                className="!px-6 sm:!px-10 !pb-[128px]"
                forceLightTheme
            />

            <Checkbox
                className="px-6"
                data-testid="terms-of-service"
                label={
                    <div>
                        I agree to the{' '}
                        <a
                            target={'_blank'}
                            href={`${BASE_URL}/terms-of-service`}
                            className={'text-ethos-light-primary-light'}
                        >
                            Terms of Service.
                        </a>
                    </div>
                }
                id="terms-of-service"
                name="termsOfService"
                onChange={() => setChecked(!checked)}
                checked={checked}
            />

            <div className="px-6 sm:px-10 pb-6 sm:pb-10">
                <Button
                    buttonStyle="primary"
                    type="submit"
                    data-testid="submit"
                    disabled={
                        !meta.value ||
                        !!meta.error ||
                        !confirmMeta.value ||
                        !!confirmMeta.error ||
                        !checked
                    }
                    removeContainerPadding
                >
                    Continue
                </Button>
            </div>
        </>
    );
};

const CreatePasswordForm = ({ onSubmit }: CreatePasswordFormProps) => {
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
                    termsOfService: false,
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

export default CreatePasswordForm;
