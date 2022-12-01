import { Formik, Form, useField } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';

import type { FormikValues } from 'formik';

type ChangePassphraseFormProps = {
    onSubmit: (currentPassword: string, newPassword: string) => void;
    isPasswordIncorrect?: boolean;
};

const CustomFormikForm = ({
    isPasswordIncorrect = false,
}: {
    isPasswordIncorrect: boolean;
}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [currentPasswordField, currentPasswordMeta] =
        useField('currentPassword');
    const [newPasswordField, newPasswordMeta] = useField('newPassword');
    const [confirmField, confirmMeta] = useField('confirmNewPassword');
    return (
        <>
            <Input
                {...currentPasswordField}
                label="Current Password"
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                required={true}
                errorText={
                    isPasswordIncorrect
                        ? 'Password is incorrect'
                        : currentPasswordMeta.touched &&
                          currentPasswordMeta.error
                        ? currentPasswordMeta.error
                        : undefined
                }
            />
            <Input
                {...newPasswordField}
                label="New Password"
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                required={true}
                errorText={
                    newPasswordMeta.touched && newPasswordMeta.error
                        ? newPasswordMeta.error
                        : undefined
                }
            />
            <Input
                {...confirmField}
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                placeholder="Re-enter your new password"
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
                    !newPasswordMeta.value ||
                    !confirmMeta.value ||
                    newPasswordMeta.error ||
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

const ChangePasswordForm = ({
    onSubmit,
    isPasswordIncorrect = false,
}: ChangePassphraseFormProps) => {
    const _onSubmit = useCallback(
        ({ currentPassword, newPassword }: FormikValues) => {
            onSubmit(currentPassword, newPassword);
        },
        [onSubmit]
    );
    return (
        <div>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }}
                validationSchema={Yup.object({
                    currentPassword: Yup.string().required(
                        'Enter your current password'
                    ),
                    newPassword: Yup.string().required('Enter a new password'),
                    confirmNewPassword: Yup.string()
                        .required('Confirm your new password')
                        .oneOf(
                            [Yup.ref('newPassword'), null],
                            'Passwords must match'
                        ),
                })}
                onSubmit={_onSubmit}
            >
                <Form>
                    <CustomFormikForm
                        isPasswordIncorrect={isPasswordIncorrect}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default ChangePasswordForm;
