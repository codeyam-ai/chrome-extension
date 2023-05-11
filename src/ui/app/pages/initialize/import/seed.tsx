import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    normalizeMnemonics,
    validateMnemonics,
} from '_src/shared/cryptography/mnemonics';
import { useAppDispatch } from '_src/ui/app/hooks';
import { createMnemonic, setMnemonic } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import HideShowToggle from '_src/ui/app/shared/buttons/HideShowToggle';
import OnboardingCard from '_src/ui/app/shared/layouts/OnboardingCard';
import Body from '_src/ui/app/shared/typography/Body';

import type { ClipboardEvent, FormEvent } from 'react';
import RecoveryPhraseInput from '_src/ui/app/shared/inputs/RecoveryPhraseInput';

const idPrefix = 'word-';
const errorText =
    'That recovery phrase is not valid. Please check your phrase and try again.';

const ImportSeedPage = () => {
    const [words, setWords] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const areAllWordsChosen = useMemo(() => {
        return words.length === 12;
    }, [words]);

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let mnemonic = '';
            for (const word of words) {
                mnemonic = mnemonic + word + ' ';
            }
            const formattedMnemonic = normalizeMnemonics(mnemonic.trim());
            if (!validateMnemonics(formattedMnemonic)) {
                setError(errorText);
                return;
            }
            await dispatch(
                createMnemonic({ existingMnemonic: formattedMnemonic })
            );
            dispatch(setMnemonic(formattedMnemonic));
            navigate('/initialize/import/confirm');
        },
        [words, dispatch, navigate]
    );

    const focusOnContinueButton = useCallback(() => {
        document.getElementById('continue')?.focus();
    }, []);

    const focusOnFirstWord = useCallback(() => {
        document.getElementById(idPrefix + 0)?.focus();
    }, []);

    const updateWord = useCallback(
        (index: number, newWord: string) => {
            const newWords = words;
            newWords[index] = newWord;
            setWords([...newWords]);
        },
        [words]
    );

    const updateWordsState = useCallback((newWords: string[]) => {
        setWords(newWords);
    }, []);

    useEffect(() => {
        focusOnFirstWord();
    }, [focusOnFirstWord]);

    return (
        <OnboardingCard
            title="Paste Recovery Phrase"
            subtitle="Paste or type in your recovery phrase below"
            accentColor="gold"
            icon="lock"
            isIconBlurred={!areAllWordsChosen}
            progressCompleted={1}
            progressTotal={3}
        >
            <form onSubmit={onSubmit} className="flex flex-col gap-6 px-6">
                <RecoveryPhraseInput
                    words={words}
                    onPaste={focusOnContinueButton}
                    updateWord={updateWord}
                    onWordsChange={updateWordsState}
                    errorText={error}
                />
                <div className="pb-10">
                    <Button
                        id="continue"
                        type="submit"
                        data-testid="submit"
                        disabled={!areAllWordsChosen}
                        removeContainerPadding
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </OnboardingCard>
    );
};

export default ImportSeedPage;
