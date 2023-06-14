// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useIsMobile from '../../hooks/useIsMobile';
import Button from '../../shared/buttons/Button';
import RecoveryPhraseDisplay from '../../shared/content/RecoveryPhraseDisplay';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import Permissions from '_src/background/Permissions';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { loadAccountInformationFromStorage } from '_src/ui/app/redux/slices/account';

const SavePhrasePage = () => {
    // useInitializedGuard(AppState.MNEMONIC);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const address = useAppSelector(({ account }) => account.address);

    const finishOnboarding = useCallback(async () => {
        await dispatch(loadAccountInformationFromStorage());
        navigate('/initialize/verify-phrase');
    }, [dispatch, navigate]);

    useEffect(() => {
        if (address) {
            Permissions.grantEthosDashboardBasicPermissionsForAccount(address);
        }
    }, [address]);

    return (
        <OnboardingCard
            title="Recovery Phrase"
            subtitle="Save your phrase securely by writing it down or storing it in a password manager."
            accentColor="gold"
            icon="key"
            progressCompleted={2}
            progressTotal={5}
        >
            <div className="flex flex-col gap-[76px]">
                <RecoveryPhraseDisplay
                    mnemonic={mnemonic || ''}
                    horizontalMarginInPx={isMobile ? 24 : 40}
                    forceLightTheme
                />
                <div className="px-6 sm:px-10 pb-6 sm:pb-10">
                    <Button onClick={finishOnboarding} removeContainerPadding>
                        Create Wallet
                    </Button>
                </div>
            </div>
        </OnboardingCard>
    );
};

export default SavePhrasePage;
