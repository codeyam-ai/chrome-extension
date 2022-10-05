import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import LoadingIndicator from '../components/loading/LoadingIndicator';
import Button, { ButtonStyle } from './buttons/Button';
import Input from './inputs/Input';

type EmailFormProps = {
    onSubmit: (email: string) => void;
    loading: boolean;
};

const CustomFormikForm = ({ loading }: any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField('email');
    return (
        <>
            <Input
                {...field}
                label="Email address"
                id="email"
                name="email"
                type="email"
                required={true}
                errorText={meta.touched && meta.error ? meta.error : undefined}
            />

            {loading ? (
                <div className="flex justify-center items-center p-6 text-xl">
                    <LoadingIndicator />
                </div>
            ) : (
                <Button
                    buttonStyle={ButtonStyle.PRIMARY}
                    type="submit"
                    disabled={!meta.value || meta.error ? true : false}
                >
                    Sign in
                </Button>
            )}
        </>
    );
};

const EmailForm = ({ onSubmit, loading }: EmailFormProps) => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                })}
                onSubmit={({ email }) => {
                    onSubmit(email);
                }}
            >
                <Form>
                    <CustomFormikForm loading={loading} />
                </Form>
            </Formik>
        </div>
    );
};

export default EmailForm;
