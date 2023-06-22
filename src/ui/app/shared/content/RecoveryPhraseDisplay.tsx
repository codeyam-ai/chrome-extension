import { ArrowLongUpIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';

import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { MouseEventHandler } from 'react';

interface RecoveryPhraseDisplayProps {
    mnemonic: string;
    horizontalMarginInPx: number;
    onCopy?: () => void;
    forceLightTheme?: boolean;
}

const RecoveryPhraseDisplay = ({
    mnemonic,
    horizontalMarginInPx,
    onCopy,
    forceLightTheme,
}: RecoveryPhraseDisplayProps) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = useCallback<MouseEventHandler<HTMLElement>>(
        async (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!mnemonic) {
                return;
            }
            await navigator.clipboard.writeText(mnemonic);
            setCopied(true);
            onCopy && onCopy();
        },
        [mnemonic, onCopy]
    );
    return (
        <div className="flex flex-col">
            <div
                className={`grid grid-cols-3 grid-rows-4 gap-2 py-4 px-6 cursor-pointer rounded-lg bg-ethos-light-background-secondary ${
                    forceLightTheme
                        ? ''
                        : 'dark:bg-ethos-dark-background-secondary'
                }`}
                style={{
                    marginLeft: horizontalMarginInPx,
                    marginRight: horizontalMarginInPx,
                }}
                onClick={copyToClipboard}
            >
                {mnemonic.split(' ').map((word, index) => {
                    return (
                        <div className="grid grid-cols-3 gap-2" key={index}>
                            <BodyLarge
                                isTextColorMedium
                                className="text-right col-span-1"
                            >
                                <code>{index + 1}</code>
                            </BodyLarge>
                            <BodyLarge
                                isSemibold
                                className={`text-left col-span-2 !text-ethos-light-mnemonic-word ${
                                    forceLightTheme
                                        ? ''
                                        : 'dark:!text-ethos-dark-mnemonic-word'
                                }`}
                            >
                                {word}
                            </BodyLarge>
                        </div>
                    );
                })}
            </div>
            <div className="flex gap-2 py-4 px-5 place-content-center items-center">
                {!copied ? (
                    <>
                        <ArrowLongUpIcon
                            className={`h-5 w-5 text-ethos-light-text-medium ${
                                forceLightTheme
                                    ? ''
                                    : 'dark:text-ethos-dark-text-medium'
                            }`}
                        />
                        <Body forceLightMode={forceLightTheme}>
                            Click above to copy recovery phrase
                        </Body>
                    </>
                ) : (
                    <>
                        <CheckIcon
                            className={`h-5 w-5 text-ethos-light-text-medium ${
                                forceLightTheme
                                    ? ''
                                    : 'dark:text-ethos-dark-text-medium'
                            }`}
                        />
                        <Body forceLightMode={forceLightTheme}>
                            Recovery phrase copied
                        </Body>
                    </>
                )}
            </div>
        </div>
    );
};

export default RecoveryPhraseDisplay;
