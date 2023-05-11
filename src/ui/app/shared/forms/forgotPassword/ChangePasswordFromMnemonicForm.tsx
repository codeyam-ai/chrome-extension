import { Formik, Form, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import { passwordComplexityValidation } from '_app/shared/forms/validation-utils';
import { BASE_URL } from '_src/shared/constants';

import type { FormikValues } from 'formik';
import Button from '../../buttons/Button';
import HideShowToggle from '../../buttons/HideShowToggle';
import Checkbox from '../../inputs/Checkbox';
import Input from '../../inputs/Input';

type CreatePasswordFormProps = {
    onSubmit: (passphrase: string) => void;
};

const CustomFormikForm = () => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('password');
    const [confirmField, confirmMeta] = useField('confirmPassword');
    const [passwordMode, setPasswordMode] = useState(true);

    const togglePasswordMode = useCallback(() => {
        setPasswordMode((prev) => !prev);
    }, []);

    return (
        <>
            <div className="!px-6 sm:!px-10 pb-12">
                <Input
                    {...field}
                    placeholder="Enter a new password"
                    id="password"
                    data-testid="password"
                    name="password"
                    type={passwordMode ? 'password' : 'text'}
                    required={true}
                    errorText={
                        meta.touched && meta.error ? meta.error : undefined
                    }
                    autoFocus
                />

                <Input
                    {...confirmField}
                    placeholder="Re-enter password"
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
                />
                <HideShowToggle
                    name="Password"
                    hide={passwordMode}
                    onToggle={togglePasswordMode}
                />
            </div>

            <div className="px-6 sm:px-10 pb-6 sm:pb-10">
                <Button
                    buttonStyle="primary"
                    type="submit"
                    data-testid="submit"
                    disabled={
                        !meta.value ||
                        !!meta.error ||
                        !confirmMeta.value ||
                        !!confirmMeta.error
                    }
                    removeContainerPadding
                >
                    Continue
                </Button>
            </div>
        </>
    );
};

const passwordsMustMatch = Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match');

const ChangePasswordFromMnemonicForm = ({
    onSubmit,
}: CreatePasswordFormProps) => {
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

export default ChangePasswordFromMnemonicForm;
