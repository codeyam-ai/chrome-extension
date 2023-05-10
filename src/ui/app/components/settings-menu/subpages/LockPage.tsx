import { Form, Formik, useField } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';
import * as Yup from 'yup';

import { DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES } from '_src/shared/constants';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';
import Body from '_src/ui/app/shared/typography/Body';
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
                min="1"
                max="30"
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
    const dispatch = useAppDispatch();
    const { passphrase } = useAppSelector(({ account }) => account);
    const lockWallet = useCallback(async () => {
        thunkExtras.background.lockWallet();
    }, []);

    const [isAutoLockFormShowing, setAutoLockFormShowing] = useState(false);

    const toggleSetAutoLock = useCallback(() => {
        setAutoLockFormShowing((prev) => !prev);
    }, []);

    const validationSchema = Yup.object().shape({
        timeout: Yup.number().required(),
    });

    const [password, setPassword] = useState('');

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        [setPassword]
    );

    const onHandleSubmit = useCallback(({ timeout }: FormValues) => {
        Browser.storage.local.set({ autoLockTimeout: timeout });
        thunkExtras.background.sendHeartbeat();
        setCurrentTimeout(timeout);
        setAutoLockFormShowing(false);
    }, []);

    const reset = useCallback(async () => {
        if (password !== passphrase) return;
        if (window.confirm('Are you sure you want to reset your wallet?')) {
            await dispatch(resetWallet());
        }
    }, [dispatch, password, passphrase]);

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

    return (
        <div className="flex flex-col gap-6 py-6">
            <ContentBlock>
                <Header>Lock Ethos</Header>
                <Body isTextColorMedium>
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </Body>
            </ContentBlock>
            <Button onClick={lockWallet}>Lock Wallet Now</Button>
            <ContentBlock>
                <Body>Ethos will Auto-lock after {currentTimeout} minutes</Body>
                <EthosLink onClick={toggleSetAutoLock} type="external">
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
            <div className="py-6 flex flex-col gap-6">
                <ContentBlock>
                    <Header>Reset Ethos</Header>
                    <Body isTextColorMedium>
                        Resetting Ethos will delete all of your wallets and
                        information. This can not be be undone. Please proceed
                        with caution.
                    </Body>
                </ContentBlock>
                <div className="flex justify-center items-center gap-3">
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="border rounded-lg p-3 dark:bg-ethos-dark-background-secondary"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        buttonStyle="primary"
                        onClick={reset}
                        removeContainerPadding
                        disabled={passphrase !== password}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LockPage;
