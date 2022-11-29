// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';
import { AppState } from '../hooks/useInitializedGuard';
import {
    loadAccountInformationFromStorage,
    savePassphrase,
} from '../redux/slices/account';
import DescriptionList from '../shared/content/rows-and-lists/DescriptionList';
import CreatePasswordForm from '../shared/forms/CreatePasswordForm';
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
                                label: 'Create a password',
                                description: (
                                    <>
                                        Please provide a password to ensure your
                                        wallet is secure.
                                    </>
                                ),
                            },
                        ]}
                    />

                    <CreatePasswordForm onSubmit={_save} />
                </GetStartedCard>
            </Loading>
        </PageLayout>
    );
};

export default PasswordPage;
