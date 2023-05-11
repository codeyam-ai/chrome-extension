// RecoveryPhraseInput.tsx
import Body from '_src/ui/app/shared/typography/Body';
import { useCallback, useState } from 'react';
import HideShowToggle from '../buttons/HideShowToggle';

const idPrefix = 'word-';

interface WordInputProps {
    index: number;
    defaultValue: string;
    updateWord: (index: number, newWord: string) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
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
            className="flex gap-1 py-3 px-4 bg-ethos-light-background-secondary rounded-xl"
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
                className="w-full bg-ethos-light-background-secondary border-none focus:outline-none focus:ring-transparent p-0 m-0"
                autoComplete="off"
                defaultValue={defaultValue}
                onPaste={handlePaste}
                onChange={updateThisWord}
            />
        </div>
    );
};

interface RecoveryPhraseInputProps {
    words: string[];
    updateWord: (index: number, newWord: string) => void;
    onPaste: () => void;
    onWordsChange: (newWords: string[]) => void;
    errorText: string;
}

const RecoveryPhraseInput = ({
    words,
    updateWord,
    onPaste,
    onWordsChange,
    errorText,
}: RecoveryPhraseInputProps) => {
    const [localWords, setLocalWords] = useState(words);
    const [passwordMode, setPasswordMode] = useState(true);

    const togglePasswordMode = useCallback(() => {
        setPasswordMode((prev) => !prev);
    }, []);

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            const clipboardData = e.clipboardData?.getData('Text');
            const wordList = clipboardData.split(' ');
            if (wordList.length !== 12) {
                return;
            }
            e.preventDefault();

            setLocalWords(wordList);
            onWordsChange(wordList);
            setTimeout(() => {
                // Give React a bit of time to update the disabled property on the button
                onPaste();
            }, 1);
        },
        [onPaste, onWordsChange]
    );

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 grid-rows-4 gap-3">
                {[...Array(12)].map((_, index) => {
                    return (
                        <WordInput
                            index={index}
                            defaultValue={localWords[index]}
                            updateWord={updateWord}
                            handlePaste={handlePaste}
                            key={index}
                            password={passwordMode}
                        />
                    );
                })}
            </div>
            {errorText && (
                <Body className="pt-2 text-ethos-light-red">{errorText}</Body>
            )}
            <HideShowToggle
                forceLightTheme
                name="Phrase"
                hide={passwordMode}
                onToggle={togglePasswordMode}
            />
        </div>
    );
};
export default RecoveryPhraseInput;
