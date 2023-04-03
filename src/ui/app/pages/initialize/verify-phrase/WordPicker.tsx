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
            className="py-1 px-2 rounded-full disabled:opacity-50 bg-ethos-light-primary-light"
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
        <div className="grid grid-cols-3 grid-rows-4 sm:grid-cols-4 sm:grid-rows-3 px-6 sm:px-10 pb-6 sm:pb-10 gap-2">
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
