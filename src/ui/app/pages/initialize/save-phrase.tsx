// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../shared/buttons/Button';
import RecoveryPhraseDisplay from '../../shared/content/RecoveryPhraseDisplay';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { loadAccountInformationFromStorage } from '_src/ui/app/redux/slices/account';

const SavePhrasePage = () => {
    // useInitializedGuard(AppState.MNEMONIC);
    const [copied, setCopied] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );

    const setCopiedTrue = useCallback(() => {
        setCopied(true);
    }, []);

    const finishOnboarding = useCallback(async () => {
        if (!copied) {
            return;
        }
        await dispatch(loadAccountInformationFromStorage());
        navigate('/initialize/verify-phrase');
    }, [copied, dispatch, navigate]);

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
                    horizontalMarginInPx={40}
                    onCopy={setCopiedTrue}
                    forceLightTheme
                />
                <div className="px-10 pb-10">
                    <Button
                        onClick={finishOnboarding}
                        disabled={!copied}
                        className="!mb-10"
                        removeContainerPadding
                    >
                        Create Wallet
                    </Button>
                </div>
            </div>
        </OnboardingCard>
    );
};

export default SavePhrasePage;
