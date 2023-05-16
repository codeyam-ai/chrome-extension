import { Form, Formik, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';

import type { FormikValues } from 'formik';

type PasswordVerificationFormProps = {
    onSubmit: (password: string) => void;
    isPasswordIncorrect?: boolean;
};

const CustomFormikForm = ({
    isPasswordIncorrect = false,
}: {
    isPasswordIncorrect: boolean;
}) => {
    const [field, meta] = useField('password');

    return (
        <div className="flex flex-col">
            <Input
                {...field}
                label="Password"
                id="password"
                data-testid="password"
                name="password"
                required={true}
                showHideToggle
                autoComplete="off"
                errorText={
                    isPasswordIncorrect
                        ? 'Password is incorrect'
                        : meta.touched && meta.error
                        ? meta.error
                        : undefined
                }
            />

            <Button
                buttonStyle="primary"
                data-testid="submit"
                type="submit"
                disabled={!meta.value || !!meta.error}
            >
                View private key
            </Button>
        </div>
    );
};

const PasswordVerificationForm = ({
    onSubmit,
}: PasswordVerificationFormProps) => {
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const passphrase = useAppSelector(({ account }) => account.passphrase);
    const _onSubmit = useCallback(
        async ({ password }: FormikValues) => {
            if (password !== passphrase) {
                setIsPasswordIncorrect(true);
                return;
            } else {
                setIsPasswordIncorrect(false);
                onSubmit(password);
            }
        },
        [passphrase, onSubmit]
    );
    return (
        <Formik
            initialValues={{
                password: '',
            }}
            validationSchema={Yup.object({
                password: Yup.string().required('Enter your password'),
            })}
            onSubmit={_onSubmit}
        >
            <Form>
                <CustomFormikForm isPasswordIncorrect={isPasswordIncorrect} />
            </Form>
        </Formik>
    );
};

export default PasswordVerificationForm;
