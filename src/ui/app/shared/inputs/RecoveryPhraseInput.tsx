import classNames from 'classnames';
import { useCallback, useState } from 'react';

import HideShowToggle from '../buttons/HideShowToggle';
import Body from '_src/ui/app/shared/typography/Body';

export const RECOVERY_PHRASE_INPUT_ID_PREFIX = 'word-';

interface WordInputProps {
    index: number;
    defaultValue: string;
    updateWord: (index: number, newWord: string) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    password?: boolean;
    forceLightTheme?: boolean;
}

const WordInput = ({
    index,
    defaultValue,
    updateWord,
    handlePaste,
    password,
    forceLightTheme,
}: WordInputProps) => {
    const focusOnThisInput = useCallback(() => {
        document
            .getElementById(RECOVERY_PHRASE_INPUT_ID_PREFIX + index)
            ?.focus();
    }, [index]);

    const updateThisWord = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateWord(index, e.target.value);
        },
        [index, updateWord]
    );

    return (
        <div
            className={classNames(
                'flex items-center gap-1 py-3 px-4 bg-ethos-light-background-secondary rounded-xl',
                forceLightTheme ? '' : 'dark:bg-ethos-dark-background-secondary'
            )}
            key={index}
            onClick={focusOnThisInput}
        >
            <Body isTextColorMedium>
                <code>{index + 1}</code>
            </Body>
            <input
                type={password ? 'password' : 'text'}
                id={RECOVERY_PHRASE_INPUT_ID_PREFIX + index}
                data-testid={RECOVERY_PHRASE_INPUT_ID_PREFIX + index}
                className={classNames(
                    'w-full bg-ethos-light-background-secondary border-none focus:outline-none focus:ring-transparent p-0 m-0',
                    forceLightTheme
                        ? ''
                        : 'dark:bg-ethos-dark-background-secondary'
                )}
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
    forceLightTheme?: boolean;
}

const RecoveryPhraseInput = ({
    words,
    updateWord,
    onPaste,
    onWordsChange,
    errorText,
    forceLightTheme,
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
                            forceLightTheme={forceLightTheme}
                        />
                    );
                })}
            </div>
            {errorText && (
                <Body
                    className={classNames(
                        'pt-2 text-ethos-light-red',
                        forceLightTheme ? '' : 'text-ethos-dark-red'
                    )}
                >
                    {errorText}
                </Body>
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
