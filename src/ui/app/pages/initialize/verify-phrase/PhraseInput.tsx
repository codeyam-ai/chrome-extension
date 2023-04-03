import { useCallback } from 'react';

import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

interface WordDisplayProps {
    word: string;
    slot: number;
    isActive: boolean;
    onClickWord: (word: string, slot: number) => void;
}

const WordDisplay = ({
    word,
    slot,
    isActive,
    onClickWord,
}: WordDisplayProps) => {
    const handleWordClicked = useCallback(() => {
        onClickWord(word, slot);
    }, [word, onClickWord, slot]);

    const wordDisplay = (
        <BodyLarge
            isSemibold
            className="text-left col-span-2 !text-ethos-light-mnemonic-word"
        >
            {isActive ? '|' : word}
        </BodyLarge>
    );
    return (
        <div className="grid grid-cols-3 gap-1">
            <BodyLarge isTextColorMedium className="text-right col-span-1">
                <code>{slot}</code>
            </BodyLarge>
            {isActive || word.length === 0 ? (
                wordDisplay
            ) : (
                <button onClick={handleWordClicked}>{wordDisplay}</button>
            )}
        </div>
    );
};

interface PhraseInputProps {
    chosenWords: Record<number, string>;
    nextWordSlotToChoose: number;
    onClickWord: (word: string, slot: number) => void;
    error: boolean;
}

const PhraseInput = ({
    chosenWords,
    nextWordSlotToChoose,
    onClickWord,
    error,
}: PhraseInputProps) => {
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-4 gap-2 py-4 px-6 rounded-lg bg-ethos-light-background-secondary">
                {Object.keys(chosenWords).map((chosenWordSlot) => {
                    const isActive = nextWordSlotToChoose === +chosenWordSlot;
                    const word = chosenWords[+chosenWordSlot];
                    return (
                        <WordDisplay
                            word={word}
                            slot={+chosenWordSlot}
                            isActive={isActive}
                            onClickWord={onClickWord}
                            key={chosenWordSlot}
                        />
                    );
                })}
            </div>
            {error && (
                <Body forceLightMode className="pt-2 text-ethos-light-red">
                    That&apos;s not your recovery phrase. Please try again.
                </Body>
            )}
        </>
    );
};

export default PhraseInput;
