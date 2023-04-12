import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import CopyBody from '../../typography/CopyBody';

import type { ReactElement } from 'react';
import ClickableLargeTooltip from '_src/ui/app/components/ClickableTooltip';

export type KeyNameAndValue = {
    keyName: string;
    keyHelpMessage?: string;
    value: string | ReactElement;
    shortValue?: string | ReactElement;
};

interface KeyValueListProps {
    header?: string;
    keyNamesAndValues: KeyNameAndValue[];
}

const KeyValueList = ({ header, keyNamesAndValues }: KeyValueListProps) => {
    return (
        <div className={'px-6 pb-6'}>
            {header && (
                <BodyLarge isSemibold className={'mb-3 text-left'}>
                    {header}
                </BodyLarge>
            )}
            {keyNamesAndValues.map((item, key) => {
                return (
                    <div
                        className="flex flex-row justify-between mb-2"
                        key={key}
                    >
                        <div className="flex items-center">
                            <Body isTextColorMedium>{item.keyName}</Body>
                            {item.keyHelpMessage && (
                                <ClickableLargeTooltip
                                    message={item.keyHelpMessage}
                                >
                                    <QuestionMarkCircleIcon className="h-4 w-4 ml-1 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                                </ClickableLargeTooltip>
                            )}
                        </div>
                        {item.shortValue ? (
                            <CopyBody txt={item.value as string} isSemibold>
                                {item.shortValue}
                            </CopyBody>
                        ) : (
                            <Body isSemibold>{item.value}</Body>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default KeyValueList;
