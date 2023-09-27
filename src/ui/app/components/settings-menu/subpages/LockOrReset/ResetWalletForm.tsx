import { Form, Formik, useField } from 'formik';
import { type ChangeEventHandler, useCallback, useState } from 'react';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { assertPasswordIsCorrect } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';

import type { FormikValues } from 'formik';

type PassphraseFormProps = {
    onSubmit: () => void;
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
    const [isEmailOnlyCheckboxChecked, setIsEmailOnlyCheckboxChecked] =
        useState(false);
    const authentication = useAppSelector(
        ({ account: { authentication } }) => authentication
    );
    const dispatch = useAppDispatch();

    const _onSubmit = useCallback(
        async ({ password }: FormikValues) => {
            if (authentication) {
                onSubmit();
                return;
            }
            const { payload: isPasswordCorrect } = await dispatch(
                assertPasswordIsCorrect(password)
            );
            if (!isPasswordCorrect) {
                setIsPasswordIncorrect(true);
                return;
            } else {
                setIsPasswordIncorrect(false);
                onSubmit();
            }
        },
        [authentication, dispatch, onSubmit]
    );

    const onHandleConfirmed = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const checked = event.target.checked;
            setIsEmailOnlyCheckboxChecked(checked);
        },
        []
    );

    return (
        <div className="h-full">
            {authentication ? (
                <div className="flex flex-col h-full justify-between">
                    <div className="pb-4 px-6 w-full relative flex items-center">
                        <div className="flex">
                            <div className="flex items-center h-5">
                                <input
                                    id="view-phrase-check"
                                    aria-describedby="view-phrase-check-description"
                                    name="view-phrase-check"
                                    type="checkbox"
                                    onChange={onHandleConfirmed}
                                    checked={isEmailOnlyCheckboxChecked}
                                    className="h-4 w-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 dark:text-violet-700 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="view-phrase-check"
                                    className="font-medium text-gray-700 dark:text-gray-400"
                                    id="view-phrase-check-description"
                                >
                                    I understand
                                </label>
                            </div>
                        </div>
                    </div>
                    <Button
                        buttonStyle="secondary"
                        onClick={_onSubmit}
                        disabled={!isEmailOnlyCheckboxChecked}
                    >
                        Reset Wallet
                    </Button>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default ResetWalletForm;
