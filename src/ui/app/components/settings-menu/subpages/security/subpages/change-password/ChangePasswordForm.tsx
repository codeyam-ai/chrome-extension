import { Formik, Form, useField } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import type { FormikValues } from 'formik';
import Input from '_src/ui/app/shared/inputs/Input';
import Button from '_src/ui/app/shared/buttons/Button';

type ChangePassphraseFormProps = {
    onSubmit: (passphrase: string) => void;
};

const CustomFormikForm = () => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [existingPasswordField, existingPasswordMeta] =
        useField('existingPassword');
    const [newPasswordField, newPasswordMeta] = useField('newPassword');
    const [confirmField, confirmMeta] = useField('confirmNewPassword');
    return (
        <>
            <Input
                {...existingPasswordField}
                label="Current Password"
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                required={true}
                errorText={
                    existingPasswordMeta.touched && existingPasswordMeta.error
                        ? existingPasswordMeta.error
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

const ChangePasswordForm = ({ onSubmit }: ChangePassphraseFormProps) => {
    const _onSubmit = useCallback(
        ({ newPassword }: FormikValues) => {
            onSubmit(newPassword);
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
                    <CustomFormikForm />
                </Form>
            </Formik>
        </div>
    );
};

export default ChangePasswordForm;
