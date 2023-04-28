import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    normalizeMnemonics,
    validateMnemonics,
} from '_src/shared/cryptography/mnemonics';
import Button from '_src/ui/app/shared/buttons/Button';
import HideShowToggle from '_src/ui/app/shared/buttons/HideShowToggle';
import Body from '_src/ui/app/shared/typography/Body';

import type { ClipboardEvent, FormEvent } from 'react';

const idPrefix = 'word-';

interface WordInputProps {
    index: number;
    defaultValue: string;
    updateWord: (index: number, newWord: string) => void;
    handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
    password?: boolean;
}

const WordInput = ({
    index,
    defaultValue,
    updateWord,
    handlePaste,
    password,
}: WordInputProps) => {
    const focusOnThisInput = useCallback(() => {
        document.getElementById(idPrefix + index)?.focus();
    }, [index]);

    const updateThisWord = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateWord(index, e.target.value);
        },
        [index, updateWord]
    );

    return (
        <div
            className="flex gap-1 py-3 px-4 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-xl"
            key={index}
            onClick={focusOnThisInput}
        >
            <Body isTextColorMedium>
                <code>{index + 1}</code>
            </Body>
            <input
                type={password ? 'password' : 'text'}
                id={idPrefix + index}
                data-testid={idPrefix + index}
                className="w-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary border-none focus:outline-none focus:ring-transparent p-0 m-0"
                autoComplete="off"
                defaultValue={defaultValue}
                onPaste={handlePaste}
                onChange={updateThisWord}
            />
        </div>
    );
};

const SeedPhraseForm = ({
    onChange,
}: {
    onChange: (seedPhrase: string) => void;
}) => {
    const [words, setWords] = useState<string[]>([]);
    const [error, setError] = useState(false);
    const [passwordMode, setPasswordMode] = useState(true);

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
                setError(true);
                return;
            }
            onChange(formattedMnemonic);
        },
        [onChange, words]
    );

    const updateWord = useCallback(
        (index: number, newWord: string) => {
            const newWords = words;
            newWords[index] = newWord;
            setWords([...newWords]);
        },
        [words]
    );

    const togglePasswordMode = useCallback(() => {
        setPasswordMode((prev) => !prev);
    }, []);

    const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
        const clipboardData = e.clipboardData?.getData('Text');
        const wordList = clipboardData.split(' ');
        if (wordList.length !== 12) {
            return;
        }
        e.preventDefault();

        setWords(wordList);
    }, []);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6 px-6">
            <Body className="px-6">
                Enter the 12-word recovery phrase to import your wallet.
            </Body>

            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 grid-rows-4 gap-3">
                    {[...Array(12)].map((_, index) => {
                        return (
                            <WordInput
                                index={index}
                                defaultValue={words[index]}
                                updateWord={updateWord}
                                handlePaste={handlePaste}
                                key={index}
                                password={passwordMode}
                            />
                        );
                    })}
                </div>
                {error && (
                    <Body className="pt-2 text-ethos-light-red">
                        That recovery phrase is not valid. Please check your
                        phrase and try again.
                    </Body>
                )}
            </div>
            <HideShowToggle
                name="Phrase"
                hide={passwordMode}
                onToggle={togglePasswordMode}
            />
        </form>
    );
};

export default SeedPhraseForm;
