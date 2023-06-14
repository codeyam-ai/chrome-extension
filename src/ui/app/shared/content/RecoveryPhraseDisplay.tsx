import { ArrowLongUpIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';

import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { MouseEventHandler } from 'react';
import Button from '../buttons/Button';
import { Square2StackIcon } from '@heroicons/react/24/outline';

interface RecoveryPhraseDisplayProps {
    mnemonic: string;
    horizontalMarginInPx?: number;
    forceLightTheme?: boolean;
}

const RecoveryPhraseDisplay = ({
    mnemonic,
    horizontalMarginInPx = 0,
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
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        },
        [mnemonic]
    );
    return (
        <div className="flex flex-col">
            <div
                className={`grid grid-cols-3 grid-rows-4 gap-2 py-4 px-6 rounded-lg bg-ethos-light-background-secondary ${
                    forceLightTheme
                        ? ''
                        : 'dark:bg-ethos-dark-background-secondary'
                }`}
                style={{
                    marginLeft: horizontalMarginInPx,
                    marginRight: horizontalMarginInPx,
                }}
            >
                {mnemonic.split(' ').map((word, index) => {
                    return (
                        <div className="grid grid-cols-3 gap-2" key={index}>
                            <BodyLarge
                                isTextColorMedium
                                className="text-right col-span-1"
                            >
                                <code className="pointer-events-none select-none">
                                    {index + 1}
                                </code>
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
            <div className="flex gap-2 h-20 place-content-center items-center">
                {!copied ? (
                    <Button
                        onClick={copyToClipboard}
                        className="flex gap-2 items-center"
                        buttonStyle="secondary"
                        removeContainerPadding
                        forceLightTheme={forceLightTheme}
                    >
                        <Square2StackIcon className="h-5 w-5" />
                        <Body forceLightMode={forceLightTheme}>
                            Copy Recovery Phrase
                        </Body>
                    </Button>
                ) : (
                    <>
                        <CheckIcon
                            className={`h-5 w-5 text-ethos-light-green ${
                                forceLightTheme
                                    ? ''
                                    : 'dark:text-ethos-dark-green'
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
