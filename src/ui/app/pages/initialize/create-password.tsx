// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CreatePasswordForm from '../../shared/forms/CreatePasswordForm';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    createMnemonic,
    savePassphrase,
} from '_src/ui/app/redux/slices/account';

const CreatePasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );

    const _save = useCallback(
        async (passphrase: string) => {
            await dispatch(savePassphrase(passphrase));

            if (mnemonic) {
                // User is importing existing seed
                navigate('/initialize/complete');
            } else {
                // User is generating new wallet
                await dispatch(createMnemonic({}));
                navigate('/initialize/save-phrase');
            }
        },
        [dispatch, mnemonic, navigate]
    );

    return (
        <OnboardingCard
            title="Create a Password"
            subtitle="Enter your password to create a seed for your
            recovery phrase."
            accentColor="green"
            icon="key"
            progressCompleted={mnemonic ? 3 : 1}
            progressTotal={mnemonic ? 3 : 5}
        >
            <CreatePasswordForm onSubmit={_save} />
        </OnboardingCard>
    );
};

export default CreatePasswordPage;
