// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppState } from '../hooks/useInitializedGuard';
import PassphraseForm from '../shared/forms/PassphraseForm';
import {
    savePassphrase,
    loadAccountInformationFromStorage,
} from '../redux/slices/account';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';
import DescriptionList from '../shared/content/rows-and-lists/DescriptionList';
import GetStartedCard from '../shared/layouts/GetStartedCard';

const PasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const checkingInitialized = useInitializedGuard(AppState.PASSWORD);

    const _save = useCallback(
        async (passphrase: string) => {
            await dispatch(savePassphrase(passphrase));
            await dispatch(loadAccountInformationFromStorage());
            navigate('/');
        },
        [dispatch, navigate]
    );

    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <GetStartedCard showBack={true}>
                    <DescriptionList
                        labelAndDescriptions={[
                            {
                                label: 'Create a passphrase',
                                description: (
                                    <>
                                        Please provide a passphrase to ensure
                                        your wallet is secure.
                                    </>
                                ),
                            },
                        ]}
                    />

                    <PassphraseForm onSubmit={_save} />
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default PasswordPage;
