import { Formik } from 'formik';
import { useCallback, useState, useEffect } from 'react';
import Browser from 'webextension-polyfill';
import * as Yup from 'yup';

import AutoLockTimeoutForm from './AutoLockTimeoutForm';
import { DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES } from '_src/shared/constants';
import { thunkExtras } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';

const LockWallet = () => {
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

    return (
        <div className="flex flex-col">
            <ContentBlock>
                <Header>Lock Ethos</Header>
                <Body isTextColorMedium>
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </Body>
            </ContentBlock>
            <Button onClick={lockWallet} className="mt-2">
                Lock Wallet Now
            </Button>
            <ContentBlock>
                <BodyLarge>
                    Ethos will Auto-lock after {currentTimeout} minutes
                </BodyLarge>
                <Body>
                    <EthosLink onClick={toggleSetAutoLock} type="external">
                        Edit Auto-Lock time
                    </EthosLink>
                </Body>
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
    );
};

export default LockWallet;
