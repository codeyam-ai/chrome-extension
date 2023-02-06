import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PhraseInput from './PhraseInput';
import WordPicker from './WordPicker';
import shuffleArray from '../../../helpers/shuffle-array';
import { useAppSelector, useOnKeyboardEvent } from '../../../hooks';
import OnboardingCard from '../../../shared/layouts/OnboardingCard';
import Button from '_src/ui/app/shared/buttons/Button';

import type { WordInfo } from './WordPicker';

const getMnemonicWordInfo = (mnemonic: string): WordInfo[] => {
    const mnemonicList = mnemonic.split(' ');
    const mnemonicRecord: WordInfo[] = [];
    for (const i in mnemonicList) {
        if (Object.prototype.hasOwnProperty.call(mnemonicList, i)) {
            const word = mnemonicList[i];
            mnemonicRecord.push({ index: +i, text: word, used: false });
        }
    }
    return mnemonicRecord;
};

const verifyMnemonic = (
    mnemonic: string,
    enteredWords: Record<number, string>
) => {
    const mnemonicList = mnemonic.split(' ');
    for (const i in mnemonicList) {
        if (Object.prototype.hasOwnProperty.call(mnemonicList, i)) {
            const word = mnemonicList[i];
            if (word !== enteredWords[+i + 1]) {
                return false;
            }
        }
    }
    return true;
};

const VerifyPhrasePage = () => {
    const [error, setError] = useState(false);
    const [wordOptions, setWordOptions] = useState<WordInfo[]>([]);
    const [chosenWords, setChosenWords] = useState<Record<number, string>>({});
    const navigate = useNavigate();
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );

    const nextWordSlotToChoose = useMemo(() => {
        for (const num of Object.keys(chosenWords)) {
            if (wordOptions.length > 0 && chosenWords[+num].length === 0) {
                return +num;
            }
        }
        return 0;
        // NOTE: wordOptions is shown as an unnecessary dependency. However when it gets removed it messes up. Figure this out.
    }, [chosenWords, wordOptions]);

    const resetChosenWords = () => {
        setChosenWords({
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: '',
            9: '',
            10: '',
            11: '',
            12: '',
        });
    };

    const resetForm = useCallback(() => {
        resetChosenWords();
        const updatedWordList = wordOptions.map((w) => {
            return {
                ...w,
                used: false,
            };
        });

        setWordOptions(updatedWordList);
    }, [wordOptions]);

    const areAllWordsChosen = useMemo(() => {
        for (const word of wordOptions) {
            if (!word.used) {
                return false;
            }
        }
        return true;
    }, [wordOptions]);

    const setWordOptionUsed = useCallback(
        (word: WordInfo) => {
            const updatedWordList = wordOptions.map((w) => {
                if (w === word) {
                    return {
                        ...w,
                        used: true,
                    };
                }
                return w;
            });

            setWordOptions(updatedWordList);
        },
        [wordOptions]
    );

    const setWordOptionUnused = useCallback(
        (word: string) => {
            let isWordUpdated = false;
            const updatedWordList = wordOptions.map((w) => {
                if (!isWordUpdated && w.text === word && w.used) {
                    isWordUpdated = true;
                    return {
                        ...w,
                        used: false,
                    };
                }
                return w;
            });

            setWordOptions(updatedWordList);
        },
        [wordOptions]
    );

    const setChosenWordForSlot = useCallback(
        (slot: number, word: string) => {
            const tempChosenWords = chosenWords;
            tempChosenWords[slot] = word;
            setChosenWords(tempChosenWords);
        },
        [chosenWords]
    );

    const handleWordOptionClicked = useCallback(
        (word: WordInfo) => {
            setWordOptionUsed(word);
            setChosenWordForSlot(nextWordSlotToChoose, word.text);
        },
        [nextWordSlotToChoose, setChosenWordForSlot, setWordOptionUsed]
    );

    const undoWord = useCallback(
        (word: string, slot: number) => {
            setWordOptionUnused(word);
            setChosenWordForSlot(slot, '');
        },
        [setChosenWordForSlot, setWordOptionUnused]
    );

    const onClickContinue = useCallback(() => {
        const isMnemonicVerified = verifyMnemonic(mnemonic || '', chosenWords);

        if (isMnemonicVerified) {
            navigate('/initialize/style');
        } else {
            setError(true);
            resetForm();
        }
    }, [mnemonic, chosenWords, navigate, resetForm]);

    const removeLastChosenWord = () => {
        if (nextWordSlotToChoose === 1) {
            return;
        }
        const currentWordNum = nextWordSlotToChoose - 1;
        undoWord(chosenWords[currentWordNum], currentWordNum);
    };

    useOnKeyboardEvent('keydown', ['Backspace'], removeLastChosenWord);

    useEffect(() => {
        setWordOptions(shuffleArray(getMnemonicWordInfo(mnemonic || '')));
    }, [mnemonic]);

    useEffect(() => {
        resetChosenWords();
    }, []);

    return (
        <OnboardingCard
            title="Verify Recovery Phrase"
            subtitle="Select each recovery phrase word below in their correct order."
            accentColor="gold"
            icon="key"
            isIconBlurred={!areAllWordsChosen}
            progressCompleted={3}
            progressTotal={5}
        >
            <WordPicker
                wordList={wordOptions}
                handleWordClicked={handleWordOptionClicked}
            />
            <div className="px-6 sm:px-10 pb-11">
                <PhraseInput
                    chosenWords={chosenWords}
                    nextWordSlotToChoose={nextWordSlotToChoose}
                    onClickWord={undoWord}
                    error={error}
                />
            </div>
            <div className="px-6 sm:px-10 pb-6 sm:pb-10">
                <Button
                    onClick={onClickContinue}
                    disabled={!areAllWordsChosen}
                    removeContainerPadding
                >
                    Continue
                </Button>
            </div>
        </OnboardingCard>
    );
};

export default VerifyPhrasePage;
