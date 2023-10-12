import { Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';
import * as Yup from 'yup';

import AutoLockTimeoutForm from './AutoLockTimeoutForm';
import LoadingIndicator from '../../../loading/LoadingIndicator';
import { DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES } from '_src/shared/constants';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import { thunkExtras } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';

const SignOutEmail = () => {
    const email = useAppSelector(({ account }) => account.email);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

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

    const reset = useCallback(async () => {
        setLoading(true);
        await dispatch(resetWallet());
    }, [dispatch]);

    return (
        <div className="flex">
            <div className="flex flex-col gap-6">
                <ContentBlock>
                    <Header>Sign Out of Ethos</Header>
                    <Body isTextColorMedium>
                        After you sign out of Ethos, you must sign back in with{' '}
                        <span className="font-semibold text-ethos-light-text-default dark:text-ethos-dark-text-default">
                            {email}
                        </span>{' '}
                        and use another login link to access the this wallet
                        again.
                    </Body>
                </ContentBlock>
                <Button onClick={reset} disabled={loading}>
                    {loading ? <LoadingIndicator /> : 'Sign Out'}
                </Button>
                <ContentBlock>
                    <BodyLarge>
                        Ethos will automatically sign out after {currentTimeout}{' '}
                        minutes.
                    </BodyLarge>
                    <Body>
                        <EthosLink onClick={toggleSetAutoLock} type="external">
                            Edit Auto-Sign Out time
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
        </div>
    );
};

export default SignOutEmail;
