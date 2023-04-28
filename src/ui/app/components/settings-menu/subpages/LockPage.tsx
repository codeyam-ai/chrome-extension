import { Form, Formik, useField } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';
import * as Yup from 'yup';

import { useDependencies } from '_shared/utils/dependenciesContext';
import { DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES } from '_src/shared/constants';
import Button from '_src/ui/app/shared/buttons/Button';
import Well from '_src/ui/app/shared/content/Well';
import Input from '_src/ui/app/shared/inputs/Input';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';
import { thunkExtras } from '_store/thunk-extras';

const AutoLockTimeoutForm = () => {
    const [timeoutField] = useField('timeout');

    return (
        <Form className="flex flex-col gap-3 items-center">
            <Input
                {...timeoutField}
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

const LockPage = () => {
    const lockWallet = useCallback(async () => {
        thunkExtras.background.lockWallet();
    }, []);

    const { featureFlags } = useDependencies();

    const [isAutoLockFormShowing, setAutoLockFormShowing] = useState(false);

    const openSetAutoLockForm = useCallback(() => {
        setAutoLockFormShowing(true);
    }, []);

    const validationSchema = Yup.object().shape({
        timeout: Yup.number().required(),
    });

    const onHandleSubmit = useCallback(({ timeout }: FormValues) => {
        Browser.storage.local.set({ autoLockTimeout: timeout });
        thunkExtras.background.sendHeartbeat();
        setCurrentTimeout(timeout);
        setAutoLockFormShowing(false);
    }, []);

    useEffect(() => {
        Browser.storage.local
            .get('autoLockTimeout')
            .then(({ autoLockTimeout }) => {
                setCurrentTimeout(
                    autoLockTimeout || DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES
                );
            });
    }, []);

    const [currentTimeout, setCurrentTimeout] = useState(
        DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES
    );
    interface FormValues {
        timeout: number;
    }

    const initialValues: FormValues = {
        timeout: currentTimeout,
    };

    return featureFlags.showWipFeatures ? (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Lock Ethos</Header>
                <BodyLarge isTextColorMedium>
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </BodyLarge>
            </ContentBlock>
            <Button onClick={lockWallet}>Lock Wallet Now</Button>
            <ContentBlock className="!py-6">
                <Body>Ethos will Auto-lock after {currentTimeout} minutes</Body>
                <EthosLink onClick={openSetAutoLockForm} type="external">
                    Edit Auto-Lock time
                </EthosLink>
            </ContentBlock>
            {isAutoLockFormShowing && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onHandleSubmit}
                    validateOnMount={true}
                    initialErrors={true}
                >
                    <AutoLockTimeoutForm />
                </Formik>
            )}
        </div>
    ) : (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Lock Ethos</Header>
                <BodyLarge isTextColorMedium>
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </BodyLarge>
            </ContentBlock>
            <Well
                header="Wallet Autolock"
                subHeader="Ethos will autolock after 15 minutes."
            />
            <Button onClick={lockWallet}>Lock Wallet Now</Button>
        </div>
    );
};

export default LockPage;
