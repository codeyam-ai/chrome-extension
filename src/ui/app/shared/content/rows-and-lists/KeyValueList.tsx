import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';

type KeyNameAndValue = {
    keyName: string;
    value: string;
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
                        <Body isTextColorMedium>{item.keyName}</Body>
                        <Body isSemibold>{item.value}</Body>
                    </div>
                );
            })}
        </div>
    );
};

export default KeyValueList;
