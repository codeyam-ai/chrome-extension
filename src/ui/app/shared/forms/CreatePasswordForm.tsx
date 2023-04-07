import { Formik, Form, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

import Button from '../buttons/Button';
import HideShowToggle from '../buttons/HideShowToggle';
import Checkbox from '../inputs/Checkbox';
import Input from '../inputs/Input';
import { BASE_URL } from '_src/shared/constants';

import type { FormikValues } from 'formik';
import { passwordComplexityValidation } from '_app/shared/forms/validation-utils';

type CreatePasswordFormProps = {
    onSubmit: (passphrase: string) => void;
};

const CustomFormikForm = () => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [checked, setChecked] = useState(false);
    const [field, meta] = useField('password');
    const [confirmField, confirmMeta] = useField('confirmPassword');
    const [passwordMode, setPasswordMode] = useState(true);

    const isChecked = useCallback(() => {
        setChecked(!checked);
    }, [checked]);

    const togglePasswordMode = useCallback(() => {
        setPasswordMode((prev) => !prev);
    }, []);

    return (
        <>
            <div className="!px-6 sm:!px-10 pb-12">
                <Input
                    {...field}
                    placeholder="Enter your password"
                    id="password"
                    data-testid="password"
                    name="password"
                    type={passwordMode ? 'password' : 'text'}
                    required={true}
                    errorText={
                        meta.touched && meta.error ? meta.error : undefined
                    }
                    forceLightTheme
                    autoFocus
                />

                <Input
                    {...confirmField}
                    placeholder="Re-enter your password"
                    id="confirmPassword"
                    data-testid="confirmPassword"
                    name="confirmPassword"
                    type={passwordMode ? 'password' : 'text'}
                    required={true}
                    errorText={
                        confirmMeta.touched && confirmMeta.error
                            ? confirmMeta.error
                            : undefined
                    }
                    forceLightTheme
                />
                <HideShowToggle
                    name="Password"
                    hide={passwordMode}
                    onToggle={togglePasswordMode}
                />
            </div>

            <Checkbox
                className="px-6"
                style={{ outline: '1px solid rgb(109 40 217)' }}
                data-testid="terms-of-service"
                label={
                    <div>
                        I agree to the{' '}
                        <a
                            target={'_blank'}
                            href={`${BASE_URL}/terms-of-service`}
                            className={'text-ethos-light-primary-light'}
                            rel="noreferrer"
                        >
                            Terms of Service.
                        </a>
                    </div>
                }
                id="terms-of-service"
                name="termsOfService"
                onChange={isChecked}
                checked={checked}
                forceLightMode
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

const passwordValidation = Yup.string()
    .ensure()
    .required('Enter a password')
    .test({
        name: 'password-strength',
        test: (password: string) => {
            return zxcvbn(password).score > 2;
        },
        message: ({ value }) => {
            const {
                feedback: { warning, suggestions },
            } = zxcvbn(value);
            const warn =
                (warning && `${warning}.`) || 'Password is not strong enough.';
            return `${warn} ${suggestions.join(' ')}`;
        },
    });

const passwordsMustMatch = Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match');

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
                    password: passwordComplexityValidation('Enter a password'),
                    confirmPassword: passwordsMustMatch,
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
