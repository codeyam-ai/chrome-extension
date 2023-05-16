import { Form, Formik, useField } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import type { FormikValues } from 'formik';
import Input from '_src/ui/app/shared/inputs/Input';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import { useAppDispatch } from '_src/ui/app/hooks';
import { assertPasswordIsCorrect } from '_src/ui/app/redux/slices/account';

type PassphraseFormProps = {
    onSubmit: (passphrase: string) => void;
    isPasswordIncorrect?: boolean;
};

const CustomFormikForm = ({
    isPasswordIncorrect = false,
}: {
    isPasswordIncorrect: boolean;
}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('password');

    return (
        <div className="flex flex-col h-full justify-between">
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
                Reset Wallet
            </Button>
        </div>
    );
};

const ResetWalletForm = ({ onSubmit }: PassphraseFormProps) => {
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const dispatch = useAppDispatch();
    const _onSubmit = useCallback(
        async ({ password }: FormikValues) => {
            const { payload: isPasswordCorrect } = await dispatch(
                assertPasswordIsCorrect(password)
            );
            if (!isPasswordCorrect) {
                setIsPasswordIncorrect(true);
                return;
            } else {
                setIsPasswordIncorrect(false);
                onSubmit(password);
            }
        },
        [dispatch, onSubmit]
    );
    return (
        <div className="h-full">
            <Formik
                initialValues={{
                    password: '',
                }}
                validationSchema={Yup.object({
                    password: Yup.string().required('Enter your password'),
                })}
                onSubmit={_onSubmit}
            >
                <Form className="h-full">
                    <CustomFormikForm
                        isPasswordIncorrect={isPasswordIncorrect}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default ResetWalletForm;
