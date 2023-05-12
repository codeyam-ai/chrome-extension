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
import BodyLarge from '../../typography/BodyLarge';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

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
            <div className="sm:!px-10 pb-12">
                <div className="flex flex-col gap-2 items-center place-content-center pb-4">
                    <CheckCircleIcon className="w-6 h-6 text-ethos-light-green dark:text-ethos-dark-green" />
                    <BodyLarge className="px-6 pb-4">
                        Your recovery phrase has been verified
                    </BodyLarge>
                </div>

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
                    className="!px-0"
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
                    className="!px-0"
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
