// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppState } from '../hooks/useInitializedGuard';
import { savePassphrase } from '../redux/slices/account';
import GetStartedCard from '../shared/GetStartedCard';
import PassphraseForm from '../shared/forms/PassphraseForm';
import Body from '../shared/typography/Body';
import BodyLarge from '../shared/typography/BodyLarge';
import Title from '../shared/typography/Title';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';
import { TextColor } from '_src/enums/TypographyEnums';

const PasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const checkingInitialized = useInitializedGuard(AppState.PASSWORD);

    const _save = useCallback(
        async (passphrase: string) => {
            await dispatch(savePassphrase(passphrase));
            navigate('/');
        },
        [dispatch, navigate]
    );

    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <GetStartedCard>
                    <div className="mb-4">
                        <Title as="h1">Ethos</Title>
                        <Body textColor={TextColor.Medium}>
                            The new web awaits
                        </Body>
                    </div>
                    <BodyLarge as="p" className="mb-2">
                        Please provide a passphrase to ensure your wallet is
                        secure.
                    </BodyLarge>

                    <PassphraseForm onSubmit={_save} />
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default PasswordPage;
