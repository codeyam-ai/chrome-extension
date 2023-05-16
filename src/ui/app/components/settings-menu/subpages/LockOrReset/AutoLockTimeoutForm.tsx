import { Form, useField } from 'formik';

import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';

const AutoLockTimeoutForm = () => {
    const [timeoutField] = useField('timeout');

    return (
        <Form className="flex flex-col gap-3 items-center">
            <Input
                {...timeoutField}
                min="1"
                max="90"
                type="number"
                label="Auto Lock Timeout"
                data-testid="timeout-input"
                required={true}
                autoFocus
            />
            <Button buttonStyle="primary" type="submit" removeContainerPadding>
                Save
            </Button>
        </Form>
    );
};

export default AutoLockTimeoutForm;
