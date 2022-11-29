import { Form, Formik, useField } from 'formik';
import { useCallback, useMemo } from 'react';
import * as Yup from 'yup';

import type { FormikValues } from 'formik';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { setCustomRPC } from '_src/ui/app/redux/slices/app';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';

const MIN_CHAR = 5;

const isValidUrl = (url: string | undefined) => {
    if (!url) return false;
    try {
        new URL(url);
    } catch (e) {
        return false;
    }
    return true;
};

const CustomFormikForm = ({ connectedUrl }: { connectedUrl: string }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('networkUrl');
    const isConnectedUrlInInput = useMemo(() => {
        return meta.value === connectedUrl && connectedUrl.length > 0;
    }, [connectedUrl, meta.value]);
    return (
        <>
            <Input
                {...field}
                label="Custom RPC URL"
                id="networkUrl"
                name="networkUrl"
                type="text"
                placeholder="http://localhost:3000/"
                description={isConnectedUrlInInput ? 'Connected' : undefined}
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
            />
            <Button
                buttonStyle="primary"
                type="submit"
                disabled={
                    !meta.value || meta.error || isConnectedUrlInInput
                        ? true
                        : false
                }
            >
                Connect
            </Button>
        </>
    );
};

const CustomRpcForm = () => {
    const connectedUrl = useAppSelector(({ app }) => app.customRPC || '');

    const dispatch = useAppDispatch();

    const _onSubmit = useCallback(({ networkUrl }: FormikValues) => {
        dispatch(setCustomRPC(networkUrl));
    }, []);
    return (
        <div>
            <Formik
                initialValues={{
                    networkUrl: connectedUrl,
                }}
                validationSchema={Yup.object({
                    networkUrl: Yup.string()
                        .required('Enter a URL')
                        .label('Custom RPC URL')
                        .min(
                            MIN_CHAR,
                            `The URL must be at least ${MIN_CHAR} characters long`
                        )
                        .test(
                            'validate-url',
                            `That's not a valid URL`,
                            (value) => isValidUrl(value)
                        ),
                })}
                onSubmit={_onSubmit}
            >
                <Form>
                    <CustomFormikForm connectedUrl={connectedUrl} />
                </Form>
            </Formik>
        </div>
    );
};

export default CustomRpcForm;
