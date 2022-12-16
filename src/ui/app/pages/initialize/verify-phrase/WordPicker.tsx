import { useCallback } from 'react';

import Body from '_src/ui/app/shared/typography/Body';

export type WordInfo = {
    index: number;
    text: string;
    used: boolean;
};

interface WordButtonProps {
    word: WordInfo;
    onClick: (word: WordInfo) => void;
}

const WordButton = ({ word, onClick }: WordButtonProps) => {
    const handleClick = useCallback(() => {
        onClick(word);
    }, [word, onClick]);

    return (
        <button
            onClick={handleClick}
            disabled={word.used}
            className="py-1 px-2 rounded-full disabled:opacity-50 bg-ethos-light-primary-light/10"
        >
            <Body isSemibold className="text-ethos-light-primary-light">
                {word.text}
            </Body>
        </button>
    );
};

interface WordPickerProps {
    wordList: WordInfo[];
    handleWordClicked: (word: WordInfo) => void;
}

const WordPicker = ({ wordList, handleWordClicked }: WordPickerProps) => {
    return (
        <div className="grid grid-cols-4 grid-rows-3 px-6 pb-6 gap-2">
            {wordList.map((word, key) => {
                return (
                    <WordButton
                        word={word}
                        onClick={handleWordClicked}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

export default WordPicker;
